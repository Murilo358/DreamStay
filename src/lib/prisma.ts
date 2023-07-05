import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

//Evita com que toda vez que um reload seja feito, seja instanciado uma conexão com o banco
//Garantindo com que se existir um globalPrisma ele cria um novo

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma;
