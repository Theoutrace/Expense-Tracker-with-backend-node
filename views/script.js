// form
const form = document.getElementById("form-id");
let idValue = document.getElementById("hidden-for-ids");
const priceValue = document.getElementById("price-id");
const categoryValue = document.getElementById("category-id");
const descriptionValue = document.getElementById("description-id");
const submitFormBtn = document.getElementById("form-submit");
submitFormBtn.addEventListener("click", onSubmit);

document.addEventListener("DOMContentLoaded", getAllItems);
async function getAllItems() {
  const response = await fetch(`http://localhost:3000/expenses`).then((res) =>
    res.json()
  );

  response.map((item) => {
    toUi(item);
  });
}
function onSubmit(e) {
  e.preventDefault();
  //form validation
  if (
    priceValue.value === "" ||
    categoryValue.value === "" ||
    descriptionValue.value === ""
  ) {
    alert("Fill All The Fields");
  } else {
    // make item objects
    const formObj = {
      price: priceValue.value,
      category: categoryValue.value,
      description: descriptionValue.value,
      id: idValue.value,
    };

    // send this object to a function to send to the database
    postToDb(formObj);

    priceValue.value = "";
    categoryValue.value = "";
    descriptionValue.value = "";
  }
}

//function creates a post to the "" backend ""
async function postToDb(obj) {
  if (obj.id == "0") {
    try {
      const response = await fetch(`http://localhost:3000/add-expense`, {
        method: "POST",
        body: JSON.stringify({
          price: obj.price,
          category: obj.category,
          description: obj.description,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      toUi(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `http://localhost:3000/update-expense/${obj.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            price: obj.price,
            category: obj.category,
            description: obj.description,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      toUi(obj);
    } catch (error) {
      console.log(error);
    }
  }
}

// function which creates objects in "" UI "" :: accepts an object
function toUi(obj) {
  const singleItem = document.createElement("div");
  const pricedescription = document.createElement("div");
  const priceContainer = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  const categoryContainer = document.createElement("div");
  const editDelete = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  //add required classes
  singleItem.classList.add(
    "rounded",
    "p-3",
    "d-flex",
    "justify-content-between",
    "single-item-cls",
    "my-1"
  );
  pricedescription.classList.add("d-flex", "flex-column", "col-3", "px-2");
  priceContainer.classList.add(
    "text-white",
    "text-capitalize",
    "font-weight-bold"
  );

  descriptionContainer.classList.add(
    "text-light",
    "font-weight-light",
    "small"
  );
  categoryContainer.classList.add(
    "text-light",
    "col-6",
    "px-0",
    "small",
    "d-flex",
    "align-items-center"
  );
  editDelete.classList.add(
    "container",
    "col-3",
    "d-flex",
    "justify-content-center",
    "p-1"
  );

  editBtn.classList.add(
    "bg-dark",
    "border-0",
    "text-center",
    "text-light",
    "rounded",
    "col-6",
    "px-2",
    "py-1",
    "m-1",
    "small",
    "align-content-xl-center"
  );
  deleteBtn.classList.add(
    "bg-danger",
    "border-0",
    "text-center",
    "text-light",
    "rounded",
    "col-6",
    "px-2",
    "py-1",
    "m-1",
    "align-content-xl-center",
    "small"
  );

  //assigning inner values to all elements
  deleteBtn.innerHTML = "🗑️ Drop";
  editBtn.innerHTML = "✍ Edit";
  priceContainer.innerHTML = `Rs. ${obj.price}`;
  descriptionContainer.innerHTML = obj.description;
  categoryContainer.innerHTML = `🟢 ${obj.category}`;

  //append all items in respective parent div container
  // button container
  editDelete.appendChild(editBtn);
  editDelete.appendChild(deleteBtn);
  // price and description container
  pricedescription.appendChild(priceContainer);
  pricedescription.appendChild(descriptionContainer);

  // append all parents divs, category container, button container to single item container div
  singleItem.appendChild(pricedescription);
  singleItem.appendChild(categoryContainer);
  singleItem.appendChild(editDelete);

  //append single item container to the target div in UI html page
  const targetDivInUi = document.getElementById("targetRootId");
  targetDivInUi.appendChild(singleItem);

  //assiging delete functionality to delete btn
  deleteBtn.addEventListener("click", deleteItem);
  async function deleteItem() {
    deleteBtn.parentElement.parentElement.remove();
    //delete from backend here by collecting id of the object obj.id
    console.log(obj.id);
    try {
      const response = await fetch(
        `http://localhost:3000/del-expense/${obj.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert(`Successfully Deleted data of ${obj.category}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editBtn.addEventListener("click", editItem);
  function editItem() {
    priceValue.value = obj.price;
    categoryValue.value = obj.category;
    descriptionValue.value = obj.description;
    idValue.value = obj.id; // get the _id of the item and pass it here
    deleteBtn.parentElement.parentElement.remove();
  }
}
