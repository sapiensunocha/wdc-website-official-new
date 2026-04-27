import jwt from "jsonwebtoken"
import User from "../models/localModel"
import { Request, Response, NextFunction } from "express"

async function protectRoute(req:Request,res:Response,next:NextFunction) {
    req.user = undefined
    const token = req.cookies.jwt
    if(token) {
        const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload
        if (!decoded) {
            res.status(401).json({error:"Not Authorized"})
            return
        }
        req.user = await User.findOne({_id: decoded.userId}) || undefined
        next()
    } else {
        res.status(401).json({error:"Not Authorized"})
    }
}

export default protectRoute