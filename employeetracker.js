// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: ' employeetrackerDB'
});

// Connection
connection.connect(function(err) {
    if (err) throw err
    console.log('Connect as ID' + connection.threadId)
    startPrompt();
});

// Initial Prompt
function startPrompt() {
    inquirer.prompt([
        {
        
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
                'View All Employees?',
                'View All Employees By Roles?',
                'View All Employees By Department?',
                'Update Employee?',
                'Add Employee?',
                'Add Role?',
                'Add Department?',
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case 'View All Employees?':
                viewAllEmployees();
            break;

            case 'View All Employees By Roles?':
                viewAllRoles();
            break;

            case 'View All Employees By Department?':
                viewAllDepartments();
            break;

            case 'Update Employee?':
                updateEmployee();
            break;

            case 'Add Employee?':
                addEmployee();
            break;

            case 'Add Role?':
                addRole();
            break;

            case 'Add Department?':
                addDepartment();
            break;
        }
    })
}

// View All Employees
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// View All Employees
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}