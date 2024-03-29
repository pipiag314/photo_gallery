export type PhotoType = {
    alt_description: string;
    created_at: string;
    height: number;
    width: number;
    description: string;
    id: string;
    likes: number;
    slug: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        small_s3: string;
        thumb: string;
    }
}


export type PhotoStatsType = {
    downloads: {
        total: number
    };
    views: {
        total: number
    };
    likes: {
        total: number
    }
    id: string;
    slig: string;
}