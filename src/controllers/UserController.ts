import { Request, Response } from "express";
import User from "../models/User";

export default class UserController {

    async index(request: Request, response: Response) {
        const users = await new User().getAll();

        return response.json({ 'users': users });
    }

    async save(request: Request, response: Response) {

        const { name, email, password } = request.body

        if (!name) return response.json({ message: "Informe o nome do usuário" })
        if (!email) return response.json({ message: "Informe o email do usuário" })
        if (!password) return response.json({ message: "Informe a palavra passe" });

        await new User().save({ name, email, password });

        return response.json({ "message": "Usuário adicionado" });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const user = await new User().getUser(Number(id));

        return response.json({ user });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, password } = request.body;

        if (!Number(id)) return response.json({ message: "ID não Informado" });

        const userExists = await new User().getUser(Number(id));

        if (!userExists) return response.json({ message: "Usuário não encontrado", statusCode: response.statusCode })

        await new User().update(Number(id), { name, email, password });

        return response.json({ message: "Dados de usuário atualizados" });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!id) return response.json({ message: "Informe um usuário" });

        const userExists = await new User().getUser(Number(id));

        if (!userExists) return response.json({ message: "Usuário não encontrado" });

        await new User().delete(Number(id));

        return response.json({
            message: "User Deleted"
        });
    }
}