const Assets = require('./assets');
const Specs = require('./specs');
const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const ipc = require('@beyond-js/ipc/main');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.conditional';
	}

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
	 * It takes the specs values from the module specs to process the specs of the conditional
	 * It tipially returns the specs values of the module or a subset of them
	 *
	 * @param {object} values
	 * @returns
	 */
	_specs(values) {
		return values;
	}

	_assets() {
		throw new Error(`Private method '_asset' must be overriden`);
	}

	_asset(key) {
		void key;
		throw new Error(`Private method '_asset' must be overriden`);
	}

	constructor(module, conditions) {
		super();
		this.#module = module;
		this.#specs = new Specs(this);

		const { platform, environment } = conditions;
		this.#id = `${this.#module.id}//${platform}` + environment ? `:${environment}` : '';
		this.#platform = platform;
		this.#environment = environment;

		this.#assets = new Assets(this);

		super.setup(new Map([['specs', { child: this.#specs }]]));
	}

	destroy() {
		this.#assets.destroy();
		super.destroy();
	}
};
