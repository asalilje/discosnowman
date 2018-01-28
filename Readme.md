# discosnowman
DiscoSnowman, a bot listening for tweets.

Deployed on a Raspberry Pi, connected via GPIO 20 and 21 to a disco lamp and a dancing snowman toy. Listening for tweets to the account @discosnowman.

A .env-file is needed in the root to set tokens, see .env-example.

- #dance - will start the snowman toy.
- A spotify track url (spotify:track:xxxxx) will play that track.
- Other input consisting of letters and numbers will search Spotify, return the 5 top results and play one of them, randomly selected.

All actions returns a tweet from @discosnowman, either explaining what track or action was taken, or an error message.

Remember to always close battery gadget circuits using a mosfet and a large enough resistor to not kill your Pi!