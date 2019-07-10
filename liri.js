// TODO : DEGLOBALIZE!!!! \\
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const utils = require("./utils.js");
const output = utils.output;
const logConcertData = utils.logConcertData;
const logSongData = utils.logSongData;
const logMovieData = utils.logMovieData;
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// ! Do we really need to define keys like this or are we just making constants for fun now? 
const omdb = keys.OMDB_KEY;
const colors = require('colors/safe');
const inquirer = require('inquirer');

function concertThis() {
  let band;
  
  inquirer.prompt({
    type: 'input',
    message: 'Which artist would you like concert data for?',
    name: 'artist'
  })
  .then(function(res) {
    if(res.artist) {
      band = res.artist;
      getConcert(band);
    } else {
      throw 'Nothing Found…'
    }
  })
  .catch(function(error) {
    utils.errorHandler(error);
  });

  function getConcert(artist) {
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
      .catch(utils.errorHandler)
      .finally(function() {
        output(colors.bgGreen.white.bold("√√ complete"));
      });
  }
}

function spotifyThisSong(song) {
  let queryString = song != undefined ? song : "The Sign Ace of Base";

  spotify
  .search({ type: "track", query: queryString, limit: 1 })
  .then(
    function (data) {
      if (data.tracks.total === 0) {
        throw "No Results Found. Please try again!";
      }

      logSongData(data.tracks.items);
    })
    .catch(utils.errorHandler)
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

      //TODO : Ask Zane why I need to do this, shouldnt these errors be caught?
      if(movie.Title === undefined) {
        throw 'No Movies Matched. Please sober up and try again later.'
      } else if(movie.data != undefined) {
        throw move.data.Error
      }

      logMovieData(movie);
    })
    .catch(utils.errorHandler)
    .finally(function() {
      output(colors.bgWhite.black.bold('Done.'))
    });
}

function doWhatItSays() {
  //TODO : try to use then/catch program flow with fs.readFile
  fs.readFile("./random.txt", "utf-8", function(error, data) {
    if (error) throw error;
    let splitData = data.split(",");
    let command = splitData[0];
    let param = splitData[1];

    router(command, param);
  });
}

function router(command) {
  let route;

  if (command != undefined) {
    route = command;
  } else if (process.argv[2] != undefined) {
    route = process.argv[2];
  } else {
    route = "do-what-it-says";
  }

  switch (route) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this-song":
      spotifyThisSong();
      break;
    case "movie-this":
      movieThis();
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
