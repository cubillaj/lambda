import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { ENV } from './config/env.js';

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: ENV.DATABASE_URL });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ENV.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  });

if (ENV.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
