document.addEventListener("DOMContentLoaded", () => {
  let currentDog;
  fetch(`http://localhost:3000/dogs`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((dog) => loadDogs(dog));
      submit();
    });
  const tbody = document.getElementById("table-body");

  function loadDogs(dog) {
    // currentDog = dog;
    // console.log(currentDog)
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    const breed = document.createElement("td");
    const sex = document.createElement("td");
    const edit = document.createElement("button");

    edit.addEventListener("click", () => {
      console.log(dog);
      currentDog = dog;
      document.querySelector("input[name=name]").value = dog.name;
      document.querySelector("input[name=breed]").value = dog.breed;
      document.querySelector("input[name=sex]").value = dog.sex;
    });
    name.textContent = dog.name;
    breed.textContent = dog.breed;
    sex.textContent = dog.sex;
    edit.textContent = "Edit Dog";
    tr.append(name, breed, sex, edit);
    tbody.append(tr);
  }

  function submit() {
    const form = document.getElementById("dog-form");

    form.addEventListener("submit", (e) => {
      // e.preventDefault();
      console.log("submit");
      const name = document.querySelector("input[name=name]").value;
      const breed = document.querySelector("input[name=breed]").value;
      const sex = document.querySelector("input[name=sex]").value;
      const editedDog = {
        name: name,
        breed: breed,
        sex: sex,
      };
      console.log(currentDog.id);
      const configObject = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editedDog),
      };
      fetch(`http://localhost:3000/dogs/${currentDog.id}`, configObject)
        .then((res) => res.json())
        // .then(
        //   fetch(`http://localhost:3000/dogs`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //       data.forEach((dog) => loadDogs(dog));
        //     })
        // );
    });
  }
});

//  {
//   "id": 1,
//   "name": "Baby",
//   "breed": "Scottish Deerhound",
//   "sex": "male"
// },
