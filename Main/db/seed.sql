INSERT INTO department (department_name)
VALUES
  ('Transpo'),
  ('IT'),
  ('Marketing'),
  ('Finance'),
  ('Sales'),
  ('Logistics'),
  ('Legal');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Driver', 25000, 1),
  ('Broker', 60000, 6)
  ('Recruiter', 32000, 3),
  ('Software Engineer', 40000, 2),
  ('Attorney', 200000, 7),
  ('Engineer', 150000, 1),
  ('Accountant', 160000, 7),
  ('Sales Associate', 130000, 5),
  ('Sales Lead', 160000, 5),
  ('CEO', 400000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Benjamin', 'Lee', 1, 1),
  ('Emma', 'Johnson', 2, 2),
  ('Olivia', 'Martinez', 3, 1),
  ('Sophia', 'Anderson', 4, 3),
  ('Ethan', 'Wilson', 5, 1),
  ('Michael', 'Brown', 6, 3);
