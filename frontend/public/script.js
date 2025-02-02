function loadStudents() {
    fetch('http://localhost:3000/students').then(async response => {
        const result = await response.json();

        if(response.status === 200) {
            const students = result.data;
            const table = document.getElementById('students-list');

            // clear the table to dynamically add new data
            table.innerHTML = '';

            if(students.length === 0) {
                showToast("No students found", 'is-warning');
                return;
            }

            // append each student to the table as a new row
            students.forEach(student => {
                const row = table.insertRow(-1);
                row.insertCell(0).textContent = student._id;
                row.insertCell(1).textContent = student.firstName;
                row.insertCell(2).textContent = student.lastName;
                row.insertCell(3).textContent = student.course;
                row.insertCell(4).innerHTML = 
                `<button class="button is-small is-link is-rounded" onclick="setUpdate('${student._id}', '${student.firstName}', '${student.lastName}', '${student.course}')">Edit</button>
                <button class="button is-small is-danger is-rounded" onclick="deleteStudent('${student._id}')">Delete</button>`;
            });
        } else {
            showToast(result.message, 'is-danger');
        }
    }).catch(error => {
        console.error(error);
        showToast("Error loading students", 'is-danger');
    });
}

function deleteStudent(id) {
    fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE'
    }).then(async response => {
        const result = await response.json();

        if(response.status === 200) {
            showToast(result.message, 'is-success');
        } else {
            showToast(result.message, 'is-danger');
        }

        // reload the table
        loadStudents();
    }).catch(error => {
        console.error(error);
        showToast("Error deleting student", 'is-danger');
    });
}

function showToast(message, type) {
    bulmaToast.toast({
        message: message,
        type: type,
        position: 'bottom-right',
        duration: 3000
    });
}

function submitForm() {
    const id = document.getElementById('student-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const course = document.getElementById('course').value;

    const data = {
        firstName: firstName,
        lastName: lastName,
        course: course
    };

    // determine the method to use
    // if id exists, update the student
    // else add a new student
    const addOrUpdateStudent = id ? updateStudent(data, id) : addStudent(data);

    // add loader to the button
    const button = document.getElementById('submit-btn');
    button.classList.add('is-loading');

    // send the data to the server
    addOrUpdateStudent.then(async response => {
        const result = await response.json();

        if(response.status === 200) {
            showToast(result.message, 'is-success');

            // reload the table
            loadStudents();
        } else {
            showToast(result.message, 'is-danger');
        }
        
        clearForm();
    }).catch(error => {
        console.error(error);
        showToast("An error occurred", 'is-danger');
    }).finally(() => {
        // remove loader from the button
        button.classList.remove('is-loading');
    });
}

function clearForm() {
    document.getElementById('student-id').value = '';
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('course').value = '';
}

function setUpdate(id, firstName, lastName, course) {
    document.getElementById('student-id').value = id;
    document.getElementById('first-name').value = firstName;
    document.getElementById('last-name').value = lastName;
    document.getElementById('course').value = course;
}

function addStudent(data) {
    return fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function updateStudent(data, id) {
    return fetch(`http://localhost:3000/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

loadStudents();