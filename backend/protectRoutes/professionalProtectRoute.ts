import jwt from "jsonwebtoken"
import User from "../models/professionalModel"
import { Request, Response, NextFunction } from "express"


async function protectRoute(req:Request,res:Response,next:NextFunction) {
    try{
        req.user = undefined
        const token = req.cookies.jwt
        if(token) {
            const decoded = jwt.verify(token, process.env.JWTSK as string) as jwt.JwtPayload
            if (!decoded) {
                res.status(401).json({error:"Not Authorized"})
                return;
            }
            req.user = await User.findOne({_id: decoded.userId}).select("-password") || undefined
            next()
        } else {
            res.status(401).json({error:"Not Authorized"})
        }
    } catch (error){
        res.status(400).json(error)
    }
}

export default protectRoute