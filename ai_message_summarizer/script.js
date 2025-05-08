
async function summarizeMessage() {
    const inputMessage = document.getElementById('inputMessage').value;
    const summaryOutput = document.getElementById('summaryOutput');
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key
    
    if (!inputMessage.trim()) {
        summaryOutput.textContent = "Please enter a message to summarize.";
        return;
    }

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Summarize the following message: 

${inputMessage}`,
            max_tokens: 100,
            temperature: 0.7,
        }),
    });

    const data = await response.json();
    if (data.choices && data.choices[0].text) {
        summaryOutput.textContent = data.choices[0].text.trim();
    } else {
        summaryOutput.textContent = "There was an error summarizing the message.";
    }
}
