const response = await fetch("https://reqres.in/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify({
    name: "Elon Musk",
    job: "billionaire"
  })
});

const body = await response.json();

console.log(body);
