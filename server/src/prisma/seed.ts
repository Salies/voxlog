import { DaysRange, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.$queryRawUnsafe(
  //   `INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt") VALUES
  //   ('1', 'John Doe', '
  // )`,
  // );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
