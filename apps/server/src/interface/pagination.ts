/**
 * Interface for pagination parameters.
 * Used to define the structure of pagination-related inputs.
 */
export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface for the result of a paginated query.
 * Used to define the structure of paginated data and metadata.
 */
export interface IPaginatedResult<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
    nextCursor?: string;
  };
}
