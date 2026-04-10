import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
});

export async function register(userName, email, password) {
    try {
        const res = await api.post("/register", {
            userName,
            email,
            password
        }, {
            withCredentials: true
        });
    }
    catch (err) {
        throw err
    }
}

export async function login(userName, email, password) {
    try {
        const res = await api.post(
            "/login",
            { userName, password },
            { withCredentials: true }
        );

        console.log(res.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
}

export async function getMe() {
    try{
       const res = await api.get("get-me");
       return res.data;
    }
    catch(err){
        throw new error
    }
}

