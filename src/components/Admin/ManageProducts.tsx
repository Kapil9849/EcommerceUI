import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import EditProduct from '../Product/EditProduct';
import ProductService from '../../Services/ProductService';
import { Button } from 'primereact/button';

export default function ManageProducts() {
    const [Products, setProducts] = useState<any>({});
    const [eProduct, seteProduct] = useState<any>({});
    const [ProductEditDialogVisible, setProductEditDialogVisible] = useState(false);
    const [delDialogVisible, setdelDialogVisible]= useState(false);
    const [delProduct,setdelProduct]=useState<any>({});
    useEffect(() => {
        getAllProducts();
    }, [])

    const editProduct = (product: any) => {
        console.log("jhj", product.seller.sellerName);
        seteProduct(product);
        setProductEditDialogVisible(true);
    }

    const viewSeller = (seller: any) => {
        console.log("Seller clicked", seller);
    }

    const getAllProducts = () => {
        ProductService.GetAllProducts().then((response: any) => {
            console.log(response);
            setProducts(response)
        })
    }

    const DeleteUser=()=>{
        console.log("del pod",delProduct);
        ProductService.DeleteProduct(delProduct.productId).then((response:any)=>{
            console.log(response.status)
            if(response.status)
            {
                setdelDialogVisible(false);
                getAllProducts();
            }
        })
    }

    return (
        <div className="container manageProducts">
            <div className="row">
                <div className="col">
                    <h4>Products</h4>
                </div>
            </div>
            <DataTable value={Products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="productId" header="ID"></Column>
                <Column field="productname" header="Name"></Column>
                <Column field="productdescription" header="Description"></Column>
                <Column field="price" header="Price"></Column>
                <Column field="stockQuantity" header="Stock"></Column>
                <Column field="imageLink" header="Image Link"></Column>
                <Column body={(rowData) => (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className='underline' onClick={() => viewSeller(rowData.seller)} >{rowData.seller.sellerName}</span>
                            </div>
                        </div>
                    </div>
                )} header="Seller"></Column>
                <Column body={(rowData) => (
                    <div className="row">
                        <div className="col">
                            <i className=" cursor pi pi-pen-to-square" onClick={() => editProduct(rowData)} ></i>
                        </div>
                        <div className="col">
                            <i className="cursor pi pi-trash" style={{ color: "red" }}
                            onClick={()=>{setdelDialogVisible(true);setdelProduct(rowData)}}></i>
                        </div>
                    </div>
                )} header="Action"></Column>
            </DataTable>

            <EditProduct DialogProps={{
                productData: eProduct,
                visible: ProductEditDialogVisible,
                onHide: () => setProductEditDialogVisible(false),
                update: getAllProducts
            }} />

            <Dialog header="Warning" visible={delDialogVisible} style={{ width: '25vw' }} onHide={() => { if (!delDialogVisible) return; setdelDialogVisible(false); }}>
                <div className="row mt-2">
                    <p className="text-center">Do you want to delete the Product?</p>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <Button label="Cancel" onClick={() => { setdelDialogVisible(false)}} />
                    </div>
                    <div className="col">
                        <Button label="Delete" onClick={() => DeleteUser()} />
                    </div>
                </div>
            </Dialog>
        </div>

    )
}