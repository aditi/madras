"use strict";

const { drip, inspect, unshift } = require("@aditi/stream-utils");
const readSymbol = require("./readSymbol");
const readNumber = require("./readNumber");

const tokenise = async function* (s) {
	const input = drip(s);
	const { value, done } = await input.next();
	if (done) {
		return value;
	}
	if (/^[A-Za-z_-]$/.test(value)) {
		const ret = yield* readSymbol(unshift(value, input));
		return yield* tokenise(unshift(ret, input));
	}
	if (/^[()]$/.test(value)) {
		yield { type: "paren", value };
		return yield* tokenise(input);
	}
	if (/^\s$/.test(value)) {
		return yield* tokenise(input);
	}
	if (/^(\d|\.)$/.test(value)) {
		const ret = yield* readNumber(unshift(value, input));
		return yield* tokenise(unshift(ret, input));
	}
	throw new TypeError("Unknown char: " + value);
};

module.exports = tokenise;
