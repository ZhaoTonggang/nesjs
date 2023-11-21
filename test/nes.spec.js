let assert = require("chai").assert;
let fs = require("fs");
let NES = require("../src/nes");
let sinon = require("sinon");

describe("NES", function() {
	it("can be initialized", function() {
		let nes = new NES();
	});

	it("loads a ROM and runs a frame", function(done) {
		let onFrame = sinon.spy();
		let nes = new NES({
			onFrame: onFrame
		});
		fs.readFile("roms/croom/croom.nes", function(err, data) {
			if (err) return done(err);
			nes.loadROM(data.toString("binary"));
			nes.frame();
			assert(onFrame.calledOnce);
			assert.isArray(onFrame.args[0][0]);
			assert.lengthOf(onFrame.args[0][0], 256 * 240);
			done();
		});
	});

	it("generates the correct frame buffer", function(done) {
		let onFrame = sinon.spy();
		let nes = new NES({
			onFrame: onFrame
		});
		fs.readFile("roms/croom/croom.nes", function(err, data) {
			if (err) return done(err);
			nes.loadROM(data.toString("binary"));
			// Check the first index of a white pixel on the first 6 frames of
			// output. Croom only uses 2 colors on the initial screen which makes
			// it easy to detect. Comparing full snapshots of each frame takes too
			// long.
			let expectedIndexes = [-1, -1, -1, 2056, 4104, 4104];
			for (let i = 0; i < 6; i++) {
				nes.frame();
				assert.equal(onFrame.lastCall.args[0].indexOf(0xFFFFFF), expectedIndexes[i]);
			}
			done();
		});
	});

	describe("#loadROM()", function() {
		it("throws an error given an invalid ROM", function() {
			let nes = new NES();
			assert.throws(function() {
				nes.loadROM("foo");
			}, "Not a valid NES ROM.");
		});
	});

	describe("#getFPS()", function() {
		let nes = new NES();
		before(function(done) {
			fs.readFile("roms/croom/croom.nes", function(err, data) {
				if (err) return done(err);
				nes.loadROM(data.toString("binary"));
				done();
			});
		});

		it("returns an FPS count when frames have been run", function() {
			assert.isNull(nes.getFPS());
			nes.frame();
			nes.frame();
			let fps = nes.getFPS();
			assert.isNumber(fps);
			assert.isAbove(fps, 0);
		});
	});
});