
const accountControllers = require("./accounts");
const jobtagControllers = require("./jobtags");
const techstackControllers = require("./techstack");

const projectControllers = require("./projects");
const projectMemberControllers = require("./projectMembers");
const projectStateTagControllers = require("./projectStateTags");


module.exports.accounts = accountControllers;
module.exports.jobtags = jobtagControllers;
module.exports.techstacks = techstackControllers;

module.exports.projects = projectControllers;
module.exports.projectMember = projectMemberControllers;
module.exports.projectStateTag = projectStateTagControllers;