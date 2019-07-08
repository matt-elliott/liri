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