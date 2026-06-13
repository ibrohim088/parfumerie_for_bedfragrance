import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed boshlandi...');

  // ── 1. Admin foydalanuvchi ─────────────────────────────────

  const admin = await prisma.user.upsert({
    where: { phone: '+998901234567' },
    update: {},
    create: {
      phone: '+998901234567',
      firstName: 'Ibrohim',
      lastName: 'Admin',
      email: 'admin@bebfragrance.uz',
      role: 'admin',
      isActive: true,
    },
  });
  console.log(`✅ Admin: ${admin.firstName} ${admin.lastName} (${admin.phone})`);

  // ── 2. Test foydalanuvchi ──────────────────────────────────

  const user = await prisma.user.upsert({
    where: { phone: '+998907654321' },
    update: {},
    create: {
      phone: '+998907654321',
      firstName: 'Jasur',
      lastName: 'Toshmatov',
      email: 'jasur@test.uz',
      role: 'user',
      isActive: true,
    },
  });
  console.log(`✅ User: ${user.firstName} ${user.lastName} (${user.phone})`);

  // ── 3. Manzil ─────────────────────────────────────────────

  await prisma.address.upsert({
    where: { id: 'seed-address-01' },
    update: {},
    create: {
      id: 'seed-address-01',
      userId: user.id,
      label: 'Uy',
      fullName: 'Jasur Toshmatov',
      phone: '+998907654321',
      region: 'Toshkent shahri',
      district: 'Chilonzor tumani',
      street: 'Bunyodkor ko\'chasi, 12-uy',
      apartment: '45',
      isDefault: true,
    },
  });
  console.log('✅ Manzil yaratildi');

  // ── 4. Mahsulotlar ────────────────────────────────────────

  const products = [
    {
      name: 'Oud Royal',
      slug: 'oud-royal',
      brand: 'BEB Exclusive',
      description:
        'Sharqning eng qimmatbaho ud yog\'ochidan yaratilgan hashamatli atir. Kuchli va uzoq davom etuvchi hid.',
      concentration: 'parfum',
      topNotes: ['bergamot', 'saffron'],
      middleNotes: ['oud', 'rose', 'jasmine'],
      baseNotes: ['musk', 'amber', 'sandalwood'],
      status: 'active',
      isFeatured: true,
      images: [
        { url: 'https://placehold.co/600x800/1a1a1a/ffffff?text=Oud+Royal', alt: 'Oud Royal', isPrimary: true },
        { url: 'https://placehold.co/600x800/2a2a2a/ffffff?text=Oud+Royal+2', alt: 'Oud Royal 2', isPrimary: false },
      ],
      variants: [
        { volume: 50, price: 850000, stock: 15 },
        { volume: 100, price: 1500000, stock: 8 },
      ],
    },
    {
      name: 'Rose Noir',
      slug: 'rose-noir',
      brand: 'BEB Exclusive',
      description:
        'Qora atirgul va vetiverdan ilhomlangan sirli va jozibali xush bo\'y. Kechki tadbirlar uchun ideal.',
      concentration: 'edp',
      topNotes: ['black pepper', 'bergamot'],
      middleNotes: ['black rose', 'violet', 'iris'],
      baseNotes: ['vetiver', 'patchouli', 'musk'],
      status: 'active',
      isFeatured: true,
      images: [
        { url: 'https://placehold.co/600x800/2d0a0a/ffffff?text=Rose+Noir', alt: 'Rose Noir', isPrimary: true },
      ],
      variants: [
        { volume: 50, price: 620000, stock: 20 },
        { volume: 75, price: 890000, stock: 10 },
        { volume: 100, price: 1100000, stock: 5 },
      ],
    },
    {
      name: 'Fresh Citrus',
      slug: 'fresh-citrus',
      brand: 'BEB Collection',
      description:
        'Limon, apelsin va greyfrutdan yaratilgan yengil va yangi hid. Kundalik foydalanish uchun mukammal.',
      concentration: 'edt',
      topNotes: ['lemon', 'grapefruit', 'orange'],
      middleNotes: ['mint', 'green tea', 'neroli'],
      baseNotes: ['white musk', 'cedarwood'],
      status: 'active',
      isFeatured: false,
      images: [
        { url: 'https://placehold.co/600x800/0a2d0a/ffffff?text=Fresh+Citrus', alt: 'Fresh Citrus', isPrimary: true },
      ],
      variants: [
        { volume: 50, price: 380000, stock: 30 },
        { volume: 100, price: 650000, stock: 18 },
      ],
    },
    {
      name: 'Velvet Amber',
      slug: 'velvet-amber',
      brand: 'BEB Exclusive',
      description:
        'Amber va vanil asosidagi iliq va quchoqlovchi hid. Kuz va qish fasllarida ayniqsa muvofiq.',
      concentration: 'edp',
      topNotes: ['cardamom', 'cinnamon'],
      middleNotes: ['amber', 'benzoin', 'rose'],
      baseNotes: ['vanilla', 'tonka bean', 'sandalwood'],
      status: 'active',
      isFeatured: true,
      images: [
        { url: 'https://placehold.co/600x800/2d1a00/ffffff?text=Velvet+Amber', alt: 'Velvet Amber', isPrimary: true },
      ],
      variants: [
        { volume: 50, price: 720000, stock: 12 },
        { volume: 100, price: 1250000, stock: 6 },
      ],
    },
    {
      name: 'Ocean Breeze',
      slug: 'ocean-breeze',
      brand: 'BEB Collection',
      description:
        'Dengiz shabadasi va toza havodan ilhomlangan. Sport va aktiv hayot tarzi uchun yaratilgan.',
      concentration: 'edt',
      topNotes: ['sea salt', 'bergamot', 'lemon'],
      middleNotes: ['aquatic', 'lavender', 'sage'],
      baseNotes: ['driftwood', 'musk', 'cedarwood'],
      status: 'active',
      isFeatured: false,
      images: [
        { url: 'https://placehold.co/600x800/0a1a2d/ffffff?text=Ocean+Breeze', alt: 'Ocean Breeze', isPrimary: true },
      ],
      variants: [
        { volume: 50, price: 420000, stock: 25 },
        { volume: 100, price: 720000, stock: 14 },
      ],
    },
  ];

  for (const p of products) {
    const { images, variants, ...productData } = p;

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...productData,
        images: { create: images },
        variants: { create: variants },
      },
    });
    console.log(`✅ Mahsulot: ${p.name}`);
  }

  // ── 5. Test buyurtma ───────────────────────────────────────

  const product = await prisma.product.findUnique({
    where: { slug: 'oud-royal' },
    include: { variants: true },
  });

  if (product && product.variants.length > 0) {
    const variant = product.variants[0];
    const subtotal = variant.price * 1;
    const deliveryFee = 30000;

    await prisma.order.upsert({
      where: { orderNumber: 'BEB-SEED001' },
      update: {},
      create: {
        orderNumber: 'BEB-SEED001',
        userId: user.id,
        deliveryAddressId: 'seed-address-01',
        status: 'delivered',
        paymentMethod: 'payme',
        paymentStatus: 'paid',
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
        notes: 'Tez yetkazib bering',
        items: {
          create: {
            productId: product.id,
            variantId: variant.id,
            quantity: 1,
            unitPrice: variant.price,
            totalPrice: variant.price,
          },
        },
        transaction: {
          create: {
            provider: 'payme',
            externalId: 'payme_test_001',
            amount: (subtotal + deliveryFee) * 100,
            currency: 'UZS',
            status: 'paid',
            paidAt: new Date(),
          },
        },
      },
    });
    console.log('✅ Test buyurtma yaratildi: BEB-SEED001');
  }

  // ── 6. Bildirishnoma ───────────────────────────────────────

  await prisma.notification.create({
    data: {
      userId: user.id,
      type: 'order_paid',
      title: 'To\'lov qabul qilindi',
      message: '#BEB-SEED001 buyurtmangiz uchun to\'lov muvaffaqiyatli amalga oshirildi.',
      isRead: false,
      metadata: { orderNumber: 'BEB-SEED001' },
    },
  });
  console.log('✅ Bildirishnoma yaratildi');

  // ── 7. Hid profili ─────────────────────────────────────────

  await prisma.scentProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      families: ['oriental', 'woody'],
      notes: ['oud', 'rose', 'amber', 'sandalwood'],
      intensity: 'strong',
      seasons: ['autumn', 'winter'],
      occasions: ['evening', 'date'],
    },
  });
  console.log('✅ Hid profili yaratildi');

  console.log('\n🎉 Seed muvaffaqiyatli yakunlandi!');
  console.log('─────────────────────────────────────');
  console.log(`👤 Admin:  +998901234567`);
  console.log(`👤 User:   +998907654321`);
  console.log(`📦 Mahsulotlar: ${products.length} ta`);
  console.log(`🛒 Buyurtma: BEB-SEED001`);
}

main()
  .catch((e) => {
    console.error('❌ Seed xatosi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
