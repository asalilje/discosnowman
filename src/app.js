require('dotenv').config();
const Twitter = require('./twitter');
const tracks = require('./tracks');
const santa = require('./santa');
const Music = require('./music');
const discolamp = require('./discolamp');

const handlePlay = (track, user) => {
  music.playSingleTrack(track, user);
};

const handleSearch = async (searchQuery, user) => {
  const trackUrl = await tracks.getTrackUrl(searchQuery);
  if (trackUrl)
    handlePlay(trackUrl, user);
  else
    twitter.tweet(`Sorry @${user}. No track found for '${searchQuery}'. :(`);
};

const handleDance = (user) => {
  santa.dance();
  twitter.tweet(`Doing a crazy christmas jive because @${user} asked me to.`);
};

const handleDiscoLampOn = () => {
  discolamp.on();
};

const handleDiscoLampOff = () => {
  discolamp.off();
};

const handleTweet = (uri, name, user) => {
  const trackId = uri.replace(/spotify:track:/i, '').trim();
  const link = `https://open.spotify.com/track/${trackId}`;
  twitter.tweet(`The disco lamp is spinning, because I'm playing '${name}' requested by @${user}. ${link}`);
};

const boot = () => {
  try {
    twitter = new Twitter(handlePlay, handleSearch, handleDance);
    music = new Music(handleDiscoLampOn, handleDiscoLampOff, handleTweet);
    twitter.setupWatcher();
    twitter.tweet("I was dead but now I'm alive again!");
  }
  catch(err) {
    console.error(`Error starting application ${err}`)
  }
};

const terminate = async (signal) => {
  try {
    console.log(`Application stopping on ${signal}`);
  }
  catch(err) {
    console.log(`Application not stopping gracefully due to error ${err}`);
  }
  process.exit();
};

process.on('SIGINT', () => {
  terminate('SIGINT')
});

process.on('SIGTERM', () => {
  terminate('SIGTERM')
});

let twitter;
let music;

boot();






