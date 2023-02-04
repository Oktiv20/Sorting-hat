const students = [
  {
    id: 1,
    name: "Harry",
    house: "Gryffindor",
    houseColor: "red"
  },
  {
    id: 2,
    name: "Draco",
    house: "Slytherin",
    houseColor: "green"
  },
  {
    id: 3,
    name: "Matilda",
    house: "Ravenclaw",
    houseColor: "purple"
  },
  {
    id: 4,
    name: "John",
    house: "Hufflepuff",
    houseColor: "yellow"
  },
];

const voldemortStudents = [
  {
    id: 1,
    name: "Bellatrix Lestrange"
  }
];



// Render to DOM utility function
const renderToDom = (divID, htmlToRender) => {
  const selectedDiv = document.querySelector(divID);
  selectedDiv.innerHTML = htmlToRender;
};

// JS CODE TO HIDE AND SHOW FORM
const form = document.querySelector("form")
const toggleBtn = document.querySelector("#showForm");
const divList = document.querySelector("#show");

toggleBtn.addEventListener("click", () => {
  console.log(toggleBtn)
  if(divList.style.display === "none") {
    divList.style.display = "block";
  }
});

// function validation(){ 
//   let error = form.getElementById("name").value;
//    if (error === "") {
//     alert("Name must be filled out");
//     return false;
//    }
//   };

// FIRST YEAR & EXPELLED STUDENT CARD TEMPLATES
//•••••FIRST YEAR STUDENTS•••••
const renderStudents = (arr) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" style="width: 13rem;" margin-bottom: 0;> 
    <header style="background-color: lightgray">${student.name}</header>
    <div class="card-color" style="background-color:${student['houseColor']};</div> 
    <div class="card-body">
      <div>${student.house}</div>
      <button class="btn btn-danger" id="expel--${student.id}">Expel</button>
  </div>
</div>`;
  }

  renderToDom(".firstYearContainter", domString);
};

//•••••EXPELLED STUDENTS•••••
const renderExpelledStudents = (arr) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" style="width: 13rem;" margin-bottom: 0;>
    <img src="images/voldemort.png" 
    <p class="card-text">Voldemort has a new soldier! <br /> Welcome, ${student.name}.</p>
  </div>
</div>`;
  }

  renderToDom(".voldemortsContainer", domString);
};

// FUNCTION TO FILTER STUDENTS BY HOUSE
// Create a filter function(set to a variable) with arguments of the array (arr) and the string you want to filter by (houseString) and return a variable w/empty array
const filter = (array, houseString) => {
  const personArray = [];

  for (const person of array) {
    if (person.house === houseString) {
      personArray.push(person);
    }
  }
  return personArray;
};

// Code for Filter buttons
// 1. Target all of the buttons on the DOM

const gryffButton = document.querySelector("#gryffindor-btn");
const huffButton = document.querySelector("#hufflepuff-btn");
const ravenButton = document.querySelector("#ravenclaw-btn");
const slythButton = document.querySelector("#slytherin-btn");
const showAllButton = document.querySelector("#all-btn");

// 1. Get all the cards to render on the DOM
renderStudents(students);
renderExpelledStudents(voldemortStudents);

// 2. Add click event to show all the students on button click using the function we created above
showAllButton.addEventListener("click", () => {
  console.log(students);
  renderStudents(students);
});

// 3. Add click event to filter all the students by house on button click
gryffButton.addEventListener("click", () => {
  const allGryff = filter(students, "Gryffindor");
  console.log(allGryff);
  renderStudents(allGryff);
});

huffButton.addEventListener("click", () => {
  const allHuff = filter(students, "Hufflepuff");
  console.log(allHuff);
  renderStudents(allHuff);
});

ravenButton.addEventListener("click", () => {
  const allRaven = filter(students, "Ravenclaw");
  console.log(allRaven);
  renderStudents(allRaven);
});

slythButton.addEventListener("click", () => {
  const allSlytherin = filter(students, "Slytherin");
  console.log(allSlytherin);
  renderStudents(allSlytherin);
});

// Code to add house color to new students card
// let houseList = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
// let houseAlliance = {
//   "Gryffindor": "red",
//   "Slytherin": "green",
//   "Hufflepuff": "yellow",
//   "Ravenclaw": "purple"
// }

//••••CREATE••••

// 1. Create a new student function and a function that assigns new student to random house
const newStudent = (event) => {
  event.preventDefault(); // EVERY TIME YOU CREATE A FORM
  // const houseRep = houseList[];
// Create a function that uses an if...else statement with Math.random() to randomize the house for the student
  function randomStudent(max) {
    return Math.floor(Math.random() * max);
  }

  function assignRandom() {
    if (randomStudent(4) === 1) {
      return "Gryffindor";
    } else if (randomStudent(3) === 2) {
      return "Hufflepuff";
    } else if (randomStudent(3) === 3) {
      return "Ravenclaw";
    } else if (randomStudent(3) === 4) {
      return "Slytherin";
    }
  }

  
// Create a variable to give new student same properties as the template
  const sortStudent = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: assignRandom()
  };
  
  // houseColor: (houseAlliance[houseRep])

  console.log(sortStudent);
  students.push(sortStudent);
  renderStudents(students);
  form.reset();
};

// 2. Add an event listener for the form submit and pass it the function (callback)

const submitButton = document.querySelector("#form-submit");
submitButton.addEventListener("click", newStudent);

// ••••DELETE••••

// 1. Target the app div
const appDiv = document.querySelector(".firstYearContainter");

// 2. Add an event listener to capture clicks

appDiv.addEventListener("click", (e) => {
  console.log(e.target.id);

  // 3. check e.target.id includes "delete"
  if (e.target.id.includes("expel")) {
    const [, studentid] = e.target.id.split("--");

    // 4. add logic to remove from array
    // Create a function set to a variable and use the findIndex() method to search through the student array and make sure it is equal to the id of the object(student) you want to "delete"
    const indexOfStudent = students.findIndex(
      (e) => e.id === Number(studentid)
    );

    // .splice() the deleted card out of the first array and then push it to the new array
    // Use the splice() method set to a new variable to remove the "indexOfStudent" and .push(...) the new object(student) to the new array
    const bannedStudent = students.splice(indexOfStudent, 1);
    voldemortStudents.push(...bannedStudent);
    console.log(bannedStudent);

    // 6. Repaint the DOM with the updated array
    renderStudents(students);
    renderExpelledStudents(voldemortStudents);
  }
});

const startApp = () => {
  renderStudents(students);
};
// events(); // ALWAYS LAST

startApp();
