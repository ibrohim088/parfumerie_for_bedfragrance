import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed boshlandi...');

  const admin = await prisma.user.upsert({
    where: { phone: '+998901234567' },
    update: {},
    create: {
      phone:     '+998901234567',
      firstName: 'Admin',
      lastName:  'BEB',
      email:     'admin@bebfragrance.uz',
      role:      'admin',
      isActive:  true,
    },
  });

  console.log(`✅ Admin yaratildi: ${admin.phone} / ${admin.email}`);
  console.log('🎉 Seed yakunlandi!');
}

main()
  .catch(e => {
    console.error('❌ Seed xatosi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });