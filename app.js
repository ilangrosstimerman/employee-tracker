const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');

const mysql = require('mysql');
const { table } = require('console');



function startScreen(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to do?',
            name: 'choice',
            choices: [
             "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Employees By Departments", 
              "Update Employee",
              "Add Employee?",
              "Add Role?",
              "Add Department?"
            ]
    
        }
    ]).then(function(result){
        switch (result.choice){
            case "View All Employees":
            viewAllEmployees();
            break;
            case "View All Employees by Roles":
            viewAllEmployeesByRoles();
            break;
            case "View All Employees by Departments":
            viewAllEmployeesByDepartments();
            break;
            case "Update Employee":
            updateEmployee();
            break;
            case "Add Employee":
            addEmployee();
            break;
            case "Add Role":
            addRole();
            break;
            case "Add Department":
            addDepartment();
            break;
        }
    })

};

//functions

function viewAllEmployees(){
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;',
    function(err,res){ 
        if(err) throw err;
        console.table(res)
        startScreen();

    })
};

function viewAllEmployeesByRoles(){
    connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    function(err,res){
        if(err) throw err;
        console.table(res)
        startScreen();
    })
};

function viewAllEmployeesByDepartments(){
    connection.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;',
    function(err,res){
        if(err) throw err;
        console.table(res)
        startScreen();
    })
};


function updateEmployee(){
    inquirer.prompt([{
        type:'input', 
        message: 'Which employee would you like to update?',
        name: 'employeeUpdate'
    },{
        type:'input',
        message: 'What do you want to update their role to?',
        name: 'updateERole'
    }
    ]).then(function(comment){

    })
}

function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employees first name?",
          name: "aeFirstName",
        },
        {
          type: "input",
          message: "What is the employees last name?",
          name: "aeLastName",
        },
        {
          type: "input",
          message: "What is the employee's id number?",
          name: "aeId",
        },
        {
          type: "input",
          message: "What is the employee's manager id number?",
          name: "aeManagerId",
        },
      ])
      .then(function (answer) {
        connection.query("SELECT FROM ");
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the role you want to add?",
          name: "aRRole",
        },
        {
          type: "input",
          message: "What is the salary for the role?",
          name: "aRSalary",
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "aRId",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.aRRole, answer.aRSalary, answer.aRId],
          function (err, res) {
            if (err) throw err;
            console.table(res);
          }
        );
      });
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department?",
          name: "departmentName",
        },
      ])
      .then((answer) => {
        connection.query("INSERT INTO department (name) VALUES (?)");
      });
  }
  
  function quit() {
    connection.end();
    process.exit();
  }
  