const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  async findAllEmployees() {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, 
             role.title, department.name AS department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id 
      LEFT JOIN employee manager ON manager.id = employee.manager_id;
    `;

    return this.connection.promise().query(query);
  }

  // Find all employees except the given employee id
  async findAllPossibleManagers(employeeId) {
    const query = "SELECT id, first_name, last_name FROM employee WHERE id != ?";
    return this.connection.promise().query(query, employeeId);
  }

  // Create a new employee
  async createEmployee(employee) {
    const query = "INSERT INTO employee SET ?";
    return this.connection.promise().query(query, employee);
  }

  // Remove an employee with the given id
  async removeEmployee(employeeId) {
    const query = "DELETE FROM employee WHERE id = ?";
    return this.connection.promise().query(query, employeeId);
  }

  // Update the given employee's role
  async updateEmployeeRole(employeeId, roleId) {
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    return this.connection.promise().query(query, [roleId, employeeId]);
  }

  // Update the given employee's manager
  async updateEmployeeManager(employeeId, managerId) {
    const query = "UPDATE employee SET manager_id = ? WHERE id = ?";
    return this.connection.promise().query(query, [managerId, employeeId]);
  }

  // Find all roles, join with departments to display the department name
  async findAllRoles() {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary 
      FROM role 
      LEFT JOIN department ON role.department_id = department.id;
    `;

    return this.connection.promise().query(query);
  }

  // Create a new role
  async createRole(role) {
    const query = "INSERT INTO role SET ?";
    return this.connection.promise().query(query, role);
  }

  // Remove a role from the db
  async removeRole(roleId) {
    const query = "DELETE FROM role WHERE id = ?";
    return this.connection.promise().query(query, roleId);
  }

  // Find all departments
  async findAllDepartments() {
    const query = "SELECT department.id, department.name FROM department;";
    return this.connection.promise().query(query);
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  async viewDepartmentBudgets() {
    const query = `
      SELECT department.id, department.name, SUM(role.salary) AS utilized_budget 
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department ON role.department_id = department.id 
      GROUP BY department.id, department.name;
    `;

    return this.connection.promise().query(query);
  }

  // Create a new department
  async createDepartment(department) {
    const query = "INSERT INTO department SET ?";
    return this.connection.promise().query(query, department);
  }

  // Remove a department
  async removeDepartment(departmentId) {
    const query = "DELETE FROM department WHERE id = ?";
    return this.connection.promise().query(query, departmentId);
  }

  // Find all employees in a given department, join with roles to display role titles
  async findAllEmployeesByDepartment(departmentId) {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, role.title 
      FROM employee 
      LEFT JOIN role ON employee.role_id = role.id 
      LEFT JOIN department department ON role.department_id = department.id 
      WHERE department.id = ?;
    `;

    return this.connection.promise().query(query, departmentId);
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  async findAllEmployeesByManager(managerId) {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, 
             department.name AS department, role.title 
      FROM employee 
      LEFT JOIN role ON role.id = employee.role_id 
      LEFT JOIN department ON department.id = role.department_id 
      WHERE manager_id = ?;
    `;

    return this.connection.promise().query(query, managerId);
  }
}

module.exports = new DB(connection);
