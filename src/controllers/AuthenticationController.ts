import { request, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import * as yup from 'yup';

interface IUser {
    id?: number,
    name?: string,
    email: string,
    password: string,
    created_at?: string,
    updated_at?: string
}

const loginValidation: yup.Schema<IUser> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
});


export class AuthenticationController {

    async createToken(request: Request, response: Response) {

        let validatedData: IUser | undefined = undefined;

        try {
            validatedData = await loginValidation.validate(request.body);
        } catch (error) {
            const yupError = error as yup.ValidationError;

            return response.json({
                errors: {
                    default: yupError.message,
                }
            });
        }

        const user: IUser = await new User().getByEmail(validatedData.email);

        if (!user) {
            return response.status(StatusCodes.UNAUTHORIZED).json({
                error: 'Invalid email or password'
            });
        }

        bcrypt.compare(validatedData.password, user.password, (error, result) => {
            if (error) {
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: 'Server Error'
                });
            }

            if (!result) {
                return response.status(StatusCodes.UNAUTHORIZED).json({
                    error: 'Invalid email or passord'
                });
            }
            const appToken: string | any | Secret | undefined = process.env.APP_TOKEN?.toString();

            const token: string = jwt.sign({ user }, appToken, {
                expiresIn: '30s'
            });


            return response.json({ token });
        });

    }

    async deleteToken(request: Request, response: Response) {
        const { token } = request.body;
    }


}