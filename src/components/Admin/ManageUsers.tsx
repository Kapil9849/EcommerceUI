import { useEffect, useState } from "react"
import UserService from "../../Services/UserService"
import { UserModel } from "../../Entities/UserModel"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EditUser from "../User/EditUser";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


export default function ManageUsers() {
    const [Users, setUsers] = useState<any>({})
    const [User, setEditUser] = useState<any>({})
    const [dialogVisible, setDialogVisible] = useState(false);
    const [delDialogVisible, setDelDialogVisible] = useState(false);
    const [delUser, setdelUser]=useState<any>({});

    // const []

    useEffect(() => {
        UserService.GetAllUsers().then((response: UserModel[]) => {
            setUsers(response);
        })
    }, [])

    const GetallUser = () => {
        UserService.GetAllUsers().then((response: UserModel[]) => {
            setUsers(response);
        })
    }

    const handleDialog = () => {
        setDialogVisible(false);
    }

    const EditUserDialog = (User: any) => {
        setEditUser(User);
        setDialogVisible(true);
    }

    const DeleteUser = () => {
        UserService.DeleteUser(delUser.userId).then((response: any) => {
            if (response.status) {
                console.log("User Deleted Successfully");
                setDelDialogVisible(false);
                GetallUser();
            }
        })
            .catch((error) => {
                console.log("Failed to delete the User", error);
            })
    }

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
                        <Column body={(rowData) => (
                            <div className="row">
                                <div className="col">
                                    <i className=" cursor pi pi-user-edit" onClick={() => EditUserDialog(rowData)}></i>
                                </div>
                                <div className="col">
                                    <i className="cursor pi pi-trash" style={{ color: "red" }}
                                        onClick={() => {setDelDialogVisible(true);setdelUser(rowData)}}></i>
                                </div>
                            </div>
                        )} header="Action"></Column>

                    </DataTable>
                </div>
            </div>
            <div className="Edit">
                <EditUser DialogProps={{
                    userData: User,
                    visible: dialogVisible,
                    onHide: handleDialog,
                    update: GetallUser
                }} />
            </div>
            <div className="deldialog">
                <Dialog header="Warning" visible={delDialogVisible} style={{ width: '25vw' }} onHide={() => { if (!delDialogVisible) return; setDelDialogVisible(false); }}>
                    <div className="row mt-2">
                        <p className="text-center">Do you want to delete the User?</p>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Button label="Cancel" onClick={()=>{setDelDialogVisible(false)}}/>
                        </div>
                        <div className="col">
                            <Button label="Delete" onClick={()=>DeleteUser()}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}