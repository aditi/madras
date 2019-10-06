"use strict";

const pop = async function* (val, s) {
	const { value, done } = await s.next();
	if (done) return value;

	let cache = value;

	for await (const c of s) {
		yield cache;
		cache = c;
	}

	return cache;
};

module.exports = pop;
