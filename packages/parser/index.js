const lexer = require("@aditi/madras-lexer");

const asml = require("fs").createReadStream(__dirname + "/demo.asml", "utf8");

const inc = x => x + 1;
const tail = xs => xs[xs.length - 1];
const path = p => ox => p.reduce((acc, curr) => acc ? acc[curr] : undefined, ox);

async function convert (tokens) {
	const pos = [ 0 ];
	const list = [];

	for await (const token of tokens) {
		const { type, value } = token;
		const lead = path(pos.slice(0, -1))(list);

		if (type === "paren") {
			if (value === "(") {
				lead[tail(pos)] = [];
				pos.push(0);
			} else {
				pos.pop();
				pos[pos.length - 1] = inc(tail(pos));
			}
		} else if (type === "symbol") {
			lead.push(value);
			pos[pos.length - 1] = inc(tail(pos));
		} else if (type === "number") {
			lead.push(Number(value));
			pos[pos.length - 1] = inc(tail(pos));
		}
	}

	return list;
}

(async () => {
	console.log(JSON.stringify(await convert(lexer(asml)), null, 2));
})();
