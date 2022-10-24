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
                viewDepart();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmploy();
                break;

            case "Add a department":
                addDepart();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmploy();
                break;

            case "Update an employee role":
                console.log('This works 7');
                updateEmployRole();
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
    const sqlQuery = 
    `SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        roll.title, 
        roll.department_id, 
        roll.salary, 
        employee.manager_id 
    FROM 
        employee 
    LEFT JOIN 
        roll 
    ON 
        employee.role_id = roll.id`;
    db.query (sqlQuery, (err, result) => {
        if (err) throw err;
        console.table(result);
        initApp();
    });
}

// Add a department, 
function addDepart () {
    inquirer.prompt({
      name: 'newDepart', 
      type: 'input', 
      message: 'Which department would you like to add?'
      }).then(function (res) {
      db.query(
          `INSERT INTO department SET ?`,
          {
           name: res.newDepart
          });
          const sqlQuery = 'SELECT * FROM department';
          db.query(sqlQuery, function(err, res) {
          if(err)throw err;
          console.log(res.newDepart + ' has been added!');
          console.table('All Departments:', res);
          initApp();
        })
    })
  }

// Add a role, 
const retrieveDepart = () => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM employee_tracker_db.department`;
        db.query(
            sqlQuery,
            (err, results) => {
                if (err) rej(err);
                res(results);
        })
    })
}

const addRole = async () => {
    const departments = await retrieveDepart();
    const responses = await inquirer
    .prompt ([
        {
            name: 'title',
            type: 'input',
            message: 'What is the name of the new role?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary of the new role?',
        },
        {
            name: 'department',
            type: 'list',
            choices: departments.map(department => department.name),
            message: 'To which department does this new role belong to?'
        }
    ])

    departments.forEach(department => {
        if (department.name === responses.department) {
            responses.department = department.id;
        }
    });

    db.query(
        'INSERT INTO employee_tracker_db.roll SET ?',
        {
            title: responses.title,
            salary: responses.salary,
            department_id: responses.department
        },
        (err) => {
            if (err) throw err;
            console.log('New role has been added.')
            initApp();
        }
    )
}


// Add an employee,
const retrieveRole = () => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM employee_tracker_db.roll`;
        db.query(
            sqlQuery,
            (err, results) => {
                if (err) rej(err);
                res(results);
        })
    })
}

const retrieveManager = () => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM employee_tracker_db.employee WHERE manager_id IS NULL`;
        db.query(
            sqlQuery,
            (err, results) => {
                if (err) rej(err);
                res(results);
        })
    })
}

const addEmploy = async () => {
    const titles = await retrieveRole();
    const managers = await retrieveManager();
    const responses = await inquirer
    .prompt ([
        {
            name: 'first_name',
            type: 'input',
            message: 'First name of new employee?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Last name of new employee?'
        },
        {
            name: 'role_id',
            type: 'list',
            choices: titles.map(roll => ({name:roll.title, value: roll.id})),
            message: 'What is the role of the new employee?',
        },
        {
            name: 'manager_id',
            type: 'list',
            choices: managers.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id})),
            message: 'Manager of new employee?'
        },
    ])

    db.query(
        'INSERT INTO employee_tracker_db.employee SET ?',
        {
            first_name: responses.first_name,
            last_name: responses.last_name,
            role_id: responses.role_id,
            manager_id: responses.manager_id
        },
        (err) => {
            if (err) throw err;
            console.log('New employee has been added.')
            initApp();
        }
    )
}

// Update an employee role
const retrieveEmpRole = () => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM employee_tracker_db.employee`;
        db.query(
            sqlQuery,
            (err, results) => {
                if (err) rej(err);
                res(results);
        })
    })
}


const updateEmployRole = async () => {
    const empRecord = await retrieveEmpRole();
    const roles = await retrieveRole();
    const responses = await inquirer
    .prompt ([
        {
            name: 'id',
            type: 'list',
            choices: empRecord.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id})),
            message: 'Select an employee.'
        },
        {
            name: 'role_id',
            type: 'list',
            choices: roles.map(roll => ({name:roll.title, value:roll.id,})),
            message: 'Select a role.'
        }
    ])

    db.query(
        'UPDATE employee_tracker_db.employee SET ? WHERE ?',
        [
            {
                role_id: responses.role_id,
            },
            {
                id: responses.id,
            }
        ],
        (err) => {
            if (err) throw err;
            console.log('Employee role updated.')
            initApp();
        }
    )
}

db.connect((err) => {
    if (err) throw err;
    console.log('Welcome to employee tracker, the place where you can... track employees.');
    initApp();
});