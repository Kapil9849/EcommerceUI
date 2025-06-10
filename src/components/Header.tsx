import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() 
{
    const navigate = useNavigate();
    const [loginUser,setLoginUser] = useState<{}|null>(null);
    const [userLoggedIn,setUserLoggedIn] = useState<boolean>(false);
    useEffect(()=>{
        console.log("called")
        const data = localStorage.getItem("user");
        if(data!=null)
        {
            console.log(data);
            setLoginUser(JSON.parse(data));
            setUserLoggedIn(true);
        }
    },[])

    const Logout=()=>{
        console.log("Logout clicked")
        localStorage.clear();
        // setLoginUser(null);
        setUserLoggedIn(false);
        navigate("/");
    }
    return (
        <header className="App-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><b className='LogoSize'>Kapil Store</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {!userLoggedIn && <li className="nav-item">
                                <a className="nav-link active" href="/login">Login</a>
                            </li>}
                            {userLoggedIn && <li className="nav-item">
                                <a className="nav-link active" onClick={Logout}>Logout</a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}