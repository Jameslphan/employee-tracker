// Import Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const conTable = require('console.table');

// dbConnection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'wave5ham9',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);


function initApp() {
    inquirer.prompt ({
        name: 'option',
        type: 'list',
        choices: [
           "View all departments",
           "View all roles",
           "View all employees",
           "Add a department",
           "Add a role",
           "Add an employee",
           "Update an employee role",
           "Exit",
        ],
    })
    .then(function(res){
        switch (res.option) {
            case "View all departments":
                console.log('This works 1');
                viewDepart();
                break;

            case "View all roles":
                console.log('This works 2');
                viewRoles();
                break;

            case "View all employees":
                console.log('This works 3');
                viewEmploy();
                break;

            case "Add a department":
                console.log('This works 4');
                addDepart();
                break;

            case "Add a role":
                console.log('This works 5');
                //addRole();
                break;

            case "Add an employee":
                console.log('This works 6');
                //addEmploy();
                break;

            case "Update an employee role":
                console.log('This works 7');
                //updateEmployRole();
                break;

            case "Exit":
                db.end();
                break;
        }
    });
};

// View all departments, 
function viewDepart() {
    const sqlQuery = `SELECT * FROM department`;
    db.query (sqlQuery, (err, result) => {
        if (err) throw err;
        console.table(result);
        initApp();
    });
}

// View all roles, 
function viewRoles() {
    const sqlQuery = `SELECT * FROM roll`;
    db.query (sqlQuery, (err, result) => {
        if (err) throw err;
        console.table(result);
        initApp();
    });
}

// View all employees, 
function viewEmploy() {
    const sqlQuery = `SELECT * FROM employee`;
    db.query (sqlQuery, (err, result) => {
        if (err) throw err;
        console.table(result);
        initApp();
    });
}

// Add a department, 
function addDepart() {
    inquirer.prompt
}

// Add a role, 
//function addRole()

// Add an employee,
//function addEmploy()

// Update an employee role
//function updateEmployRole()

db.connect((err) => {
    if (err) throw err;
    console.log('Welcome to employee tracker, the place where you can... track employees.');
    initApp();
});