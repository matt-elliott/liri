const moment = require('moment');
const colors = require('colors/safe');

module.exports.errorHandler = function (error) {
  if(!error.response) {
    console.error(colors.bgRed.white.bold(error));
  } else {
    console.error(colors.bgRed.white.bold(error.response.data));
  }
}

module.exports.logConcertData = function (data) {
  data.forEach(function(datum) {
    var concert = {
      venue: datum.venue.name.trim(),
      address: datum.venue.city.trim() + ', ' + datum.venue.country.trim(),
      eventDate: 
        moment(datum.datetime.trim()).format('MM/DD/YYYY')
    };

    console.log(
      '\n',
      colors.red.bold('Venue : '),
      colors.white.bold(concert.venue) + '\n',
      colors.red.bold('Address : '),
      colors.white.bold(concert.address) + '\n',
      colors.red.bold('Date : '),
      colors.white.bold(concert.eventDate),
      '\n\n',
    );
  })
}

module.exports.logSongData = function(songs) {
  let response = {};
  let artistsArray = [];

  if(songs[0].artists.length > 0) {
    songs[0].artists.forEach(function(artist) {
      artistsArray.push(artist.name);
    });
  }
  response = {
    artists: artistsArray.join(', '),
    name: songs[0].name,
    link: songs[0].preview_url != null ?
      songs[0].preview_url : 'No link available.',
    album: songs[0].album.name
  };
  
  console.log(
    '\n',
    colors.white.bold('Artists : '),
    colors.red.bold(response.artists),
    '\n',
    colors.white.bold('Song Name : '),
    colors.red.bold(response.name),
    '\n',
    colors.white.bold('Album : '),
    colors.red.bold(response.album),
    '\n',
    colors.white.bold('Link : '),
    colors.red.bold(response.link),
    '\n\n',
  );
}

module.exports.logMovieData = function (movie) {
  const response = {
    title: movie.Title,
    year: movie.Year,
    imdbRating: movie.Ratings != undefined ? movie.Ratings[0].Value : 'N/A',
    rottenRating: movie.Ratings != undefined ? movie.Ratings[1].Value: 'N/A',
    country: movie.Country,
    language: movie.Language,
    plot: movie.Plot,
    actors: movie.Actors
  };

  console.log(
    '\n',
    colors.white.bold('Movie Title : '),
    colors.red.bold(response.title),
    '\n',
    colors.white.bold('Year : '),
    colors.red.bold(response.year),
    '\n',
    colors.white.bold('IMDB Rating : '),
    colors.red.bold(response.imdbRating),
    '\n',
    colors.white.bold('Rotten Tomatoes : '),
    colors.red.bold(response.rottenRating),
    '\n\n',
    colors.white.bold('Country : '),
    colors.red.bold(response.country),
    '\n\n',
    colors.white.bold('Plot : '),
    colors.red.bold(response.plot),
    '\n\n',
    colors.white.bold('Actors : '),
    colors.red.bold(response.actors),
    '\n\n',
  );
}
module.exports.output = function(message) {
  if(process.env.ENV_DEBUG === 'true') {
    console.log(message);
  }
}