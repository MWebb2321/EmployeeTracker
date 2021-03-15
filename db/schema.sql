--Creating Database
DROP DATABASE IF EXISTS employeetrackerDB;
CREATE DATABASE employeetrackerDB;

--Creating Tables
CREATE TABLE department (
  "id" INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  "name" VARCHAR(50)
);

CREATE TABLE role (
  "id" INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  "title" VARCHAR(50),
  "salary" DECIMAL,
  "department_id" INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  "id" INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  "first_name" VARCHAR(50),
  "last_name" VARCHAR(50),
  "manager_id" INT,
  "role_id" INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY(manager_id) REFERENCES employee(id)
);