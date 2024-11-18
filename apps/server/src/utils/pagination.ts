import { PaginationParams, PaginatedResult } from '@/types/pagination';
import { prisma } from '@/db/connection';

export async function paginate<T>(
  model: any,
  params: PaginationParams = {},
  where: any = {}
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10, orderBy = 'id', orderDirection = 'desc' } = params;

  const skip = (page - 1) * limit;

  const [total, items] = await Promise.all([
    prisma[model].count({ where }),
    prisma[model].findMany({
      where,
      take: limit,
      skip,
      orderBy: {
        [orderBy]: orderDirection,
      },
    }),
  ]);

  const hasMore = skip + items.length < total;

  return {
    data: items,
    metadata: {
      total,
      page,
      limit,
      hasMore,
    },
  };
}
