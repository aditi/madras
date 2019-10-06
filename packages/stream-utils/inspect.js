"use strict";

const inspect = async function* (s) {
	for await (const c of s) {
		console.log("inspect", JSON.stringify(c));
		yield c;
	}
};

module.exports = inspect;
