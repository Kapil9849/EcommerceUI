export interface ProductModel {
    imageLink: string,
    price: number,
    productId: number,
    productdescription: string,
    productname: string,
    seller: Seller,
    stockQuantity: number
}

export interface Seller {
    sellerId: number,
    sellerName: string,
    email: string,
    phone: string
}