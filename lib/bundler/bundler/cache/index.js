const Processors = require('./processors');

module.exports = class {
	#db = require('./db');
	#bundler;

	#processors;
	get processors() {
		return this.#processors;
	}

	constructor(bundler) {
		this.#bundler = bundler;
		this.#processors = new Processors(this.#bundler, this.#db);
	}
};
