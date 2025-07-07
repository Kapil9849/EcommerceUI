import axios from "axios";
import api from "./Api";
import { UserModel } from "../Entities/UserModel";
const baseUrl = "https://localhost:44308/api/User";

const UserService = {
    Login(email: string, password: string) {
        return axios.post(`${baseUrl}/Login`, {
            email,
            password
        })
    },

    GetUserById(userid:number)
    {
        return api.get("User/"+userid)
    },

    GetAllUsers():Promise<UserModel[]>
    {
        return api.get<UserModel[]>("User").then(res=>res.data);
    },

    UpdateUser(User:any)
    {
        return api.put("User",User).then(res=>res.data)
    },

    DeleteUser(userID:number)
    {
        return api.delete("User?userId="+userID).then(res=>res.data);
    }
}

export default UserService;