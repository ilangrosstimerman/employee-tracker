-- Database -- 
CREATE DATABASE employeeTracker;

use employeeTracker;

-- Department Table -- 
CREATE TABLE department
(
	id INT PRIMARY KEY auto_increment,
    name VARCHAR(30)
)
-- Role Table -- 
CREATE TABLE role 
(
	id INT PRIMARY KEY auto_increment,
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT

)
-- Employee Table -- 
CREATE TABLE employee
(
	id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT NULL
)
