export interface IProduct {
    image?: string;
    name?: string; 
    category?: string; 
    price?: string; 
    rating?: number; 
    reviews?: number;
    id: string | number;
}

export interface IReview{
    rating: number;
    comment: string;
    _id: string;
    order: string;
    user: string
}