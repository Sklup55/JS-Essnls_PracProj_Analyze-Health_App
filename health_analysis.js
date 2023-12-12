const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const patients = [];


function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }


function generateReport() {
const numPatients = patients.length;
const conditionsCount = {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
};
const genderConditionsCount = {
    Male: {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
    },
    Female: {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
    },
};

for (const patient of patients) {
    conditionsCount[patient.condition]++;
    genderConditionsCount[patient.gender][patient.condition]++;
}

report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
report.innerHTML += `Conditions Breakdown:<br>`;
for (const condition in conditionsCount) {
    report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
}

report.innerHTML += `<br>Gender-Based Conditions:<br>`;
for (const gender in genderConditionsCount) {
    report.innerHTML += `${gender}:<br>`;
    for (const condition in genderConditionsCount[gender]) {
    report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
    }
}
}


function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
      patients.push({ name, gender: gender.value, age, condition });
      resetForm();
      generateReport();
    }
}

function filterByCondition(condition) {
    const filteredPatients = patients.filter(patient => patient.condition === condition);
    return filteredPatients.length;
  }

function filterByAgeGroup(minAge, maxAge, gender) {
const filteredPatients = patients.filter(patient => {
    const age = parseInt(patient.age);
    const patientGender = patient.gender.toLowerCase();
    return age >= minAge && age <= maxAge && patientGender === gender;
});
return filteredPatients.length;
}


function handleNavigationClick(event) {
    event.preventDefault();
  
    const id = event.target.id;
    let result;
  
    switch (id) {
      case "showAll":
        generateAndDisplayReport();
        break;
      case "searchByCondition":
        const condition = prompt("Enter condition (Diabetes, Thyroid, High Blood Pressure):");
        if (condition) {
          result = filterByCondition(condition);
          report.innerHTML = `Number of people with ${condition}: ${result}`;
        }
        break;
      case "filterByAge":
        const min = parseInt(prompt("Enter min age:"));
        const max = parseInt(prompt("Enter max age:"));
        const gender = prompt("Enter gender (Male/Female):").toLowerCase();
        if (!isNaN(min) && !isNaN(max) && (gender === "male" || gender === "female")) {
          result = filterByAgeGroup(min, max, gender);
          report.innerHTML = `Number of ${gender} between ${min} and ${max} years: ${result}`;
        }
        break;
      default:
        break;
    }
}


// Adding event listener to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => link.addEventListener("click", handleNavigationClick));

// Event listener for the "Add Patient" button
addPatientButton.addEventListener("click", addPatient);