//! AJAX - це підхід який дозволяє обмінюватися данними між клієнтом і сервером без перезавантаження сторінки

//! fetch - це функція(метод) яка використовується для виконання HTTP-запитів на сервер

fetch("https://jsonplaceholder.typicode.com/users")
  //? response.json() - метод який перетаорює відповідь сервера в обєкт JS
  .then((response) => response.json())
  .then((users) => console.log("отримані дані у форматі JS", users))
  .catch((err) => console.log(err));

fetch("https://jsonplaceholder.typicode.com/users")
  //? response.text() - метод який перетаорює відповідь сервера в рядок
  .then((response) => response.text())
  .then((users) => console.log("отримані дані у форматі тексту", users))
  .catch((err) => console.log(err));

fetch(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg"
)
  //? response.blob() - метод який перетаорює відповідь сервера на обєкт blob(вид файлу, розмер файлу)
  //? метод який парсить дані що описують файл, наприклад зображення текстовий документ відео або аудіо
  .then((response) => response.blob())
  .then((users) => console.log("отримані дані у форматі blob", users))
  .catch((err) => console.log(err));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTI4N2EwNzE1MWM4YTM2YTg4YzYwZGM5ZjdlOTJkNCIsIm5iZiI6MTczNTIzOTY0NS40MzIsInN1YiI6IjY3NmRhN2RkMzU1YmVjMDdiMDkyOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Kle9tWedFFb_1CcYRFm1TNEK0QRmG9eEtSFR3-ND_o",
  },
};
//? fetch - приймає в себе 2 агументи - URL і об'єкт параметрів
fetch("https://api.themoviedb.org/3/account/21711271/lists?page=1", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

const listUsers = document.querySelector(".list-users");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const item = document.createElement("li");
      item.innerHTML = `<h2>${user.name}</h2> <br> <p>${user.email}</p> <br> <p>${user.address.street}</p> <br> <p>${user.address.city}</p>`;
      listUsers.appendChild(item);
    });
  })
  .catch((err) => console.error(err));

const movieLIst = document.querySelector(".movie-list");
const optionsFav = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTI4N2EwNzE1MWM4YTM2YTg4YzYwZGM5ZjdlOTJkNCIsIm5iZiI6MTczNTIzOTY0NS40MzIsInN1YiI6IjY3NmRhN2RkMzU1YmVjMDdiMDkyOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Kle9tWedFFb_1CcYRFm1TNEK0QRmG9eEtSFR3-ND_o",
  },
};

fetch(
  "https://api.themoviedb.org/3/account/21711271/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
  optionsFav
)
  .then((res) => res.json())
  .then((res) => {
    res.results.forEach((movie) => {
      const item = document.createElement("li");
      item.innerHTML = `<h2>${movie.title}</h2> <br> <img src='https://image.tmdb.org/t/p/w500${movie.backdrop_path}' alt='Hello'>`;
      movieLIst.appendChild(item);
    });
  })

  .catch((err) => console.error(err));

//! Помилка новачка
let globalVariable; // undefined

// Initializing data fetching
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    console.log("users inside then callback: ", users);

    // Writing the result to a global variable
    globalVariable = users;

    // Everything is ok here, the data is in the variable
    console.log("globalVariable inside fetch callback: ", globalVariable);
  });

console.log("answer after fetch in the global view ", globalVariable);

//!!! результат виконання асинхронного коду завжди завантажуються в самому кінці коду, тобто після всього синхронного коду
let count = 1;
let timeout = setTimeout(() => {
  count = 10;
  console.log("ассинхроний код", count);
}, 1);
for (let i = 0; i < 10000000000; i++) {}
console.log("завершення виконання синхроного коду ", count);
//завершення виконання синхроного коду  1
// ассинхроний код 10

//? параметри рядка запиту

//? Клас URLSearchParams - це клас, який дозволяє надавати параметри в рядку запиту

const paramsForrequestComments = new URLSearchParams({
  _start: 5,
  _limit: 10,
  _sort: "email",
});
console.log(paramsForrequestComments.toString());

fetch(
  "https://jsonplaceholder.typicode.com/comments?" +
    paramsForrequestComments.toString()
)
  .then((response) => response.json())
  .then((coments) => console.log(coments))
  .catch((err) => console.log(err));

//? https - заголовки

const headers = new Headers({
  "accept": 'application/json',
  "X-Custom-Header": "custom value",
})

headers.set('content-type', 'application/json')
headers.delete('content-type')
console.log(headers);

console.log(headers.has('accept'));

console.log(headers.get('accept'));


fetch(
  "https://jsonplaceholder.typicode.com/comments?", {
    headers
  }
)
  .then((response) => response.json())
  .then((coments) => console.log(coments))
  .catch((err) => console.log(err));



