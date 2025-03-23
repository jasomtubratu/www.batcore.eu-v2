import { PrismaClient, Packages } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPackages(category: string): Promise<Packages[]> {
  let categoryInt: number;

  if (category.toLowerCase() === 'minecraft') {
    categoryInt = 1;
  } else if (category.toLowerCase() === 'vps') {
    categoryInt = 2;
  } else {
    throw new Error(`Invalid category: ${category}`);
  }

  try {
    const packages = await prisma.packages.findMany({
      where: {
        category: categoryInt,
      },
    });
    return packages;
  } catch (error) {
    console.error('Error fetching packages:', error);
    throw error;
  }
}

export default prisma;
