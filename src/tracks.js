const tokenService = require('./tokenService');
const searchService = require('./searchService');

let token = null;

module.exports.getTrackUrl = async searchQuery => {
  if (!token) {
    console.log('No token present, fetching token');
    token = await tokenService.getToken();
  }
  else if (token.expiryTime <= (Date.now() + 10000)) {
    console.log(`Token expired at ${new Date(token.expiryTime)}, checking at ${new Date()}`);
    console.log('Fetching new token');
    token = await tokenService.getToken();
  }
  if (token) {
    console.log(`Searching for ${searchQuery}`);
    const trackUrl = await searchService.searchTrack(token.accessToken, searchQuery);
    if (trackUrl === null)
      console.log('No track found, exiting');
    else
      console.log('Found track');
    return trackUrl;
  }
};
