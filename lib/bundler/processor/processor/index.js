const DynamicProcessor = require('@beyond-js/dynamic-processor')();

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.processor';
	}

	#conditional;
	get conditional() {
		return this.#conditional;
	}

	#name;
	get name() {
		return this.#name;
	}

	#specifier;
	get specifier() {
		return this.#specifier;
	}

	/**
	 * The settings object for the processor as specified in the package.json file
	 */
	#settings;
	get settings() {
		return this.#settings;
	}

	/**
	 * The specs object for the processor as specified in the modiule.json file
	 */
	#specs;
	get specs() {
		return this.#specs;
	}

	/**
	 * The bundler processor constructor
	 * @param {object} conditional - The module conditional
	 * @param {string} name - The name of the processor
	 * @param {string} specifier - The specifier of the processor
	 * @param {object} settings - The settings object for the processor as specified in the package.json file
	 * @param {object} specs - The specs object for the processor as specified in the module.json file
	 */
	constructor(conditional, name, specifier, settings, specs) {
		super();

		this.#conditional = conditional;
		this.#name = name;
		this.#specifier = specifier;
		this.#settings = settings;
		this.#specs = specs;
	}
};
