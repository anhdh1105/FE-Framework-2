export interface IProduct {
    id: string | number;
    name: string;
    image: string;
    price: number;
    category: string;
}
export type FormData = Pick<IProduct, "name" | "price" | "image" | "category">;
