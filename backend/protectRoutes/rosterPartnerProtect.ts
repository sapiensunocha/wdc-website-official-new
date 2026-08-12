import jwt from 'jsonwebtoken';
import { PartnerFS } from '../models/partnerModel';
import { Request, Response, NextFunction } from 'express';

async function rosterPartnerProtect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : req.cookies.jwt_partner;
    if (!token) {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload;
    if (!decoded || decoded.role !== 'partner') {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const partner = await PartnerFS.findById(decoded.partnerId);
    if (!partner || partner.status !== 'active') {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const partnerObj = { ...partner } as any;
    delete partnerObj.password;
    req.partner = partnerObj;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not Authorized' });
  }
}

export default rosterPartnerProtect;
