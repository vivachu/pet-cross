# pets-minigames
Minigames for Pet Parade

# Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/vivachu/pet-cross.git PetCross`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

### Modifying `gulpfile.js`

See [gulpfile.md](https://github.com/vivachu/pets-minigames/gulpfile.md)

## Changelog (1.0.0)

- base code added
- assets artwork added
- Drawing algo using Phaser native tilemap failed, lagging badly
- Changing Drawing algo , my own tilemap system, lagging badly 
- adding cars and wood logs
- Changing Drawing algo , hybrid tiling success, noticable lagging, bad on xiaomi
- controlled random appearance for cars
- car collision and gameovers
- riding wood logs
- falling into river, failed, conflict with riding woods
- Changing Drawing algo , using BitmapData draws bitmap to lanes, no lag low fps
- fixing wood log random to a controlled random system
- creating fence and other ornaments
- Changing Drawing algo, hybrid tiling to pure grid tiling. success with high fps
- creating controlled random for fences
- gameover when falling into water 
- creating controlle drandom for grass objects
- Changing Drawing algo , from 72px tile to 144px tile


- remove pause button
- shorten the playing length from 200 lines to 100

## Contributing

Please report any bugs or add requests on [Github Issues](https://github.com/vivachu/pets-minigames/issues).

## About us

Pet Parade Mini Games were part of Pet Parade App developed by GoodBoy Studios 


## License

This project is released under the MIT License.