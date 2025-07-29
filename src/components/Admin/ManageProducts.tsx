import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import UserService from '../../Services/UserService';
import { ProductModel } from '../../Entities/ProductModel';

export default function ManageProducts() {
    const [Products, setProducts]= useState<any>();

    useEffect(() => {
      UserService.GetAllProducts().then((response:any)=>{
        console.log(response);
        setProducts(response)
      })
    }, [])
    
    return (
        <div className="container manageProducts">
            <DataTable value={Products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="productId" header="ID"></Column>
                <Column field="productname" header="Name"></Column>
                <Column field="productdescription" header="Description"></Column>
                <Column field="price" header="Price"></Column>
                <Column field="stockQuantity" header="Stock"></Column>
                <Column field="imageLink" header="Image Link"></Column>
                <Column body={(rowData)=>(
                    <div>
                        Seller Link
                    </div>
                )} header="Seller"></Column>


            </DataTable>
        </div>
    )
}