"use strict";

const drip = async function* (s) {
	for await (const c of s) {
		yield* c;
	}
};

module.exports = drip;
