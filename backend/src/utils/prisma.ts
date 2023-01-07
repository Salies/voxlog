import { PrismaClient, Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime';

const prisma = new PrismaClient({
    log: ['query'],
});
const sql = Prisma.sql;
const join = Prisma.join;

export { prisma, sql, join };
