var DataTypes = require("sequelize").DataTypes;
var _Accounts = require("./Accounts");
var _Jobs = require("./Jobs");
var _Projects = require("./Projects");
var _StateTags = require("./StateTags");
var _TechStacks = require("./TechStacks");

function initModels(sequelize) {
  var Accounts = _Accounts(sequelize, DataTypes);
  var Jobs = _Jobs(sequelize, DataTypes);
  var Projects = _Projects(sequelize, DataTypes);
  var StateTags = _StateTags(sequelize, DataTypes);
  var TechStacks = _TechStacks(sequelize, DataTypes);

  Projects.belongsTo(Accounts, { as: "manager", foreignKey: "managerID"});
  Accounts.hasMany(Projects, { as: "Projects", foreignKey: "managerID"});
  TechStacks.belongsTo(Accounts, { as: "user", foreignKey: "userID"});
  Accounts.hasMany(TechStacks, { as: "TechStacks", foreignKey: "userID"});
  Accounts.belongsTo(Jobs, { as: "jobTag_Job", foreignKey: "jobTag"});
  Jobs.hasMany(Accounts, { as: "Accounts", foreignKey: "jobTag"});
  Projects.belongsTo(StateTags, { as: "state", foreignKey: "stateID"});
  StateTags.hasMany(Projects, { as: "Projects", foreignKey: "stateID"});

  return {
    Accounts,
    Jobs,
    Projects,
    StateTags,
    TechStacks,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
