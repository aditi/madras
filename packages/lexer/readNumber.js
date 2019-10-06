"use strict";

const { unshift } = require("@aditi/stream-utils");

const readNumber = async function* (s, b = "", decimal = false) {
	const { value, done } = await s.next();
	if (done) return s;

	if (/^\d$/.test(value)) {
		return yield* readNumber(s, b + value, decimal);
	}

	if (/^\.$/.test(value) && !decimal) {
		return yield* readNumber(s, b + value, true);
	}

	yield { type: "number", value: b };
	return unshift(value, s);
};

module.exports = readNumber;
