import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const SECRET_KEY: string | any | Secret | undefined = process.env.APP_TOKEN;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            error: 'No Secure Token was provided'
        });
    }

    try {

        const decoded = jwt.verify(token, SECRET_KEY);

        (request as CustomRequest).token = decoded;

        next();

    } catch (error) {

        response.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Invalid Secure Token was provided'
        });
    }
};