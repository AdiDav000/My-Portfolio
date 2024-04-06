import Cookies from "universal-cookie";
import Axios from 'axios'

const checkSession=async()=>{
    const cookie = new Cookies();
    const token = await cookie.get("userToken");
    // console.log(token);
    const res = await Axios.post("http://localhost:3000/users/checkToken/"+token);
    return res;
}
export const checkToken=async()=>{
    const cookie = new Cookies();
    const token = await cookie.get("userToken");
    // console.log(token);
    // const res = await Axios.post("http://localhost:3000/users/checkToken/"+token);
    return token;
}
export default checkSession;