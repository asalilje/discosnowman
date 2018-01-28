const fetch = require('node-fetch');

module.exports.searchTrack = async (accessToken, searchQuery) => {
  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=track:"${encodeURI(searchQuery)}"&type=track&limit=5&market=SE`;
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }});
    const json = await response.json();
    console.log(json);
    if (!json || !json.tracks || json.tracks.total === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * json.tracks.items.length);
    return json.tracks.items[index].uri;
  }
  catch (error) {
    console.log(error);
  }
};