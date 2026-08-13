import jwt from 'jsonwebtoken';
import { DisasterHeroFS } from '../models/disasterHeroModel';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      hero?: any;
    }
  }
}

async function disasterHeroProtect(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : req.cookies.dh_jwt;
    if (!token) { res.status(401).json({ error: 'Not authorized' }); return; }

    const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload;
    if (!decoded || decoded.role !== 'disasterHero') {
      res.status(401).json({ error: 'Not authorized' }); return;
    }

    const hero = await DisasterHeroFS.findById(decoded.userId);
    if (!hero || hero.status !== 'approved') {
      res.status(401).json({ error: 'Not authorized' }); return;
    }

    const heroObj = { ...hero } as any;
    delete heroObj.password;
    req.hero = heroObj;
    next();
  } catch {
    res.status(401).json({ error: 'Not authorized' });
  }
}

export default disasterHeroProtect;
