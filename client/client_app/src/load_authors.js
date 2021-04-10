import axios from 'axios'
const getAuthorFromDB = async () => {
    let data = [];
    const authorapi = await axios.get('https://cen4010-group2.herokuapp.com/author/getall')
    .then((response) => {
      data = response['data'];
      return data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    console.log(authorapi);
    return authorapi['allAuthors'];
};

const authorFromDB = getAuthorFromDB();

export default authorFromDB;