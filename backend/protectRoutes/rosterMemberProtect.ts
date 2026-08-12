import jwt from 'jsonwebtoken';
import { RosterMemberFS } from '../models/rosterMemberModel';
import { Request, Response, NextFunction } from 'express';

async function rosterMemberProtect(req: Request, res: Response, next: NextFunction) {
  try {
    req.user = undefined;
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload;
    if (!decoded || decoded.role !== 'member') {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const member = await RosterMemberFS.findById(decoded.userId);
    if (!member) {
      res.status(401).json({ error: 'Not Authorized' });
      return;
    }
    const memberObj = { ...member } as any;
    delete memberObj.password;
    req.user = memberObj;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not Authorized' });
  }
}

export default rosterMemberProtect;
