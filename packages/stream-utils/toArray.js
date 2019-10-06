"use strict";

const toArray = async s => {
	const res = [];
	for await (const c of s) {
		res.push(c);
	}
	return res;
};

module.exports = toArray;
