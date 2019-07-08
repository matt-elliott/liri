require('dotenv').config();
var axios = require('axios');
const Spotify = require('node-spotify-api');
// const Moment = require('moment');
const keys = require('./keys.js');
const logConcertData = require('./utils.js').logConcertData;
const logSongData = require('./utils.js').logSongData;
const spotify = new Spotify(keys.spotify);


module.exports.concertThis = function() {
  let url = `https://rest.bandsintown.com/artists/${process.argv[1]}/events?app_id=codingbootcamp`;

  axios.get(url).then(function(response) {
    let data = response.data;
    logConcertData(data);
  });
};

module.exports.spotifyThisSong = function() {
  let query = process.argv[1] != undefined ? process.argv[1] : 'The Sign Ace of Base';

  spotify.search({ type: 'track', query: query, limit: 1 })
    .then(function (data) {
    if(data.tracks.total === 0) {
      console.error('No Results Found. Please try again!');
      return;
    }

    logSongData(data.tracks.items);
  }, function(error) {
    console.error('error', error);
  });
};

module.exports.movieThis = function() {
  console.log(' movie')
};

module.exports.doWhatItSays = function() {

}