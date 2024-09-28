/**
 * Just an example lambda handler!
 * You **typically** wouldn't keep these in the same folder as your infrastructure
 */
exports.handler = async (event) => {
  console.log('Event received:', event);
  console.log('Hello from the Lambda function defined in an external file!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};