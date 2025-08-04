import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import ProductService from '../../Services/ProductService';

interface EditProductProps {
    DialogProps: {
        productData: any,
        visible: boolean,
        onHide: () => void,
        update: () => void
    };
}
export default function EditProduct({ DialogProps }: EditProductProps) {
    const [Product, setProduct] = useState<any>(DialogProps.productData || {});

    useEffect(() => {
        if (DialogProps.visible && DialogProps.productData) {
            setProduct(DialogProps.productData);
        }
    }, [DialogProps.visible]);

    const HandleUserUpdate = (e: any) => {
        const { name, value } = e.target;
        setProduct((prev: any) => ({ ...prev, [name]: value }));
    }

    const UpdateUser = () => {
        var data = {
            productId: Product.productId,
            sellerId: Product.seller?.sellerId,
            productname: Product.productname,
            price: Product.price,
            productdescription: Product.productdescription,
            imageLink: Product.imageLink,
            stockQuantity: Product.stockQuantity
        }
        console.log("Update user clicked", data);
        ProductService.UpdateProduct(Product.productId,data).then((response:any)=>{
            console.log("response", response)
            if(response.status)
            {
                DialogProps.update();
                DialogProps.onHide();
            }
        })

    }
    return (
        <div>
            <Dialog header="Edit Product" visible={DialogProps.visible} style={{ width: '50vw' }} onHide={DialogProps.onHide}>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            Product Name
                        </div>
                        <div className="col-md-8">
                            <InputText name="productname" value={Product.productname} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Product Description
                        </div>
                        <div className="col-md-8">
                            <InputText name="productdescription" value={Product.productdescription} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Price
                        </div>
                        <div className="col-md-8">
                            <InputText name="price" value={Product.price} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Image Link
                        </div>
                        <div className="col-md-8">
                            <InputText name="imageLink" value={Product.imageLink} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Quantity (In Stock)
                        </div>
                        <div className="col-md-8">
                            <InputText name="stockQuantity" value={Product.stockQuantity} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Seller
                        </div>
                        <div className="col-md-8">
                            <InputText name="seller" disabled value={Product.seller?.sellerName || ''}
                                onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col offset-md-4">
                            <Button label="Cancel" onClick={DialogProps.onHide} severity='danger' />
                        </div>
                        <div className="col">
                            <Button label="Update" onClick={() => UpdateUser()} />
                        </div>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}