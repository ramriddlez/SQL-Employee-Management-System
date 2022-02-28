INSERT INTO departments (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO roles (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000), 
       ("Salesperson", 1, 80000),
       ("Lead Engineer", 2, 150000), 
       ("Software Engineer", 2, 120000),
       ("Account Manager", 3, 160000), 
       ("Accountant", 3, 125000),
       ("Legal Team Lead", 4, 250000), 
       ("Lawyer", 4, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
Values ("John", "Doe", 1, 3),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, 3),
       ("Kevin", "Tupik", 4, 3),
       ("Kunal", "Singh", 5, 2),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, 1),
       ("Tom", "Allen", 8, 7);