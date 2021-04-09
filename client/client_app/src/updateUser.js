import axios from "axios"


const updateUser = async (user) => {
    const updatedUser = await axios.put("http://localhost:5000/update", user)
    console.log(updatedUser['data']['updateUser'])
    return updatedUser['data']['updateUser'];
}

export default updateUser;