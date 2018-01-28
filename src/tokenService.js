const fetch = require('node-fetch');

const tokenUrl = 'https://accounts.spotify.com/api/token';
const clientId = process.env.SPOTIFY_TOKEN_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_TOKEN_CLIENT_SECRET;
const base64Token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

module.exports.getToken = async () => {
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Token}`
      }});
    const json = await response.json();
    return {
      accessToken: json.access_token,
      expiryTime: Date.now() + (json.expires_in * 1000)
    };
  }
  catch (error) {
    console.log(error);
  }
};