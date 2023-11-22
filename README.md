# NESJS

NESJS is a JavaScript NES emulator.

NESJS is an improvement based on JSNES.

## UPDATE & IMPROVEMENT

1.Add support for Mapper240 and Mapper241.

2.Update the way variables are declared.

3.Speed up your mobile devices.

4.Fixed some issues.

## USE FOR WEB

In the web, you can use [unpkg](https://unpkg.com):

```html
<script type="text/javascript" src="https://unpkg.com/nesjs/dist/nesjs.min.js"></script>
```

```javascript
// Initialize and set up outputs
const nes = new nesjs.NES({
  onFrame: (frameBuffer) => {
    // ... write frameBuffer to screen
  },
  onAudioSample: (left, right) => {
    // ... play audio sample
  }
});

// Read ROM data from disk (using Node.js APIs, for the sake of this example)
const fs = require('fs');
let romData = fs.readFileSync('path/to/rom.nes', {encoding: 'binary'});

// Load ROM data as a string or byte array
nes.loadROM(romData);

// Run frames at 60 fps, or as fast as you can.
// You are responsible for reliable timing as best you can on your platform.
nes.frame();
nes.frame();
// ...

// Hook up whatever input device you have to the controller.
nes.buttonDown(1, nesjs.Controller.BUTTON_A);
nes.frame();
nes.buttonUp(1, nesjs.Controller.BUTTON_A);
nes.frame();
// ...
```

## USE FOR Node.js

    $ npm install jsnes

(Or `yarn add nesjs`.)

## Build

To build a distribution:

    $ yarn run build

This will create `dist/nesjs.min.js`.

## Running tests

    $ yarn test

## Maintainers
- [Zhao Tonggang](https://github.com/ZhaoTonggang)


# Here are some of the messages left by the original authors of JSNES

# JSNES

A JavaScript NES emulator.

It's a library that works in both the browser and Node.js. The browser UI is available at [https://github.com/bfirsh/jsnes-web](https://github.com/bfirsh/jsnes-web).

## Embedding JSNES in a web page

You can use JSNES to embed a playable version of a ROM in a web page. This is handy if you are a homebrew ROM developer and want to put a playable version of your ROM on its web page.

The best implementation is [jsnes-web](https://github.com/bfirsh/jsnes-web) but unfortunately it is not trivial to reuse the code. You'll have to copy and paste the code from that repository, the use the [`<Emulator>`](https://github.com/bfirsh/jsnes-web/blob/master/src/Emulator.js) React component. [Here is a usage example.](https://github.com/bfirsh/jsnes-web/blob/d3c35eec11986412626cbd08668dbac700e08751/src/RunPage.js#L119-L125).

A project for potential contributors (hello!): jsnes-web should be reusable and on NPM! It just needs compiling and bundling.

A more basic example is in the `example/` directory of this repository. Unfortunately this is known to be flawed, and doesn't do timing and sound as well as jsnes-web.

## Formatting code

All code must conform to [Prettier](https://prettier.io/) formatting. The test suite won't pass unless it does.

To automatically format all your code, run:

    $ yarn run format

## Maintainers

- [Ben Firshman](http://github.com/bfirsh)
- [Ben Jones](https://github.com/BenShelton)
- [Stephen Hicks](https://github.com/shicks)
- [Alison Saia](https://github.com/allie)

JSNES is based on [James Sanders' vNES](https://github.com/bfirsh/vNES), and owes an awful lot to it. It also wouldn't have happened without [Matt Wescott's JSSpeccy](http://jsspeccy.zxdemo.org/), which sparked the original idea. (Ben, circa 2008: "Hmm, I wonder what else could run in a browser?!")
