import { ProductModel } from "../Entities/ProductModel";
import api from "./Api";

const ProductService= {
    GetAllProducts(): Promise<ProductModel[]>
    {
        return api.get<ProductModel[]>("Product").then(res => res.data);
    },

    UpdateProduct(productId: number, Product: any)
    {
        return api.put("Product?productID=" + productId, Product).then(res=>res.data);
    },

    DeleteProduct(productId:number)
    {
        return api.delete("Product?productID="+productId).then(res=>res.data);
    }
}

export default ProductService