const DynamicProcessor = require('@beyond-js/dynamic-processor')();

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.processor';
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
	 * @param {string} name - The name of the processor
	 * @param {string} specifier - The specifier of the processor
	 * @param {object} settings - The settings object for the processor as specified in the package.json file
	 * @param {object} specs - The specs object for the processor as specified in the module.json file
	 */
	constructor(name, specifier, settings, specs) {
		super();
		this.#name = name;
		this.#specifier = specifier;
		this.#settings = settings;
		this.#specs = specs;

		super.setup(
			new Map([
				['specs', { child: specs }],
				['settings', { child: settings }]
			])
		);
	}
};
