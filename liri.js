require('dotenv').config();
var axios = require('axios');
const Spotify = require('node-spotify-api');
// const Moment = require('moment');
const keys = require('./keys.js');
const logConcertData = require('./utils.js').logConcertData;
const spotify = new Spotify(keys.spotify);

module.exports.concertThis = function() {
  let url = `https://rest.bandsintown.com/artists/${process.argv[1]}/events?app_id=codingbootcamp`;

  axios.get(url).then(function(response) {
    let data = response.data;
    logConcertData(data);
  });
};

module.exports.spotifyThisSong = function() {
  
};

module.exports.movieThis = function() {
  console.log('fuckin movie')
};

module.exports.doWhatItSays = function() {

}