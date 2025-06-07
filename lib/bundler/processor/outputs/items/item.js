const Generated = require('./generated');
const Issues = require('./issues');
const crc32 = require('@beyond-js/crc32');

module.exports = class {
	#source;
	get source() {
		return this.#source;
	}

	#errors = new Issues('error');
	get errors() {
		return this.#errors;
	}

	#warnings = new Issues('warning');
	get warnings() {
		return this.#warnings;
	}

	get valid() {
		return !this.#errors?.length;
	}

	constructor(source) {
		this.#source = source;
	}
};
