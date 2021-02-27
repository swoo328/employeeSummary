const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
let team = [];
//engineer question
const engineerQuestion = [
    {
        type: "input",
        message: "What is your name?",
        name: "engineerName",
    },
    {
        type: "input",
        message: "What is your id?",
        name: "engineerId",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "engineerEmail",
    },
    {
        type: "input",
        message: "What is your github?",
        name: "engineerGithub",
    },

];
//intern question
const internQuestion = [
    {
        type: "input",
        message: "What is your name?",
        name: "internName",
    },
    {
        type: "input",
        message: "What is your id?",
        name: "internId",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "internEmail",
    },
    {
        type: "input",
        message: "What school do you go to?",
        name: "internSchool",
    },
];
//manager question
const managerQuestion = [
    {
        type: "input",
        message: "What is your name?",
        name: "managerName",
    },
    {
        type: "input",
        message: "What is your id?",
        name: "managerId",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "managerNumber",
    },
];
// adding team members
const addMember = [
    {
        type: "list",
        name: "teamMember",
        message: "What do you want in your team?",
        choices: ["Engineer", "Intern", "Manager", "None"]
    }
];
//confirming to make a team
const confirmTeam = [
    {
        type: "confirm",
        message: "Are you building a team?",
        name: "confirmTeam"
    }
]
inquirer.prompt(confirmTeam).then(answer => {
    // answer.confirmTeam
    //     ? addManager()  : console.log("error");
    if(answer.confirmTeam){
        console.log("Add your manager");
        addManager();
    }
    else{
        console.log("error");
    }
})
// prompt the manager question 
const addManager = () => {
    inquirer.prompt(managerQuestion).then(answer => {
        console.log(answer);
        team.push(new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerNumber));
        newMembers();
    });
}

const addEngineer = () => {
    inquirer.prompt(engineerQuestion).then(answer => {
        console.log(answer);
        team.push(new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub));
        newMembers();
    });
}

//prompt the intern question
const addIntern = () => {
    inquirer.prompt(internQuestion).then(answer => {
        console.log(answer);
        team.push(new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool));
        newMembers();
    });
}

// addomg new members
const newMembers = () => {
    inquirer.prompt(addMember).then(data =>{
        switch(data.teamMember){
            case "Engineer":
                addEngineer();
                break;
       
            case "Intern":
                addIntern();
                break;
        
            case "Manager":
                addManager();
                break;
    
            default:
                createHTML();
        }
    })

}
const createHTML = () => {
    console.log("This is a new html file");
    render(team);
    fs.writeFile("index.html", render(team), function(err){
        if(err) throw err;
    })
};