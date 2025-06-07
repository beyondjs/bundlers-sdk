const Outputs = require('./outputs');
const Specs = require('./specs');
const ipc = require('@beyond-js/ipc/main');

module.exports = class {
	#module;
	get module() {
		return this.#module;
	}

	#platform;
	get platform() {
		return this.#platform;
	}

	#environment;
	get environment() {
		return this.#environment;
	}

	#specs;
	get specs() {
		return this.#specs;
	}

	#id;
	get id() {
		return this.#id;
	}

	#outputs;
	get outputs() {
		return this.#outputs;
	}

	/**
	 * This method can be overriden to process the specs values required for the processing of the outputs
	 *
	 * @param {object} values
	 * @returns
	 */
	_specs(values) {
		// The module should return only the specs values it will require for the processing of the outputs
		// Take into account that a change in the specs values will invalidate the outputs
		void values;
		return { values: {} };
	}

	_outputs() {
		throw new Error(`Private method '_outputs' must be overriden`);
	}

	_output(key) {
		void key;
		throw new Error(`Private method '_output' must be overriden`);
	}

	/**
	 * Technically the processors are of the conditional,
	 * but they can be the same for all conditionals of the module.
	 * If the specifier is not provided, it will be resolved by the _resolve method of the processors collection.
	 *
	 * @returns {Map<string, {specs: object, specifier?: string}>} - The processors of the conditional
	 */
	_processors() {
		return this.#module._processors();
	}

	constructor(module, conditions) {
		this.#module = module;
		this.#specs = new Specs(this);

		const { platform, environment } = conditions;
		this.#id = `${this.#module.id}//${platform}` + environment ? `:${environment}` : '';
		this.#platform = platform;
		this.#environment = environment;

		this.#outputs = new Outputs(this);
	}

	destroy() {
		this.#outputs.destroy();
		super.destroy();
	}
};
