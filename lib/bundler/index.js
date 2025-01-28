const Exports = require('./exports');

module.exports = class {
	get dp() {
		return 'bundler.base';
	}

	#module;
	get module() {
		return this.#module;
	}

	#settings;
	get settings() {
		return this.#settings;
	}

	#specs;
	get specs() {
		return this.#specs;
	}

	#exports;
	get exports() {
		return this.#exports;
	}

	constructor({ module, settings, specs }) {
		this.#module = module;
		this.#settings = settings;
		this.#specs = specs;

		this.#exports = new Exports(this);
	}
};
