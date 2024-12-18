import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const botToken = '7268474710:AAEKnDq7vcix_xUGrqI5gBU5Yp4C27T82Pk';  // Your bot token
  const chatId = '6390370714';  // Your chat ID
  
  try {
    // Parse the body of the POST request to extract the message
    const requestBody = JSON.parse(event.body);
    const message = requestBody.message;  // The message from the form

    // Debugging: Log the message being sent
    console.log('Message:', message);

    console.log('Sending message to Telegram...');

    // Make the API call to Telegram's sendMessage endpoint
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Log the response from Telegram
    const data = await response.json();
    console.log('Telegram Response:', data);

    if (response.ok) {
      // Success: Respond with a success message
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
      };
    } else {
      // If Telegram responded with an error, log it
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send message', details: data })
      };
    }
  } catch (error) {
    // If there's an error in the try block, log the error
    console.log('Error occurred:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending message', details: error.message })
    };
  }
};
