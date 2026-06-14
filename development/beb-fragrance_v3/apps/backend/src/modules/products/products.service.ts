import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { createSlug } from '../../utils/slugify';
import { paginate } from '../../utils/pagination';
import type { CreateProductRequest, UpdateProductRequest, ProductListQuery } from './products.types';

const productInclude = {
  variants: true,
  images: { orderBy: { isPrimary: 'desc' as const } },
};

export async function getProducts(query: ProductListQuery) {
  const { page = 1, limit = 20, search, brand, concentration, status = 'active', featured, minPrice, maxPrice } = query;

  const where: any = { status };
  if (search) where.OR = [
    { name: { contains: search, mode: 'insensitive' } },
    { brand: { contains: search, mode: 'insensitive' } },
  ];
  if (brand) where.brand = { equals: brand, mode: 'insensitive' };
  if (concentration) where.concentration = concentration;
  if (featured === 'true') where.isFeatured = true;
  if (minPrice || maxPrice) {
    where.variants = { some: {
      price: {
        ...(minPrice && { gte: parseInt(minPrice) }),
        ...(maxPrice && { lte: parseInt(maxPrice) }),
      },
    }};
  }

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where, include: productInclude,
      skip: (page - 1) * limit, take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return paginate(data, total, page, limit);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug }, include: productInclude });
  if (!product) throw new AppError(404, 'Mahsulot topilmadi.');
  return product;
}

export async function createProduct(data: CreateProductRequest) {
  const slug = await createSlug(data.name, async (s) => !!(await prisma.product.findUnique({ where: { slug: s } })));
  const { images, variants, ...rest } = data;

  return prisma.product.create({
    data: {
      ...rest,
      slug,
      images: { create: images },
      variants: { create: variants },
    },
    include: productInclude,
  });
}

export async function updateProduct(id: string, data: UpdateProductRequest) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Mahsulot topilmadi.');

  const { images, variants, name, ...rest } = data;
  const slug = name ? await createSlug(name, async (s) => {
    const found = await prisma.product.findUnique({ where: { slug: s } });
    return !!(found && found.id !== id);
  }) : undefined;

  return prisma.product.update({
    where: { id },
    data: {
      ...rest,
      ...(name && { name }),
      ...(slug && { slug }),
      ...(images && { images: { deleteMany: {}, create: images } }),
      ...(variants && { variants: { deleteMany: {}, create: variants } }),
    },
    include: productInclude,
  });
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Mahsulot topilmadi.');
  await prisma.product.delete({ where: { id } });
}
