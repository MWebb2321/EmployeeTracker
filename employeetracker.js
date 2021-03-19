// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Macleod2321!",
  database: "employeetrackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as Id" + connection.threadId);
  startPrompt();
});

// Initial Prompt
const startPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "View All Employees By Roles?",
          "View All Employees By Department?",
          "Update Employee?",
          "Add Employee?",
          "Add Role?",
          "Add Department?",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View All Employees?":
          return viewAllEmployees();
        case "View All Employees By Roles?":
          return viewAllRoles();
        case "View All Employees By Department?":
          return viewAllDepartments();
        case "Update Employee?":
          return updateEmployee();
        case "Add Employee?":
          return addEmployee();
        case "Add Role?":
          return addRole();
        case "Add Department?":
          return addDepartment();
      }
    });
};

// View All Employees
const viewAllEmployees = () => {
  connection.query(
    'SELECT CONCAT(first_name, " ", last_name) AS Employee FROM employee',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
};

// View All Roles
const viewAllRoles = () => {
  connection.query(
    "SELECT title AS Role, salary AS Salary FROM role",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
};

// View All Employees By Department
const viewAllDepartments = () => {
  connection.query(
    "SELECT department_name AS Department FROM department",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
};

// Role Titles for Add Employee Prompt (AEP)
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

async function getRoleId(roleTitle) {
  var roleIndex;
  await connection.query(
    `SELECT id FROM role WHERE ?`,
    { title: roleTitle },
    function (err, res) {
      if (err) throw err;
      console.log(res[0].id);
      roleIndex = res[0].id;
    }
  );
  return roleIndex;
}

// Updating Employee
function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawList",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the employees last name?",
          },
          {
            name: "role",
            type: "rawList",
            message: "What is the employees new title?",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          connection.query(
            `SELECT id FROM role WHERE ?`,
            { title: val.role },
            function (err, res) {
              if (err) throw err;
              console.log(res[0].id);

              var roleId = res[0].id;
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  {
                    role_Id: roleId,
                  },
                  {
                    last_name: val.lastName,
                  },
                ],
                function (err, res) {
                  if (err) throw err;
                  console.table(val);
                  startPrompt();
                }
              );
            }
          );
        });
    }
  );
}

// Adding Employees
const addEmployee = () => {
  let query = "SELECT id, first_name AS name FROM employees";
  connection.query(query, (err, res) => {
    connection.query("SELECT id, title AS name FROM roles", (err, roles) => {
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: `What is the employee's first name?`,
          },
          {
            name: "last_name",
            type: "input",
            message: `What is the employee's last name?`,
          },
          {
            name: "title",
            type: "choice",
            message: `What is the employee's role?`,
            choices: ["Salesperson", "Engineering", "Finance", "Legal"],
          },
        ])
        .then((answer) => {
          const rolesIndex = roles.answer((role) => {
            return role.name === answer.role;
          });
          console.log(rolesIndex);
          const roleId = rolesIndex[0].id;
          const mgrIndex = manager.filter((mgr) => {
            return mgr.name === answer.manager;
          });
          const mgrId = mgrIndex[0].id;
          console.log(mgrIndex);
          const query = "INSERT INTO employees SET ?";
          const empInfo = {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: roleId,
            manager_id: mgrId,
          };
          connection.query(query, empInfo, (err, res) => {
            console.log(
              `${answer.first_name} ${answer.last_name} has been added!`
            );
            startPrompt();
          });
        });
    });
  });
};
// Add Employee Role
const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    console.log(res);
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this position?",
        },
        {
          name: "department",
          type: "choice",
          message: "Where does this role belong?",
        },
      ])
      .then((answer) => {
        const departmentAdd = res.filter((dept) => {
          return dept.name === answer.department;
        });
        const deptId = departmentAdd[0].id;
        const query = "INSERT INTO roles SET ?";
        const roleInfo = {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptId,
        };
      });
  });
};

// Add Department
const addDepartment = () => {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What department you would like to add?",
    })
    .then((answer) => {
      const query = "INSERT INTO department (name) VALUES ?";
      const departmentAdd = { name: answer.name };
      connection.query(query, departmentAdd, (err, res) => {
        console.log(`Department: ${answer.name} has been created`);
      });
    });
};
