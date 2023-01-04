import { PrismaClient, Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';

const prisma = new PrismaClient();
const sql = Prisma.sql;

export { prisma, sql };
