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