"use strict";

const { unshift } = require("@aditi/stream-utils");

const readSymbol = async function* (s, b = "") {
	const { done, value } = await s.next();
	if (done) return s;
	if (/^[A-Za-z_-]$/.test(value)) {
		return yield* readSymbol(s, b + value);
	}

	if (b.length > 0 && /^[A-Za-z0-9_-]$/.test(value)) {
		return yield* readSymbol(s, b + value);
	}

	yield { type: "symbol", value: b };
	return unshift(value, s);
};

module.exports = readSymbol;
