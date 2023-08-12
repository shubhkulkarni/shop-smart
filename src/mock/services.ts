
import { products } from "./products"

export const searchProduct = (searchString: string) => {
    return getProductBinding(products.filter(i=>i.name.toLowerCase().includes(searchString.toLowerCase())))
}

export const getProductBinding = (products: any) => products.map(i=>({
    image: i.image,
    category: i.category.name,
    price: i.price,
    rating: Math.trunc(i?.rating || 0),
    name: i.name,
    reviews: i?.reviews?.length ?? 0,
    id: i._id
}))
export const productMock = getProductBinding(products);

export const getProducts = (category: string) => {
    const filtered = products.filter(i=>i.category.name===category)
    return getProductBinding(filtered)
}