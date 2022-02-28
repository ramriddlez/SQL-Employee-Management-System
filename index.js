const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoletable = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      // TO DO: Enter your MySQL password below
      password: '',
      database: 'employees_db'
    },
    console.log(`Successfully connected to the employees database!`)
  );


function init () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ["View All Employees",
            "Add an Employee",
            "Update an Employee Role",
            "View All Roles",
            "Add a Role",
            "View All Departments",
            "Add a Department"]
        }
    ]).then(function (data) {
        if (data.choice === "View All Employees") {
            db.query(
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;" , (err, results) => {
                    if (err) {
                        console.log(err);
                      }
                      console.table(results);
                })
        }});

}

init();