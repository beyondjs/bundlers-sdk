const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.bundle';
	}

	#module;
	get module() {
		return this.#module;
	}

	#settings;
	get settings() {
		return this.#settings;
	}

	#platforms;
	get platforms() {
		return this.#platforms;
	}

	constructor({ module, settings }) {
		super();
		this.#module = module;
		this.#settings = settings;
	}

	configure(config) {
		console.log('module config', config);
	}
};
