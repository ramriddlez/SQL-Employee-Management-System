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

const options = [
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
    "Add a Department",]
  },
]
