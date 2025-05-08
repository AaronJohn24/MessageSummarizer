const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { message } = JSON.parse(event.body);
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("/.netlify/functions/summarize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant who summarizes customer complaints and recommends appropriate actions according to RMA guidelines."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const summary = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ summary })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." })
    };
  }
};
