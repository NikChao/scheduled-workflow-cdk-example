/**
 * Just an example lambda handler!
 * You **typically** wouldn't keep these in the same folder as your infrastructure
 */
exports.handler = async (event) => {
  const rowsProcessed = event.rowsProcessed + 10 || 10;

  return {
    statusCode: 200,
    rowsProcessed,
  };
};