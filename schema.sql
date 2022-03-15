-- Database -- 
DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

-- Department Table -- 
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

-- Role Table -- 
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employee Table -- 
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT

-- Seeds --

INSERT INTO department (name) 
VALUES ('Accounts Receivable'),('Legal'),('Sales Operations'),('Global Operations'),('Engineering');

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer I', 100000, 5),('Paralegal', 65000, 2),('Proposal Manager', 69000, 3),('Product Specialist', 44000, 4),('Payroll Specialist', 60000, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id) 
VALUES ('Dwight', 'Schrute', null, 1),('Michael', 'Scott', null, 2),('Pamela', 'Beasley', null, 3),('James', 'Halpert', 1, 4),('Tobby', 'Flenderson', null, 5);