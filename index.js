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
                "Delete an Employee",
                "Delete a Department",
                "Delete a Role",
                "Quit"]
        }
    ]).then(function (data) {
        if (data.choice === "View All Employees") {
            db.query(
                "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;", function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    init();
                })
        } else if (data.choice === "Add an Employee") {
            db.query(`SELECT * FROM roles`, function (err, result) {
                const roleChoices = result.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));
                db.query('SELECT * FROM employees', function (err, result) {
                    const managerChoices = result.map(({ first_name, last_name, id }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
                    inquirer.prompt([
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
                    ]).then(function (data) {
                        db.query('INSERT INTO employees SET ?', (data), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        console.log(`employee ${data.first_name} ${data.last_name} has been successfully added to the employee database!`)
                        init();
                    });
                });
            });

        } else if (data.choice === "Update an Employee Role") {
            db.query(`SELECT * FROM roles`, function (err, result) {
                const roleChoices = result.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));
                db.query(`SELECT * FROM employees`, function (err, result) {
                    const empChoices = result.map(({ first_name, last_name, id }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'Which employee would you like to update?',
                            name: 'id',
                            choices: empChoices
                        },
                        {
                            type: 'list',
                            message: 'Which role do you want to assign the selected employee?',
                            name: 'role_id',
                            choices: roleChoices
                        },
                    ]).then(function (data) {
                        db.query('UPDATE employees SET role_id=? WHERE id=? ', [data.role_id, data.id], (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        console.log(`Employee has been updated!`);
                        init();
                    })
                })
            })
        } else if (data.choice === "Delete an Employee") {
            db.query(`SELECT * FROM employees`, function (err, result) {
                const empChoices = result.map(({ first_name, last_name, id }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which Employee would you like to delete?',
                        name: 'id',
                        choices: empChoices
                    },
                ]).then(function (data) {
                    db.query('DELETE FROM employees WHERE id = ? ', [data.id], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    console.log(`Employee has been fired!`);
                    init();
                })
            });
        } else if (data.choice === "Delete a Role") {
            db.query(`SELECT * FROM roles`, function (err, result) {
                const roleChoices = result.map(({ title, id }) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which Role would you like to delete?',
                        name: 'id',
                        choices: roleChoices
                    },
                ]).then(function (data) {
                    db.query('DELETE FROM roles WHERE id = ? ', [data.id], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    console.log(`Role has been deleted!`);
                    init();
                })
            })
        } else if (data.choice === "Delete a Department") {
            db.query(`SELECT * FROM departments`, function (err, result) {
                const deptChoices = result.map(({ name, id }) => ({
                    name: name,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Which Department would you like to delete?',
                        name: 'id',
                        choices: deptChoices
                    },
                ]).then(function (data) {
                    db.query('DELETE FROM departments WHERE id = ? ', [data.id], (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    console.log(`Department has been vanished!`);
                    init();
                })
            })

        } else if (data.choice === "View All Roles") {
            db.query('SELECT * FROM roles', function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results);
                init();
            });
        } else if (data.choice === "Add a Role") {
            db.query('SELECT * FROM departments', function (err, results) {
                const deptNew = results.map(({ name, id }) => ({
                    name: name,
                    value: id
                }));
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the Role?',
                        name: 'title'
                    },
                    {
                        type: 'input',
                        message: 'What is the salary for this role?',
                        name: 'salary',
                        validate: function isNumeric(name) {
                            if (isNaN(name)) {
                                return ' enter numbers only'
                            } else {
                                return true
                            }
                        }
                        //add validate function to validate if number between 1-10
                    },
                    {
                        type: 'list',
                        message: 'Which department does this role belong to?',
                        name: 'department_id',
                        choices: deptNew
                    },
                ]).then(function (data) {
                    db.query(`INSERT INTO roles SET ?`, [data], (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`${data.title} added to Roles`);
                        init();
                    })
                });
            });
        } else if (data.choice === "View All Departments") {
            db.query('SELECT * FROM departments', function (err, results) {
                if (err) {
                    console.log(err);
                    init();
                }
                console.table(results);
                init();
            });
        } else if (data.choice === "Add a Department") {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the Department?',
                    name: 'name'
                },
            ]).then(function (data) {
                db.query('INSERT INTO departments SET ?', (data), function (err) {
                    if (err) {
                        console.log(err);
                        init();
                    }
                    console.log(`This department has been added to Departments successfully!`);
                    init();
                })
            });
        } else if (data.choice === "Quit") {
            console.log("Have a great day!")

        }
    })
}
init();