import jwt from 'jsonwebtoken';
import { RosterAdminFS } from '../models/rosterAdminModel';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      admin?: any;
      partner?: any;
    }
  }
}

async function rosterAdminProtect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt_admin;
    if (!token) {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload;
    if (!decoded || decoded.role !== 'admin') {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const admin = await RosterAdminFS.findById(decoded.adminId);
    if (!admin || !admin.isActive) {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const adminObj = { ...admin } as any;
    delete adminObj.password;
    req.admin = adminObj;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not Authorized' });
  }
}

export default rosterAdminProtect;
