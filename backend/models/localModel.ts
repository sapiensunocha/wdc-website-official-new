import mongoose, { Document, Schema, Model } from 'mongoose';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface userId {
  userId: any;
}

interface ILocal extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  password?: string;
  profilePhoto?: string;
  role?: string;
  profileStatus?: string;
  dob?: Date;
  phoneNumber: {
    phoneNumber: string;
    verified: boolean;
  }[];
  sex?: string;
  maritalStatus?: string;
  numberOfDependents?: number;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  validIDPassport?: string[];
  languages?: {
    name: string;
    proficiency: string;
  }[];
  emergencyContact?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    relationship?: string;
    phoneNumber?: string;
  };
  additionalInfo?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  setJwtToken({ userId }: userId, res: Response): void;
}

const localSchema: Schema<ILocal> = new mongoose.Schema<ILocal>(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 32 },
    middleName: { type: String, trim: true, maxlength: 32, default: '' },
    lastName: { type: String, required: true, trim: true, maxlength: 32 },
    email: { type: String, trim: true, unique: true},
    password: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    role: { type: String, default: 'local' },
    profileStatus: { type: String, enum: ['incomplete', 'inprogress', 'completed'], default: "incomplete" },
    dob: { type: Date, default: null },
    phoneNumber: [{ type: {
      phoneNumber: { type: String, required: true },
      verified: { type: Boolean, default: false },
    }, required: true }],
    sex: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Other', "undefined"], default: "undefined" },
    numberOfDependents: { type: Number, default: 0 },
    address: {
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    validIDPassport: { type: [String], default: [] },
    languages: { type: [{ name: String, proficiency: String }], default: [] },
    emergencyContact: {
      firstName: { type: String, default: '' },
      middleName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      relationship: { type: String, default: '' },
      phoneNumber: { type: String, default: '' },
    },
    additionalInfo: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compare user password
localSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

localSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate JWT Token
localSchema.methods.setJwtToken = function ({ userId }: userId, res: Response): void {
  const token = jwt.sign({ userId }, process.env.JWTSK as string, { expiresIn: '1d' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const Local: Model<ILocal> = mongoose.model<ILocal>('Local', localSchema);

export default Local;
