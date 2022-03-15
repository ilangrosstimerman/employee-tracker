const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");
const chalk = require("chalk")
const clear = require('clear');
const figlet = require('figlet');

function initialLoad() {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('Employee Tracker', {
        horizontalLayout: 'full'
      })
    )
  );
}

initialLoad()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeeTracker",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id: " + connection.threadId);
  startScreen();
});
function startScreen() {
  inquirer.prompt([{
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View All Employees",
      "View All Employees By Roles",
      "View all Employees By Departments",
      "Update Employee",
      "Add Employee",
      "Remove Employee",
      "Add Role",
      "Remove Role",
      "Add Department",
      "Remove Role",
      "Quit",
    ]
  }, ]).then((result) => {
    switch (result.choice) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Employees By Roles":
        viewAllEmployeesByRoles();
        break;
      case "View All Employees By Departments":
        viewAllEmployeesByDepartments();
        break;
      case "Update Employee":
        updateEmployee();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Remove Employee":
        deleteEmployee();
        break;
      case "Add Role":
        addRole();
        break;
      case "Remove Role":
        deleteRole();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Remove Department":
        deleteDepartment();
        break;
      case "Quit":
        quit();
        break;
    }
  });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewAllEmployeesByRoles() {
  connection.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewAllEmployeesByDepartments() {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function updateEmployee() {
  inquirer.prompt([{
      type: "input",
      message: "Which employee would you like to update?",
      name: "employeeUpdate",
    },
    {
      type: "input",
      message: "What do you want to update their role to?",
      name: "updateERole",
    },
  ]).then((answer) => {
    connection.query(
      "UPDATE employee SET role_id=? WHERE first_name= ?;",
      [answer.updateERole, answer.employeeUpdate],
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    )
  });
}

function addEmployee() {
  inquirer.prompt([{
      type: "input",
      message: "What is the employee's first name?",
      name: "aeFirstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
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
  ]).then((answer) => {
    connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
      [
        answer.aeFirstName,
        answer.aeLastName,
        answer.aeId,
        answer.aeManagerId,
      ],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
      }
    );
  });
}

function addRole() {
  inquirer.prompt([{
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
  ]).then((answer) => {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
      [answer.aRRole, answer.aRSalary, answer.aRId],
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    )
  });
};

function addDepartment() {
  inquirer.prompt([{
    type: "input",
    message: "What is the name of the department?",
    name: "departmentName",
  }, ]).then((answer) => {
    connection.query(
      "INSERT INTO department (name) VALUES (?);",
      [answer.departmentName],
      (err, res) => {
        if (err) throw err;
        console.table(res);
        startScreen();
      }
    );
  });
};

function deleteEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "What is the FIRST NAME of the employee do you want to delete?",
    name: "deleteEmployeeFN"
  },
  {
    type: "input",
    message: "What is the LAST NAME of the employee do you want to delete?",
    name: "deleteEmployeeLN"
  },
]).then((answer) => {
  connection.query("DELETE FROM employee WHERE first_name=? AND last_name=?;", [answer.deleteEmployeeFN, answer.deleteEmployeeLN], (err, res) => {
    if (err) throw err;
    console.table(res);
    startScreen();
  })
});
};

function deleteDepartment() {
  inquirer.prompt([{
    type: "input",
    message: "Which department do you want to delete?",
    name: "deleteDepartment"
  }, ]).then((answer) => {
    connection.query("DELETE FROM department where department_id=?;", [answer.deleteDepartment], (err, res) => {
      if (err) throw err;
      console.table(res);
    })
  })
};

function deleteRole() {
  inquirer.prompt([{
    type: "input",
    message: "Which Role do you want to delete?",
    name: "deleteRole",
  }, ]).then((answer) => {
    connection.query("DELETE FROM role WHERE first_name= ?;", [answer.deleteRole], (err, res) => {
      if (err) throw err;
      console.table(res);
      startScreen();
    })
  })
};

function quit() {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('Goodbye', {
        horizontalLayout: 'full'
      })
    )
  );
  connection.end();
  process.exit();
};