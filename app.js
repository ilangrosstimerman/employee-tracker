const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

function vaidateDChoice(){
    if (choice === 'department'){
        return true; 
    }
}

function startScreen(){

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: [
             "View All Employees", 
              "View All Employee's By Roles",
              "View all Employees By Departments", 
              "Update Employee",
              "Add Employee",
              "Add Role",
              "Add Department"
            ]

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