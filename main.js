const students = [
  {
    id: 1,
    name: "Harry",
    house: "Gryffindor",
    // imageUrl:
    //   "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVdiN-_wZaHOQaOmcNOQV3tslILnvIbOxCzRHKWf7gV8jQZtHL7dfp9-2Fk2SpCNSo5dl0vFr6NKq2lZrauRkGQN9eXX1GL24_mGf43_qXSr7bZd-_q0btSQhDZCdw-YS7A5bCAcRdLXqd0CiHtsmPi_upb-Bd8dYEx86fse-hC9cqd7LJOOtwuVn3aQ/s750/gryffindor%20(1)-min.jpg",
  },
  {
    id: 2,
    name: "Draco",
    house: "Slytherin",
    // imageUrl:
    //   "https://cdn11.bigcommerce.com/s-ydriczk/products/88362/images/91127/Harry-Potter-Slytherin-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__31920.1507640618.450.659.jpg?c=2",
  },
  {
    id: 3,
    name: "Matilda",
    house: "Ravenclaw",
    // imageUrl:
    //   "https://www.seekpng.com/png/detail/184-1840811_ravenclaw-crest-harry-potter-harry-potter-ravenclaw-house.png",
  },
  {
    id: 4,
    name: "John",
    house: "Hufflepuff",
    // imageUrl:
    //   "https://www.pngitem.com/pimgs/m/484-4841260_printable-harry-potter-hufflepuff-hd-png-download.png",
  },
];

const voldemortStudents = [];

// Render to DOM utility function
const renderToDom = (divID, htmlToRender) => {
  const selectedDiv = document.querySelector(divID);
  selectedDiv.innerHTML = htmlToRender;
};

// Create and put cards on the DOM
//•••••FIRST YEAR STUDENTS•••••
const renderStudents = (arr) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" style="width: 18rem;" margin-bottom: 0;> 
    <header>${student.name}</header> 
    <div class="card-body">
      <div>${student.house}</div>
      <button class="btn btn-danger" id="expel--${student.id}">Expel</button>
  </div>
</div>`;
  }

  renderToDom("#firstYearContainter", domString);
};

//•••••EXPELLED STUDENTS•••••
const renderExpelledStudents = (arr) => {
  let domString = "";
  for (const student of arr) {
    domString += `<div class="card" style="width: 18rem;" margin-bottom: 0;> 
    <header>${student.name}</header>
  </div>
</div>`;
  }

  renderToDom("#voldemortsContainer", domString);
};

// function to filter animals by type
const filter = (array, typeString) => {
  const personArray = [];

  for (const person of array) {
    if (person.house === typeString) {
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

// 2. Add click event to show all the animals on button click using the function we created above
showAllButton.addEventListener("click", () => {
  console.log(students);
  renderStudents(students);
});

// 3. Add click event to filter all the animals by house on button click
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

//••••CREATE••••

// 1. Creating new student and sorting student
const newStudent = (event) => {
  event.preventDefault(); // EVERY TIME YOU CREATE A FORM

  function randomStudent(max) {
    return Math.floor(Math.random() * max);
  }

  function assignRandom() {
    if (randomStudent(3) === 0) {
      return "Gryffindor";
    } else if (randomStudent(3) === 1) {
      return "Hufflepuff";
    } else if (randomStudent(3) === 2) {
      return "Ravenclaw";
    } else if (randomStudent(3) === 3) {
      return "Slytherin";
    }
  }

  const sortStudent = {
    id: students.length + 1,
    name: document.querySelector("#name").value,
    house: assignRandom(),
  };

  console.log(sortStudent);
  students.push(sortStudent);
  renderStudents(students);
};

// 2. Add an event listener for the form submit and pass it the function (callback)

const submitButton = document.querySelector("#form-submit");
submitButton.addEventListener("click", newStudent);

// ••••DELETE••••

// 1. Target the app div
const appDiv = document.querySelector("#firstYearContainter");

// 2. Add an event listener to capture clicks

appDiv.addEventListener("click", (e) => {
  console.log(e.target.id);

  // 3. check e.target.id includes "delete"
  if (e.target.id.includes("expel")) {
    const [, studentid] = e.target.id.split("--");

    // 4. add logic to remove from array
    // .findIndex is an array method
    const indexOfStudent = students.findIndex(
      (e) => e.id === Number(studentid)
    );

    // .splice modifies the original array
    const bannedStudent = students.splice(indexOfStudent, 1);
    voldemortStudents.push(...bannedStudent);
    console.log(bannedStudent);

    // 6. Repaint the DOM with the updated array
    renderStudents(students);
    renderExpelledStudents(voldemortStudents);
  }
});

// const startApp = () => {
//   renderStudents(students);
// };
// // events(); // ALWAYS LAST

// startApp();
