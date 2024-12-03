import "mongoose";

declare module "mongoose" {
    interface PaginateModel<T> extends Model<T> {
        paginate: (
            query?: FilterQuery<T>,
            options?: {
                select?: string;
                sort?: string | Record<string, 1 | -1>;
                populate?: string | Record<string, unknown>;
                projection?: Record<string, unknown>;
                lean?: boolean;
                page?: number;
                limit?: number;
            }
        ) => Promise<PaginateResult<T>>;
    }

    interface PaginateResult<T> {
        docs: T[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page?: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage?: number | null;
        nextPage?: number | null;
    }
}
