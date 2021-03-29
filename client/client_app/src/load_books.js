import axios from 'axios'
const getBooksFromDB = async () => {
    let data = [];
    const booksapi = await axios.get('https://cen4010-group2.herokuapp.com/book/getAll')
    .then((response) => {
      data = response['data'];
      return data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    console.log(booksapi);
    const books = booksapi['allBooks'].map((book) => {
      book['quantity'] = 0;
      return book
    })
    return books;
};

const booksFromDB = getBooksFromDB();

export default booksFromDB;