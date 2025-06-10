
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { LSUser } from '../Entities/LSUser';

export default function Login() {
    const LoginModel = {
        username: "",
        password: ""
    }
    const [loginUser, setLoginUser]= useState({}) ;
    const navigate = useNavigate();
    const [loginModel, setLoginModel] = useState<{ [key: string]: string }>(LoginModel);
    const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

    useEffect(()=>{
        const data = localStorage.getItem("user");
        if(data!=null)
        {
            // console.log("User details are found in Localstorage", data);
            navigate("/user")
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginModel({
            ...loginModel, [name]: value
        });
    }

    const handleBlur = (e: any) => {
        const name = e.target.name;
        setTouchedFields({
            ...touchedFields, [name]: true
        })

    }
    // useEffect(()=>{console.log(touchedFields)},[touchedFields])

    const isInvalid = (field: string) => {
        if (touchedFields[field] && loginModel[field].trim() === "") {
            return true;
        }
        return false;
    }

    const Submit = (e: React.FormEvent) => {
        // Prevent default form submission behavior
        e.preventDefault();
        console.log("Login clicked", loginModel);
        // Call the login function from UserService
        UserService.Login(loginModel.username, loginModel.password)
            .then((response: any) => {
                localStorage.setItem("Jwt",response.data.jwtToken);
                localStorage.setItem("refreshToken",response.data.refreshToken);
                UserService.GetUserById(response.data.userId).then((userData:any)=>{
                    userData=userData.data;
                    setLoginUser(userData);
                    var data:LSUser={
                        UserId: userData.userId,
                        Email: userData.email,
                        Firstname: userData.firstname,
                        Lastname: userData.lastname,
                        Role: userData.role
                    }
                    localStorage.setItem("user",JSON.stringify(data));
                navigate("/user");
                window.location.reload();
                })
            })
            .catch((error) => {
                console.error("Login failed", error);
            });
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center">Login</h1>
            <form className="mt-4">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mb-3">
                            <label htmlFor="username">Username</label><br />
                            <InputText type="text" id="username" name="username" placeholder="Enter your username" required
                                value={loginModel.username} onChange={handleChange} onBlur={handleBlur} />
                            {isInvalid("username") && <small className="text-danger">Username is required.</small>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mb-3">
                            <label htmlFor="password">Password</label><br />
                            <InputText type="password" id="password" name="password" placeholder="Enter your password" required
                                value={loginModel.password} onChange={handleChange} onBlur={handleBlur} />
                            {isInvalid("password") && <small className="text-danger">Password is required.</small>}
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 offset-md-4">
                        <Button type="submit" onClick={Submit} label="Login" 
                        disabled={Object.values(loginModel).some(value=>!value) ||
                            Object.values(touchedFields).some(value=>!value)
                        }/>
                    </div>
                </div>
            </form>
        </div>
    )
}