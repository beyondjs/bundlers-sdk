const Assets = require('./assets');
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

	#assets;
	get assets() {
		return this.#assets;
	}

	/**
	 * This method can be overriden to process the specs values required for the processing of the assets
	 *
	 * @param {object} values
	 * @returns
	 */
	_specs(values) {
		// The module should return only the specs values it will require for the processing of the assets
		// Take into account that a change in the specs values will invalidate the assets
		void values;
		return { values: {} };
	}

	_assets() {
		throw new Error(`Private method '_asset' must be overriden`);
	}

	_asset(key) {
		void key;
		throw new Error(`Private method '_asset' must be overriden`);
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

		this.#assets = new Assets(this);
	}

	destroy() {
		this.#assets.destroy();
		super.destroy();
	}
};
