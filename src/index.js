let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // challenge 2 ADDING TOYS
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const postToy = {
      name: e.target.toyName.value,
      image: e.target.imageUrl.value,
      likes: 0,
    };
    addToys(postToy);
    updateLikes(postToy)
  });
  // challenge 1 displaying the toys onto the DOM
  function displayToys(items) {
    let toyHolder = document.querySelector("#toy-collection");
    let toys = document.createElement("ul");
    let toyList = document.createElement("li");
    toyList.innerHTML = `
<div class="card">
<h2>${items.name}</h2>
<img src=${items.image} alt=${items.name} class="toy-avatar"/>
<p id="likes">${items.likes} Likes</p>
<button class="like-btn" id="${items.id}"> Like</button>
</div>
`;

let addLikes = toyList.querySelector(".like-btn")
addLikes.addEventListener("click", displayLike)

function displayLike(e) {
  e.preventDefault()
  items.likes += 1
  toyList.querySelector("#likes").textContent= items.likes
  updateLikes(items)
}
    toys.appendChild(toyList);
    toyHolder.appendChild(toys);
  }

  // GET request
  const toysUrl = "http://localhost:3000/toys";

  function fetchToys() {
    fetch(toysUrl)
      .then((res) => res.json())
      .then((data) => data.forEach((items) => displayToys(items)))
      .catch((error) => console.error("error", error));
  }

  // post request
  function addToys(postToy) {
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postToy),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("error", error));
  }


  // patch request
  function updateLikes(postToy) {
    fetch(`http://localhost:3000/toys/${postToy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToy)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error("error", error))
  }
  // calling the get Request
  fetchToys();
});
