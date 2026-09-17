const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const totalUsers = await prisma.user.count();
  
  const orphanedCandidates = await prisma.user.count({
    where: {
      role: 'candidate',
      profile: {
        is: null
      }
    }
  });
  
  const remaining = totalUsers - orphanedCandidates;
  
  console.log(JSON.stringify({ total: totalUsers, orphaned: orphanedCandidates, remaining: remaining }, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
