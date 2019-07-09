require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const utils = require("./utils.js");
const output = utils.output;
const logConcertData = utils.logConcertData;
const logSongData = utils.logSongData;
const logMovieData = utils.logMovieData;
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const omdb = keys.OMDB_KEY;
const colors = require("colors/safe");

function concertThis(artist) {
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

  axios.get(url).then(function(response) {
      let data = response.data;

      if (data.indexOf('Not found') > -1) {
        throw 'Wanna try and type like a real person?';
      } else if(data.length === 0) {
        throw `No Results! I Heard ${artist} has \n ${colors.zebra(
          "R E T I R E D!"
        )}`;
      } else {
        logConcertData(data);
      }
    })
    .catch(function(error) {
      if(!error.response) {
        console.error(colors.bgRed.white.bold(error));
      } else {
        console.error(colors.bgRed.white.bold(error.response.data));
      }
    })
    .finally(function() {
      output(colors.bgGreen.white.bold("√√ complete"));
    });
}

function spotifyThisSong(song) {
  let query = song != undefined ? song : "The Sign Ace of Base";

  spotify.search({ type: "track", query: query, limit: 1 })
  .then(
    function(data) {
      if (data.tracks.total === 0) {
        throw "No Results Found. Please try again!";
        return;
      }

      logSongData(data.tracks.items);
    })
    .catch(function(error) {
      console.log(
        colors.bgRed.white.bold(error)
      );
    })
    .finally(function() {
      output(colors.bgGreen.white.bold('End of File.\nMCP Out.'));
    })
}

function movieThis(movie) {
  let query = movie != undefined ? movie : 'Mr. Nobody';
  let url = `http://www.omdbapi.com/?apikey=${omdb}&t=${query}&type=movie`;

  axios
    .get(url)
    .then(function(response) {
      let movie = response.data;

      //TODO : Ask Zane why I need to do this, should the error be caught?
      if(movie.Title === undefined) {
        throw 'No Movies Matched. Please sober up and try again later.'
      } else if(movie.data != undefined) {
        throw move.data.Error
      }

      logMovieData(movie);
    })
    .catch(function(error) {
      console.log(colors.bgRed.white.bold(error));
    })
    .finally(function() {
      output(colors.bgWhite.black.bold('Done.'))
    });
}

function doWhatItSays() {
  fs.readFile("./random.txt", "utf-8", function(error, data) {
    if (error) throw error;
    let splitData = data.split(",");
    let command = splitData[0];
    let param = splitData[1];

    router(command, param);
  });
}

function router(command, paramater) {
  let route;
  let param;

  if (command != undefined) {
    route = command;
  } else if (process.argv[2] != undefined) {
    route = process.argv[2];
  } else {
    route = "do-what-it-says";
  }

  if (paramater != undefined) {
    param = paramater;
  } else if (process.argv[3] != undefined) {
    param = process.argv[3];
  } else {
    param = null;
  }

  switch (route) {
    case "concert-this":
      concertThis(param);
      break;
    case "spotify-this-song":
      spotifyThisSong(param);
      break;
    case "movie-this":
      movieThis(param);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}

//** Listen for CL commands **\\
(function() {
  if (require.main != module) return;

  router();
})();
