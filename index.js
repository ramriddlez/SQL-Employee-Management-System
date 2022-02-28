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
    console.log(`Connected to the employees_db database.`)
  );