"use strict";

const unshift = require("./unshift");

const readUntil = async function* (f, s) {
	for await (const c of s) {
		if (f(c)) {
			return unshift(c, s);
		}
		yield c;
	}
};

module.exports = readUntil;
