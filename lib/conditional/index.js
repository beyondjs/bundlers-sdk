const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const ipc = require('@beyond-js/ipc/main');
const Assets = require('./assets');

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

	#id;
	get id() {
		return this.#id;
	}

	#assets;
	get assets() {
		return this.#assets;
	}

	_assets() {}

	_asset(key) {
		void key;
	}

	constructor(module, conditions) {
		super();
		this.#module = module;

		const { platform, environment } = conditions;
		this.#id = `${this.#module.id}//${platform}` + environment ? `:${environment}` : '';
		this.#platform = platform;
		this.#environment = environment;

		this.#assets = new Assets(this);
	}
};
