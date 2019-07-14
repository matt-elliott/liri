# liri
### A Language Interpretation and Recognition Interface
A tool to help you find your favorite band's concerts, get information on any movie, and get spotify data on any song.

## Demo
Demo video is available [here](https://youtu.be/pNOJx_Nn9uk)
#### Installation
Clone source from github and set up your .env.

#### The Build
This CLI App built with Node.js utilizes multiple media APIs (Spotify, OMDB, Bandsintown Api) to return data matching users search query. Users can search for specific songs on spotify, details on movies, and see if their favorite band is in town: all from the command line!

#### Usage 
Make a request to Liri using the following syntax:
```
node liri.js <function to call> <variable to pass>
```
##### concertThis
Get concert data of a band by following the syntax below
```
node liri.js concert-this metallica
```

##### spotifyThisSong
Get Spotify data of a song by following the syntax below
```
node liri.js spotify-this-song "Summer Madness"
```

##### movieThis
Look up movie data by following the syntax below
```
node liri.js movie-this "Jaws II"
```

##### doWhatItSays
Run command in script
```
node liri.js do-what-it-says
```

##### default
You can also just run liri and get default output.
```
node liri.js
```

#### Contributing
Pull requests welcome. Please make an issue to discuss any major changes.

