import axios from "axios";
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
        return axios.get(baseUrl+"/"+userid)
    }
}

export default UserService;