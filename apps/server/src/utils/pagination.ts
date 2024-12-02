import { IPaginationParams, IPaginatedResult } from '@/interface/pagination';
import { prisma } from '@/db/connection';

export class Paginator {
  private model: string;

  constructor(model: string) {
    this.model = model;
  }

  async paginate<T>(params: IPaginationParams = {}, where: any = {}): Promise<IPaginatedResult<T>> {
    const { page = 1, limit = 10, sortBy = 'eventDate', sortOrder = 'desc' } = params;

    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      prisma[this.model].count({ where }),
      prisma[this.model].findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          [sortBy]: sortOrder,
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
}
