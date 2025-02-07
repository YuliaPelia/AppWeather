  //? Axios
  import axios from "axios";
//   axios.get('https://jsonplaceholder.typicode.com/comments')
//   .then(comments => console.log(comments))
//   .catch(err => console.log(err));

//! post in axios
  const newComment = {
    title: 'New Comment Title',
    body: "New Comment Body"
  }
axios.post('https://jsonplaceholder.typicode.com/comments', newComment)
  .then(comment => console.log('коментар успішно був доданий', comment))
  .catch(err => console.log(err));