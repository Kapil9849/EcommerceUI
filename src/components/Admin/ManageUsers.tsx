import { useEffect, useState } from "react"
import UserService from "../../Services/UserService"
import { UserModel } from "../../Entities/UserModel"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function ManageUsers() {
    const [Users, setUsers] = useState<any>({})

    useEffect(() => {
        UserService.GetAllUsers().then((response: UserModel[]) => {
            console.log(response);
            setUsers(response);
        })
    }, [])
    return (
        <div className="container ManageUsers">
            <div className="row ">
                <div className="col">
                    <DataTable value={Users} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="userId" header="User ID"></Column>
                        <Column field="firstname" header="First Name"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="role" header="Role"></Column>
                        <Column body={
                            <div className="row">
                                <div className="col">
                                    <i className="pi pi-user-edit"></i>
                                </div>
                                <div className="col">
                                    <i className="pi pi-trash" style={{color:"red"}}></i>
                                </div>
                            </div>
                        } header="Action"></Column>

                    </DataTable>
                </div>
            </div>
        </div>
    )
}