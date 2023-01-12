import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

((async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  }
})())

export default prisma;
