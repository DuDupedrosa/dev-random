import { prisma } from '@/lib/prisma';

export async function verifyUserRecentlyDeleteAccount(userId: string) {
  try {
    const THIRTY_ONE_DAYS_AGO = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);
    const userRecentlyDeleteAccount =
      await prisma.requestDeleteProfileLogs.findFirst({
        where: {
          userId: userId,
          createdAt: {
            gte: THIRTY_ONE_DAYS_AGO, // maior ou igual a 31 dias atrás
          },
        },
        orderBy: {
          createdAt: 'desc', // garante que pega o registro mais recente
        },
      });

    return userRecentlyDeleteAccount !== null;
  } catch (error) {
    throw new Error(`Error on verifyUserRecentlyDeleteAccount: ${error}`);
  }
}
