--Creating Database
DROP DATABASE IF EXISTS employeetrackerDB;
CREATE DATABASE employeetrackerDB;
USE employeetrackerDB;

--Creating Tables
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50)  UNIQUE NOT NULL,
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  manager_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

--Department Seeds
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
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