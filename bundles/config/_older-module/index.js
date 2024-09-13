const registry = require('@beyond-js/widgets-bundle/registry');
const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const equal = require('@beyond-js/equal');

/**
 * The bundles of the module that are registered by configuration in the module.json file.
 */
module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.bundles';
	}

	#module;

	#config;
	#configured = false;
	get configured() {
		return this.#configured;
	}

	#warnings = [];
	get warnings() {
		return this.#warnings;
	}

	constructor(module) {
		super();
		this.#module = module;
		super.setup(new Map([['registry.bundles', { child: registry.bundles }]]));
	}

	_prepared() {
		return this.#configured;
	}

	_process() {
		let changed = false;
		const warnings = [];
		const updated = new Map();
		[...Object.entries(this.#config)].forEach(([name, config]) => {
			if (!registry.bundles.has(name)) {
				warnings.push(`Bundle "${name}" not found`);
				return;
			}

			const bundle = this.has(name)
				? this.get(name)
				: (changed = true) && new (require('./bundle'))(name, this.#module);

			updated.set(name, bundle);
			bundle.configure(config);
		});

		// Destroy unused bundles
		this.forEach((bundle, name) => !updated.has(name) && (changed = true) && bundle.destroy());

		super.clear(); // Do not use this.clear as it would destroy bundles that are being used
		updated.forEach((value, key) => this.set(key, value));

		changed = changed || !equal(this.#warnings, warnings);
		this.#warnings = warnings;
		return changed;
	}

	configure(config) {
		this.#config = config;
		this.#configured = true;
		this._invalidate();
	}

	clear() {
		this.forEach(bundle => bundle.destroy());
	}

	destroy() {
		super.destroy();
		this.clear();
	}
};
