const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting cleanup of orphaned candidates...");

  // First, verify the count to be completely safe
  const orphanedCount = await prisma.user.count({
    where: {
      role: 'candidate',
      profile: {
        is: null
      }
    }
  });

  console.log(`Found ${orphanedCount} orphaned accounts to delete.`);

  if (orphanedCount > 0) {
    // Perform the safe deletion
    const deleteResult = await prisma.user.deleteMany({
      where: {
        role: 'candidate',
        profile: {
          is: null
        }
      }
    });

    console.log(`Successfully deleted ${deleteResult.count} orphaned accounts!`);
  } else {
    console.log("No orphaned accounts found. Nothing to delete.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
