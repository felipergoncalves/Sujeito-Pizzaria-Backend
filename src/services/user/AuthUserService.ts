import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/Password incorrect!")
        }

        //Verificando se a senha desse email está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/Password incorrect!")
        }

        //Se chegar aqui é porque a senha e email estão corretos
        //Gerar token JWT e devolver os dados do usuário como id, name e email
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }