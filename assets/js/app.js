const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

function vaidateDChoice(){
    if (choice === 'department'){
        return true; 
    }
}

function addDRE{

    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to add a new department?',
            name: 'dChoice',

        },
        {
            type: 'confirm',
            message: 'Would you like to add a new role?',
            name: 'rChoice'
        },
        {
            type: 'confirm',
            message: 'Would you like to add a new employee?',
            name: 'eChoice'
        }

    ]);


} 