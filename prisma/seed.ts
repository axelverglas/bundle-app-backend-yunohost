import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const bundle1 = await prisma.bundle.create({
    data: {
      title: 'Association / projet de groupe, usages collaboratifs',
      description:
        "Packaging regroupant les applications d'associations, de projet de groupe et à usage collaboratifs.",
    },
  });

  // Seed d'app
  await prisma.app.create({
    data: {
      name: 'Yeswiki',
      logo: 'https://github.com/YunoHost/apps/blob/master/logos/yeswiki.png',
      bundle: 'app1_bundle',
      description: 'Description de Yeswiki',
      size: 100,
      bundles: {
        connect: { id: bundle1.id },
      },
    },
  });

  console.log('Seed exécuté avec succès!');
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
