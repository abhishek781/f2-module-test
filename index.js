

const students = [
  //ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
  // { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
  // { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree: 'Arts', email: 'charlie@example.com' }
];

const studentsTableBody = document.querySelector("#students-table-body");
const addStudentForm = document.querySelector("#add-student-form");
const searchInput = document.querySelector("#search");

// Function to render students on table
function renderTable() {
  let tableRows = "";
  students.forEach(student => {
    tableRows += `
      <tr>
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>  
        <td><span class="deg">${student.degree}<span> <button class="edit-btn" data-id="${student.ID}">	<img class="edit-img" src="edit.png"></button>
        <button class="delete-btn" data-id="${student.ID}">	<img class="edit-img" src="delete.png"></button></td>
       
       
          
        
      </tr>
    `;
  });
  studentsTableBody.innerHTML = tableRows;

}

// Initial rendering of table
renderTable();

// Function to add new student to array
function addStudent() {
  const nameInput = addStudentForm.querySelector("#name");
  const ageInput = addStudentForm.querySelector("#age");
  const gradeInput = addStudentForm.querySelector("#grade");
  const degreeInput = addStudentForm.querySelector("#degree");
  const emailInput = addStudentForm.querySelector("#email");

  const newStudent = {
    ID: students.length + 1,
    name: nameInput.value,
    age: ageInput.value,
    grade: gradeInput.value,
    degree: degreeInput.value,
    email: emailInput.value
  };

  students.push(newStudent);
  console.log(students);
  renderTable();
  addStudentForm.reset();
}

// Function to update existing student in array
function updateStudent(id) {
  const nameInput = addStudentForm.querySelector("#name");
  const ageInput = addStudentForm.querySelector("#age");
  const gradeInput = addStudentForm.querySelector("#grade");
  const degreeInput = addStudentForm.querySelector("#degree");
  const emailInput = addStudentForm.querySelector("#email");

  const studentIndex = students.findIndex(student => student.ID == id);
  if (studentIndex != -1) {
    students[studentIndex].name = nameInput.value;
    students[studentIndex].age = ageInput.value;
    students[studentIndex].grade = gradeInput.value;
    students[studentIndex].degree = degreeInput.value;
    students[studentIndex].email = emailInput.value;

    renderTable();
    addStudentForm.reset();
    addStudentForm.querySelector("#update-student-btn").textContent = "Update Student";
  }
}

// Function to delete student from array
function deleteStudent(id) {
  const studentIndex = students.findIndex(student => student.ID == id);
  if (studentIndex != -1) {
    students.splice(studentIndex, 1);
    renderTable();
  }
}

// Event listener for add student form submit
addStudentForm.addEventListener("submit", event => {
  event.preventDefault();
  const submitBtn = addStudentForm.querySelector("#add-student-btn");
  if (submitBtn.textContent == "Add Student") {
    addStudent();

} else if(submitBtn.textContent == "Update Student") {
const studentID = submitBtn.getAttribute("data-id");
updateStudent(studentID);
}
});

// Event listener for edit and delete buttons
studentsTableBody.addEventListener("click", event => {
if (event.target.classList.contains("edit-btn")) {
const studentID = event.target.getAttribute("data-id");
const student = students.find(student => student.ID == studentID);
if (student) {
addStudentForm.querySelector("#name").value = student.name;
addStudentForm.querySelector("#age").value = student.age;
addStudentForm.querySelector("#grade").value = student.grade;
addStudentForm.querySelector("#degree").value = student.degree;
addStudentForm.querySelector("#email").value = student.email;
addStudentForm.querySelector("#submit-btn").textContent = "Update Student";
addStudentForm.querySelector("#submit-btn").setAttribute("data-id", studentID);
}
} else if (event.target.classList.contains("delete-btn")) {
const studentID = event.target.getAttribute("data-id");
deleteStudent(studentID);
}
});

// Function to search for students by name
function searchStudents() {
const searchText = searchInput.value.toLowerCase();
const filteredStudents = students.filter(student => student.name.toLowerCase().includes(searchText));
searchrenderTable(filteredStudents);


}


function searchrenderTable(filteredStudents) {
  let tableRows = "";
  filteredStudents.forEach(student => {
    tableRows += `
    <tr>
    <td>${student.ID}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.grade}</td>  
    <td><span class="deg">${student.degree}<span> <button class="edit-btn" data-id="${student.ID}">	<img class="edit-img" src="edit.png"></button>
    <button class="delete-btn" data-id="${student.ID}">	<img class="edit-img" src="delete.png"></button></td>
   
   
      
    
  </tr>
    `;
  });
  studentsTableBody.innerHTML = tableRows;


}

// Event listener for search input
searchInput.addEventListener("input", searchStudents);





