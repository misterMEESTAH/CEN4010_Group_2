import axios from "axios"
// const axios = require("axios")
const userupdated = {
    cart: null,
    wishlist: null,
    bought: null,
    _id: "60664d5e10a23649fc82d89a",
    fullName: "test",
    username: "test2",
    email: "test@gmail.com",
    password: "$2b$10$EF/eNryjU/DNhay4K/e7ouU5sX7gRrKvIv4cOVgXFxFy0LAyxcBSK",
    address: "afsdfasfasdfsadfas",
    nickname: "tester",
    creditcard: "94994949494994949",
    shippingaddress: "dafsfasfasfasdfasd",
    date: "2021-04-01T22:46:54.025Z",
}

const userlogin = {
    email: "test@gmail.com",
    password: "passy"
}
const user = async () => {
    const user = await axios.post("http://localhost:5000/login", userlogin)
    console.log(user['data'])
    return user;
}

const updateUser = async () => {
    const user = await axios.put("http://localhost:5000/update", userupdated)
    console.log(user['data'])
    return user;
}

export default user();