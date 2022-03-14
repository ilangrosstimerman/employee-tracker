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