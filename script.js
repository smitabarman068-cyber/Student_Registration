
// Get HTML elements

const form = document.getElementById("studentForm");

const table = document.getElementById("studentTable");

const emptyMessage = document.getElementById("emptyMessage");


// Get existing student data from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];


// Form Submit Event

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const gender = document.getElementById("gender").value;

    const course = document.getElementById("course").value;

    const editIndex = document.getElementById("editIndex").value;


    // Validation

    const nameValid = /^[a-zA-Z ]+$/.test(name);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const phoneValid = /^[0-9]{10}$/.test(phone);


    // Check all fields

    if (!nameValid || !emailValid || !phoneValid || !gender || !course) {

        form.classList.add("was-validated");

        return;

    }


    // Create Student Object

    const student = {

        name: name,

        email: email,

        phone: phone,

        gender: gender,

        course: course

    };


    // Add or Update

    if (editIndex === "") {

        students.push(student);

        alert("Student Added Successfully!");

    }

    else {

        students[Number(editIndex)] = student;

        alert("Student Updated Successfully!");

    }


    // Save Data

    saveData();


    // Reset Form

    form.reset();

    form.classList.remove("was-validated");

    document.getElementById("editIndex").value = "";

    document.getElementById("submitBtn").innerText = "Add Student";

});


// Save Student Data

function saveData() {

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}


// Display Student Records

function displayStudents() {

    table.innerHTML = "";

    emptyMessage.style.display = students.length === 0 ? "block" : "none";


    students.forEach((student, index) => {

        const row = document.createElement("tr");


        // ID

        const idCell = document.createElement("td");

        idCell.textContent = index + 1;

        row.appendChild(idCell);


        // Student Details

        const values = [

            student.name,

            student.email,

            student.phone,

            student.gender,

            student.course

        ];


        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });


        // Action Cell

        const actionCell = document.createElement("td");


        // Edit Button

        const editBtn = document.createElement("button");

        editBtn.innerText = "Edit";

        editBtn.className = "btn btn-warning btn-sm me-2";

        editBtn.addEventListener("click", () => {

            editStudent(index);

        });


        // Delete Button

        const deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", () => {

            deleteStudent(index);

        });


        actionCell.append(editBtn, deleteBtn);

        row.appendChild(actionCell);

        table.appendChild(row);

    });

}


// Edit Student Function

function editStudent(index) {

    const student = students[index];


    document.getElementById("name").value = student.name;

    document.getElementById("email").value = student.email;

    document.getElementById("phone").value = student.phone;

    document.getElementById("gender").value = student.gender;

    document.getElementById("course").value = student.course;


    document.getElementById("editIndex").value = index;


    document.getElementById("submitBtn").innerText = "Update Student";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// Delete Student Function

function deleteStudent(index) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");


    if (confirmDelete) {

        students.splice(index, 1);

        saveData();

        alert("Student Deleted Successfully!");

    }

}


// Clear Button Event

document.getElementById("resetBtn").addEventListener("click", function() {

    document.getElementById("editIndex").value = "";

    document.getElementById("submitBtn").innerText = "Add Student";

    form.classList.remove("was-validated");

});


// Display Saved Records When Page Opens

displayStudents();
