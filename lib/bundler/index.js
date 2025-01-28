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

	#specs;
	get specs() {
		return this.#specs;
	}

	#exports;
	get exports() {
		return this.#exports;
	}

	constructor({ module, settings, specs }) {
		super();
		this.#module = module;
		this.#settings = settings;
		this.#specs = specs;

		super.setup(new Map([['specs', { child: specs }]]));
	}

	_process() {
		console.log('module config', this.#specs.values);
	}
};
