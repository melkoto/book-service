const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { ROLE_HIERARCHY, ROLES } = require('../src/constants/role-hierarchy')
const prisma = new PrismaClient()

async function main() {
    const createUser = async () => {
        // Учетные данные superadmin
        const superAdminEmail = ''
        const superAdminPassword = ''

        // Проверка, существует ли уже superadmin
        const existingSuperAdmin = await prisma.user.findUnique({
            where: {
                email: superAdminEmail,
            },
        })

        if (!existingSuperAdmin) {
            // Хеширование пароля
            const hashedPassword = await bcrypt.hash(superAdminPassword, 10)

            // Создание superadmin пользователя
            await prisma.user.create({
                data: {
                    name: 'Melkoto Doe',
                    email: superAdminEmail,
                    password: hashedPassword,
                    role: ROLES.SUPERADMIN,
                },
            })

            console.log('Superadmin user has been created')
        } else {
            console.log('Superadmin user already exists')
        }
    }

    const deleteAllUsers = async () => {
        await prisma.user.deleteMany()
    }

    // deleteAllUsers()
    //     .then(() => console.log('All users deleted'))
    //     .catch((e) => console.log(e))

    // createUser()
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
