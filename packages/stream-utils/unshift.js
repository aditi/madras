"use strict";

const unshift = async function* (val, stream) {
	yield val;
	return yield* stream;
};

module.exports = unshift;
