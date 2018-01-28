const TwitterClient = require("twitter");

class Twitter {

  constructor(handlePlay, handleSearch, handleDance) {
    this.client = new TwitterClient({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    this.handlePlay = handlePlay;
    this.handleSearch = handleSearch;
    this.handleDance = handleDance;
  }

  tweet(text) {
    this.client.post('statuses/update', {status: text}, () => {
      console.log("Posted tweet: ", text);
    });
  }

  sendErrorTweet(user) {
    this.tweet(`@${user} Got a message from you that I couldn't understand. Sorry.`);
  }

  setupWatcher() {
    console.log('setting up twitter watcher');
    this.client.stream('statuses/filter', {track: '@discosnowman'}, stream => {
      stream.on('data', tweet => {
        const text = tweet.text.replace(/@discosnowman/i, '').trim();
        const user = tweet.user.screen_name;
        console.log(text);
        if (this.isTrack(text)) {
          this.handlePlay(text, user);
        }
        else if (this.isDance(text)) {
          this.handleDance(user);
        }
        else if (this.isSearch(text)) {
          this.handleSearch(text, user);
        }
        else {
          this.sendErrorTweet(user);
        }
      });
      stream.on('error', error => {
        console.log(error);
      });
    });
  }

  isTrack(text) {
    const regex = /^spotify:track:[\d\w]+$/;
    if (regex.test(text)) {
      console.log("It's a track!");
      return true;
    }
    return false;
  }

  isDance(text) {
    const regex = /#dance/;
    if (regex.test(text)) {
      console.log("It's a dance!");
      return true;
    }
    return false;
  }

  isSearch(text) {
    if (text.length > 100) {
      console.log("Too long for a search");
      return false;
    }
    const regex = /[^a-zA-ZäöåÄÖÅ0-9\s']/;
    const result = regex.exec(text);
    if (!result) {
      console.log("It's a search!");
      return true;
    }
    console.log("There are bad characters there!");
    return false;
  }

};

module.exports = Twitter;

