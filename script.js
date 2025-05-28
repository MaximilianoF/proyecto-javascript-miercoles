 const students=[];

 const tableBody=document.querySelector("#studentTable tbody");

 function addStudentToTable(student){
   const row=document.createElement("tr");
   row.innerHTML=`
   <td>${student.name}</td>
    <td>${student.lastName}</td>
     <td>${student.grade}</td>
     <td><button class="delete"> Eliminar</button></td>
   `;

  row.querySelector(".delete").addEventListener("click", function(){
    deleteEstudiante(student,row);
  });


tableBody.appendChild(row)
 }

function deleteEstudiante(student,row){
  const index=students.indexOf(student);
  if(index > -1){
    students.splice(index, 1);
    row.remove();
    calcularPromedio();
  }
}

 function updateAverage() {
    if (students.length === 0) {
        document.getElementById("averageText").textContent = "Promedio de calificaciones: 0";
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const average = (total / students.length).toFixed(2);

    document.getElementById("averageText").textContent = "Promedio de calificaciones: " + average;
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);

  document.getElementById("nameError").textContent = "";
   document.getElementById("lastNameError").textContent = "";
   document.getElementById("gradeError").textContent = "";

  let hasError = false;

  if (!name) {

    document.getElementById("nameError").textContent = "El nombre es obligatorio.";
    hasError = true;
    }

    if (!lastName){
      document.getElementById("lastNameError").textContent = "El apellido es obligatorio.";
      hasError = true;
    }

    if (isNaN(grade)){
      document.getElementById("gradeError").textContent = "La nota es obligatoria.";
       hasError = true;
    } else if (grade < 1 || grade > 7) {
      document.getElementById("gradeError").textContent = "La nota debe estar entre 1 y 7.";
      hasError = true;
    }

    if (hasError){
      return;
    }

    const student = { name, lastName, grade };
    students.push(student);
    addStudentToTable(student);
    updateAverage();
    this.reset();
});
