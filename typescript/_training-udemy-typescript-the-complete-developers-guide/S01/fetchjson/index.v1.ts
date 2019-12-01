import axios from "axios";

const url = "http://jsonplaceholder.typicode.com/todos/1";

axios.get(url).then(response => {
  // v1
  console.log(response.data);
});
