import mongoose, { Schema, Document, Model } from 'mongoose';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface userId {
  userId: any;
}

interface IProfessional extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string[];
  email: string[];
  password: string;
  role: string;
  profileStatus: string;
  middleName?: string;
  dateOfBirth?: Date;
  profilePhoto?: string;
  linkedIn?: string;
  sex?: string;
  maritalStatus?: string;
  dependents?: number;
  countryOfResidence?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
  }[];
  citizenship?: string[];
  bio?: string;
  education?: {
    institution: string;
    city: string;
    country: string;
    degreeLevel: string;
    attendedFrom: Date;
    attendedTo?: Date;
    degreeName: string;
    attachment: string;
  }[];
  languages?: {
    name: string;
    native: boolean;
    proficiency: string;
  }[];
  skills?: {
    name: string;
    proficiency: string;
  }[];
  certifications?: {
    courseName: string;
    issuingOrganization: string;
    dateOfCertification: Date;
    attachment: string;
  }[];
  trainings?: {
    trainingName: string;
    issuingOrganization: string;
    dateOfTraining: Date;
    attachment: string;
  }[];
  experience?: {
    positionTitle: string;
    from: Date;
    to?: Date;
    employerName: string;
    employerAddress: string;
    typeOfOrganization: string;
    country: string;
    responsibilities: string;
    supervisorName: string;
    skills: string[];
    sectors: string[];
  }[];
  sectorInterests?: string[];
  deployment?: {
    preferredType: string;
    responseTime: string;
    extendedAssignments: string;
    idealEmploymentLength: string;
  };
  travelReadiness?: {
    willingToTravel: boolean;
    nearestAirport: {
      name: string;
      city: string;
      country: string;
    };
  };
  emergencyContact?: {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
  };
  workRegions?: string[];
  source?: string;
  abuse?: boolean;
  disability?: boolean;
  motivationStatement?: string;
  resume?: string;
  references?: {
    fullName: string;
    country: string;
    organization: string;
    phoneNumber: string;
    email: string;
    referenceJobTitle: string;
    website?: string;
  }[];
  attachments?: string[];
  comparePassword(enteredPassword: string): Promise<boolean>;
  setJwtToken({ userId }: userId, res: Response): void;
}

const ProfessionalSchema: Schema<IProfessional> = new Schema<IProfessional>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phoneNumber: { type: [String], required: true },
  email: { type: [String], required: true, unique: true },
  profileStatus: { type: String, enum: ['Incomplete', 'Inprogress', 'Completed'], default: 'Incomplete' },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'Professional' },
  middleName: { type: String, trim: true, default: '' },
  dateOfBirth: { type: Date, default: null },
  profilePhoto: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  sex: { type: String, enum: ['Male', 'Female', 'Other',"Undefined"], default: 'Undefined' },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Other',"Undefined"], default: 'Undefined' },
  dependents: { type: Number, default: 0 },
  sectorInterests: { type: [String], default: [] },
  abuse: { type: Boolean, default: false },
  disability: { type: Boolean, default: false },
  motivationStatement: { type: String, default: '' },
  resume: { type: String, default: '' },
  attachments: [{ type: String, default: [] }],
});

ProfessionalSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password || '123456', 10);
  }
  next();
});

ProfessionalSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

ProfessionalSchema.methods.setJwtToken = function ({ userId }: userId, res: Response): void {
  const token = jwt.sign({ userId }, process.env.JWTSK as string, { expiresIn: '1d' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

const Professional: Model<IProfessional> = mongoose.model<IProfessional>('Professional', ProfessionalSchema);
export default Professional;
