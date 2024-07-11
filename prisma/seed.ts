import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const task1 = await prisma.task.create({
    data: {
      name: 'Task 1',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      name: 'Task 2',
    },
  });

  console.log({ task1, task2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
