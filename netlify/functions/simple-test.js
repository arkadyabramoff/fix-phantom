exports.handler = async function(event, context) {
  console.log("Test function triggered!");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Function executed successfully' }),
  };
};