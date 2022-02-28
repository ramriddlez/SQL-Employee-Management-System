const inquirer = require("inquirer");
const mysql = require('mysql2');
const consoletable = require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // TO DO: Enter your MySQL password below
        password: 'waheguru1995_',
        database: 'employees_db'
    },
    console.log(`Successfully connected to the employees database!`)
);


function init() {
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
                "Add a Department",
                "Quit"]
        }
    ]).then(function (data) {
        if (data.choice === "View All Employees") {
            db.query(
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
                    // if (err) {
                    //     console.log(err);
                    //   }
                    console.table(results);
                })
        } else if (data.choice === "Add an Employee") {
            db.query(`SELECT * FROM role`, function (err, result) {
                const roleChoices = result.map(({ title, department_id }) => ({
                    name: title,
                    value: department_id
                }));
            db.query('SELECT * FROM employees', function (err, result){
                const managerChoices = result.map(({ first_name, last_name, manager_id}) => ({
                    name: `${first_name} ${last_name}`,
                    value: manager_id
                }));
            inquirer.prompt[(
                {
                    type: 'input',
                    message: 'What is the employees first name?',
                    name: 'first_name'
                },
                {
                    type: 'input',
                    message: 'What is the Employees last name?',
                    name: 'last_name'
                },
                {
                    type: 'list',
                    message: 'what is the role of the employee?',
                    name: 'role_id',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    message: 'who is the manager of this employee?',
                    name: 'manager_id',
                    choices: managerChoices
                }
            )].then (function (data) {
                db.query ('INSERT INTO employee SET ?', (data), (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                });
                    console.log(`employee with ${result.first_name} ${result.last_name} has been successfully added to the employee database!`)
                });
            });
        });

        } else if (data.choice === "Update an Employee Role") {
            db.query (`SELECT * FROM roles`, function (err, result){
                const roleChoices = result.map(({ title, department_id }) => ({
                    name: title,
                    value: department_id
                }));
            db.query (`SELECT * FROM employees`, function (err, result){
                const empChoices = result.map(({ first_name, last_name, role_id}) => ({
                    name: `${first_name} ${last_name}`,
                    value: role_id
                }));
            inquirer.prompt([
                {
                    type:'list',
                    message:'Which employee would you like to update?',
                    name: 'role_id',
                    choices: empChoices
                },
                {
                    type:'list',
                    message:'Which role do you want to assign the selected employee?',
                    name: 'department_id',
                    choices: roleChoices
                },
            ]).then (function (data){
                db.query('UPDATE employee SET department_id=? WHERE id=? ', [data.role_id,data.id], (err,result) => {
                    if (err) {
                        console.log(err);
                        optionSelect();
                    } 
                })
                    console.log(`Employee has been updated!`);
                    optionSelect();
                })
            })})    
            })
            })
        }
        {

        }
    
    
    
    })}
    })
}

init();