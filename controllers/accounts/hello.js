module.exports = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "accounts-Hello!",
        input: event,
      },
      null,
      2
    ),
  };
};