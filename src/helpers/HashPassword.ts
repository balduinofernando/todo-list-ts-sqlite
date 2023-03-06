import bcrypt from 'bcrypt';

export class Hash {

    async make(password: string, saltRounds = 10): Promise<string> {
        const hashPassword = await bcrypt.hashSync(password, saltRounds);

        return hashPassword;
    }
}