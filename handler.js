'use strict';
var Model = require('./models');

module.exports.hello = async (event) => {
  const test = await Model.Accounts.findAll();
  console.log("--------------------- model!!")
  console.log(test)
  console.log("--------------------- model!!")
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: test,
        input: event,
      },
      null,
      2
    ),
  };
};
