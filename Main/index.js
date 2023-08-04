const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

let Department = require("./department.js");
let Role = require("./role.js");
let Employee = require("./employee.js");

let departments = [];
let roles = [];
let employees = [];

let options = [
  "Add department",
  "Add role",
  "Add employee",
  "View departments",
  "View roles",
  "View employees",
  "View employees by manager",
  "View the total utilized budget of a department",
  "Update roles",
  "Update employee manager",
  "Delete department",
  "Delete role",
  "Delete employee",
  "Exit",
];

let roleQuestions = [
  {
    name: "role_title",
    type: "input",
    message: "Enter role title",
  },
  {
    name: "role_salary",
    type: "input",
    message: "Enter role salary",
  },
];

let employeeQuestions = [
  {
    name: "first_name",
    type: "input",
    message: "Enter employee first name",
  },
  {
    name: "last_name",
    type: "input",
    message: "Enter employee last name",
  },
];

const config = {
  host: "localhost",
  port: 3306,
  user: "YOUR USER ID",
  password: "YOUR PASSWORD",
  database: "employee_tracker_db",
  multipleStatements: true,
};

async function initialize() {
  try {
    const con = await mysql.createConnection(config);
    console.log("Connected");

    const [departmentsResult, rolesResult, employeesResult] = await Promise.all([
      con.query("SELECT * FROM department"),
      con.query("SELECT * FROM role"),
      con.query("SELECT * FROM employee"),
    ]);

    for (const dep of departmentsResult[0]) {
      const temp = new Department(dep.id, dep.name);
      departments.push(temp);
    }

    for (const role of rolesResult[0]) {
      const temp = new Role(role.id, role.title, role.salary, role.department_id);
      roles.push(temp);
    }

    for (const emp of employeesResult[0]) {
      const temp = new Employee(emp.id, emp.first_name, emp.last_name, emp.role_id);
      if (emp.manager_id) {
        temp.setManagerId(emp.manager_id);
      }
      employees.push(temp);
    }

    await start(con);
  } catch (err) {
    console.error("Error:", err);
  }
}

async function start(con) {
  try {
    const answer = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: options,
    });

    switch (answer.action) {
      case "Add department":
        await addDepartment(con);
        break;

      case "Add role":
        await addRole(con);
        break;

      case "Add employee":
        await addEmployee(con);
        break;

      case "View departments":
        await viewDepartments(con);
        break;

      case "View roles":
        await viewRoles(con);
        break;

      case "View employees":
        await viewEmployees(con);
        break;

      case "View employees by manager":
        await viewEmployeesByManager(con);
        break;

      case "View the total utilized budget of a department":
        await viewTotalBudget(con);
        break;

      case "Update roles":
        await updateEmpRole(con);
        break;

      case "Update employee manager":
        await updateEmpManager(con);
        break;

      case "Delete department":
        await deleteDepartments(con);
        break;

      case "Delete role":
        await deleteRole(con);
        break;

      case "Delete employee":
        await deleteEmployee(con);
        break;

      case "Exit":
        con.end();
        process.exit();
        break;

      default:
        console.log("Invalid option. Please try again.");
        await start(con);
        break;
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function addDepartment(con) {
  try {
    const input = await inquirer.prompt({
      name: "department_name",
      type: "input",
      message: "Enter department name",
    });

    if (input.department_name) {
      const sql = `INSERT INTO department (name) VALUES ("${input.department_name}")`;
      await con.query(sql);
      const temp = new Department(input.department_name);
      departments.push(temp);
      console.log("Department added");
    }

    await start(con);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Add other async functions for each option here...

initialize();