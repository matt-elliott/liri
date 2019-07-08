const moment = require('moment');
const colors = require('colors/safe');

module.exports.logConcertData = function(data) {
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
  let artists = [];

  if(songs[0].artists.length > 0) {
    songs[0].artists.forEach(function(artist) {
      artists.push(artist.name);
    });
  }

  response = {
    artists: artists.join(', '),
    name: songs[0].name,
    link: songs[0].href,
    album: songs[0].album.name
  };

  console.log(
    '\n',
    colors.white.bold('Artists : '),
    colors.red(response.artists),
    '\n',
    colors.white.bold('Song Name : '),
    colors.red(response.name),
    '\n',
    colors.white.bold('Album : '),
    colors.red(response.album),
    '\n',
    colors.white.bold('Link : '),
    colors.red(response.link),
    '\n\n',
  );
}

module.exports.logMovieData = function (movie) {
  const response = {
    title: movie.Title,
    year: movie.Year,
    imdbRating: movie.imdbRating,
    rottenRating: movie.Ratings[0].value,
    country: movie.Country,
    language: movie.Language,
    plot: movie.Plot,
    actors: movie.Actors
  };

  console.log(
    '\n',
    colors.white.bold('Movie Title : '),
    colors.red(response.title),
    '\n',
    colors.white.bold('Year : '),
    colors.red(response.year),
    '\n',
    colors.white.bold('IMDB Rating : '),
    colors.red(response.imdbRating),
    '\n',
    colors.white.bold('Rotten Tomatoes : '),
    colors.red(response.rottenRating),
    '\n\n',
    colors.white.bold('Country : '),
    colors.red(response.country),
    '\n\n',
    colors.white.bold('Plot : '),
    colors.red(response.plot),
    '\n\n',
    colors.white.bold('Actors : '),
    colors.red(response.actors),
    '\n\n',
  );
}