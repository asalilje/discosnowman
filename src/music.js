const Mopidy = require("mopidy");

class Music {

  constructor(handleDiscoLampOn, handleDiscoLampOff, handleTweet) {
    this.handleDiscoLampOn = handleDiscoLampOn;
    this.handleTweet = handleTweet;

    this.mopidy = new Mopidy({
      webSocketUrl: "ws://127.0.0.1:6680/mopidy/ws/"
    });

    //this.mopidy.on(console.log.bind(console));

    this.mopidy.on("state:online", () => {
      console.log("Online and ready to play tracks.");
      this.mopidy.tracklist.setSingle(true);
    });

    this.mopidy.on("event:trackPlaybackEnded", e => {
      const timePosition = e.time_position;
      if (timePosition > 0) {
        handleDiscoLampOff();
      }
    });
  }

  playSingleTrack(spotifyTrackUrl, user) {
    console.log(`Playing ${spotifyTrackUrl}`);
    this.mopidy.playback.stop()
      .then(() => this.mopidy.tracklist.add(null, null, spotifyTrackUrl, null))
      .then(tlTracks => {
        if (tlTracks && tlTracks.length > 0) {
          const tlTrack = tlTracks[0];
          this.handleTweet(tlTrack.track.uri, tlTrack.track.name, user);
          this.mopidy.playback.play(tlTrack);
          this.handleDiscoLampOn();
        }
      })
      .catch(console.error.bind(console))
      .done();
  }
}

module.exports = Music;
