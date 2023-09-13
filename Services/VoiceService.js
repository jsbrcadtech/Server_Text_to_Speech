const axios = require('axios');

const voiceId = 'Ho9fAdtjJpFtTMLMFLU1';
const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

//Request ElevenLabs API
async function loadData(app) {
  // Create an Axios instance with increased maxContentLength
  const axiosInstance = axios.create({
    maxContentLength: 100000000, // Set this to an appropriate value
  });

  // Define an API endpoint
  app.post('/processspeech', async (req, res) => {
    const inputText = req.body.text; // Get input text from the request body

    if (!inputText) {
      return res
        .status(422)
        .json({ error: 'Input text is missing in the request body.' });
    }

    const jsonData = {
      text: inputText,
      model_id: 'eleven_multilingual_v2', // Customize the model_id as needed
      voice_settings: {
        stability: 0.34,
        similarity_boost: 0.83,
        style: 0.11,
        use_speaker_boost: true,
      },
    };

    const headers = {
      'xi-api-key': process.env.xi_api_key,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      //  POST request to the Eleven Labs API using the Axios instance
      const response = await axiosInstance.post(apiUrl, jsonData, {
        headers,
        responseType: 'arraybuffer',
      });

      // Set the response content type to MP3
      res.setHeader('Content-Type', 'audio/mpeg');

      // Send the audio data directly in the response
      res.send(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
}

module.exports.loadData = loadData;
