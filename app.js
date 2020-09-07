const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = [];

function createHTML() {
    return writeFileAsync(outputPath, render(employeeArray));
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
function addTeamMember() {
    return inquirer.prompt([
        {
            type: "list",
            name: "MemberType",
            message: "Which type of Team Member would you like to add?",
            choices: ["Manager", "Engineer", "Intern", "Complete"]
        }
    ])
        .then(function (answers) {
            switch (answers.MemberType) {
                case "Manager":
                    createManager();
                    break;
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                case "Complete":
                    createHTML();
                    break;
            }
        })
}

function createEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?",
        },
    ])
}

function createManager() {
    createEmployee().then(function (employeeAnswers) {
        return inquirer.prompt([
            {
                type: "input",
                name: "officeNumber",
                message: "What is the managers office number?",
            },
        ])
            .then(function (managerAnswers) {
                const newManager = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, managerAnswers.officeNumber);
                employeeArray.push(newManager);
                addTeamMember();
            })
    })
}

function createEngineer() {
    createEmployee().then(function (employeeAnswers) {
        return inquirer.prompt([
            {
                type: "input",
                name: "github",
                message: "What is the engineer's github?",
            },
        ])
            .then(function (engineerAnswers) {
                const newEngineer = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, engineerAnswers.github);
                employeeArray.push(newEngineer);
                addTeamMember();
            })
    })

}

function createIntern() {
    createEmployee().then(function (employeeAnswers) {
        return inquirer.prompt([
            {
                type: "input",
                name: "school",
                message: "What is the intern's school?",
            },
        ])
            .then(function (internAnswers) {
                const newIntern = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, internAnswers.school);
                employeeArray.push(newIntern);
                addTeamMember();
            })
    })

}

addTeamMember()
