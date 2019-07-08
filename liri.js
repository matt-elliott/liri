require('dotenv').config();
var axios = require('axios');
const Spotify = require('node-spotify-api');
// const Moment = require('moment');
const keys = require('./keys.js');
const logConcertData = require('./utils.js').logConcertData;
const logSongData = require('./utils.js').logSongData;
const spotify = new Spotify(keys.spotify);


function concertThis(artist) {
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

  axios.get(url).then(function (response) {
    let data = response.data;
    logConcertData(data);
  });
};

function spotifyThisSong(song) {
  let query = song != undefined ? song : 'The Sign Ace of Base';

  spotify.search({ type: 'track', query: query, limit: 1 })
    .then(function (data) {
      if (data.tracks.total === 0) {
        console.error('No Results Found. Please try again!');
        return;
      }

      logSongData(data.tracks.items);
    }, function (error) {
      console.error('error', error);
    });
};

function movieThis() {
  console.log(' movie')
};

function doWhatItSays() {

}

//** Listen for CL commands **\\
(function () {
  if (require.main != module) return;

  switch (process.argv[2]) {
    case 'concert-this':
      concertThis(process.argv[3]);
      break;
    case 'spotify-this-song':
      spotifyThisSong(process.argv[3]);
      break;
    case 'movie-this':
      movieThis();
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
  }
})();