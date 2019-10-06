"use strict";

const { PassThrough } = require("stream");

const toNodeStream = s => {
	const ns = new PassThrough({ objectMode: true });
	(async () => {
		for await (const chunk of s) {
			ns.write(chunk);
		}
		ns.end();
	})().catch(err => ns.emit("error", err));
	return ns;
};

module.exports = toNodeStream;
