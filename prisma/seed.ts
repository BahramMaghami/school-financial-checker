import { PrismaClient, Prisma } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

export async function main() {
  await prisma.user.deleteMany()

  const userData: Prisma.UserCreateInput[] = [
    {
      name: 'Zohreh Vahedpoor',
      email: 'vahedpoorfardzo@gmail.com',
      role: 'admin',
      passwordHash: await bcrypt.hash('123456', 12),
    },
    {
      name: 'Bahram Maghami',
      email: 'bahrammaghami193@gmail.com',
      role: 'admin',
      passwordHash: await bcrypt.hash('bahram1384', 12),
    },
  ]

  for (const u of userData) {
    await prisma.user.create({
      data: u,
    })
  }
}

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
