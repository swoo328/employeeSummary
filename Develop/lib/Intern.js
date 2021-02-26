// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school){
        //super calls the employee object for the name, id and email 
        //to be used in the constructor
        super(name, id, email);
        this.school = school;
    }
    getGithub(){
        return this.school;
    }
    getRole(){
        return "Intern"
    }
}

module.exports = Intern;