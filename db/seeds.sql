--Department Seeds
INSERT INTO department (department_name)
VALUE ("Sales");
INSERT INTO department (department_name)
VALUE ("Engineering");
INSERT INTO department (department_name)
VALUE ("Finance");
INSERT INTO department (department_name)
VALUE ("Legal");

--Department Roles
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 165000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);

--Employee Seeds
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jenna", "Haze", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tiffany", "Brookes", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mia","Gold", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bobbi", "Dylan", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Christy", "Mack", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jill", "Kassidy", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tiffany", "Star", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;