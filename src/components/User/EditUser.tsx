import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import UserService from '../../Services/UserService';

interface EditUserProps {
    DialogProps: {
        userData: any,
        visible: boolean,
        onHide: () => void,
        update: ()=>void
    };
}

export default function EditUser({ DialogProps }: EditUserProps) {
    // const User:any= DialogProps.userData || {}
    const [User, setUser] = useState(DialogProps.userData || {})

    const HandleUserUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev:any) => ({ ...prev, [name]: value }));
    };


    useEffect(() => {
        if (DialogProps.visible && DialogProps.userData) {
            setUser(DialogProps.userData);
        }
    }, [DialogProps.visible]);

    const UpdateUser = () => {
        var data:any={
            firstname: User.firstname,
            lastname: User.lastname,
            phone: User.phone,
            email: User.email,
            userId: User.userId
        }
        UserService.UpdateUser(data).then((response:any)=>{
            console.log(response);
            if(response.status)
            {
                DialogProps.update();
                DialogProps.onHide();
            }
        })
        .catch((error)=>{
            console.error("Update Failed",error);
        })
    }
    return (
        <div>
            <Dialog header="Edit User" visible={DialogProps.visible} style={{ width: '50vw' }} onHide={DialogProps.onHide}>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            First Name
                        </div>
                        <div className="col-md-8">
                            <InputText name="firstname" value={User.firstname} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Last Name
                        </div>
                        <div className="col-md-8">
                            <InputText name="lastname" value={User.lastname} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Email
                        </div>
                        <div className="col-md-8">
                            <InputText name="email" value={User.email} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Phone Number
                        </div>
                        <div className="col-md-8">
                            <InputText name="phone" value={User.phone} onChange={(e) => HandleUserUpdate(e)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            Role
                        </div>
                        <div className="col-md-8">
                            <InputText name="role" disabled value={User.role} onChange={(e) => HandleUserUpdate(e)} />
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