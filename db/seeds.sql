INSERT INTO department (name) 
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Service"),
("Executive");

INSERT INTO roll (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4),
("Contracted Slaves", 1000, 5),
("Shift Slaves", 0, 5),
("Supreme Overlord", 2500000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values ("Kato", "Dog", 1, Null),
("Yoshi", "Dog", 2, 1),
("Pasang", "Sherpa", 3, 11),
("Pemba", "Sherpa", 4, 3),
("Kanchi", "Sherpa", 5, 11),
("Sonam", "Sherpa", 6, 5),
("Lakpa", "Sherpa", 7, NULL),
("Phurba", "Sherpa", 8, 7),
("Cardi P", "Dog", 9, 11),
("James", "Phan", 10, 11),
("Mingma", "Phan", 11, NULL);