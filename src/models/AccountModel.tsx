import prisma from "../../lib/prisma"

export const CheckCredentials = async (email: string, password: string) => {
    var account = await prisma.account.findFirst({
        where: {
            email: email,
            password: password
        }
    })

    return account
}