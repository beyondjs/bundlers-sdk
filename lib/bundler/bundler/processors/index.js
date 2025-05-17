// const ProcessorBase = require('@beyond-js/bundlers-sdk/processor/base');
const DynamicProcessor = require('@beyond-js/dynamic-processor')();

/**
 * The processors of a bundler
 */
module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.processors';
	}

	#conditional;
	get conditional() {
		return this.#conditional;
	}

	#specs;
	get specs() {
		return this.#specs;
	}

	#errors = [];
	get errors() {
		return this.#errors;
	}

	#warnings = [];
	get warnings() {
		return this.#warnings;
	}

	get valid() {
		return !this.#errors?.length;
	}

	#hashes;
	get hashes() {
		return this.#hashes;
	}

	constructor(conditional, specs) {
		super();

		this.#conditional = conditional;
		this.#specs = specs;

		super.setup(
			new Map([
				// Derived from the module specs: specified in the module.json file
				['bundler-specs', { child: specs }],
				// The module settings: specified in the package.json file (bundlers property)
				['bundler-settings', { child: conditional.module.settings }]
			])
		);
	}

	_process() {
		const settings = this.#conditional.module.settings.values;
		const specs = this.#specs.values;
		const { processors } = specs;

		const updated = new Map();

		console.log('process the procesors');
		console.log('specs', specs);
		console.log('settings', settings);

		// CONTINUE FROM HERE!!

		// for (const [name, config] of processors.entries()) {
		// 	const { bundle, distribution, language } = this.#conditional;
		// 	const {
		// 		container: { application },
		// 		watcher
		// 	} = bundle;
		// 	const bundler = this.#conditional;
		// 	const specs = { watcher, bundle, bundler, distribution, language, application };

		// 	const meta = registry.processors.get(name);
		// 	const Processor = meta.Processor ? meta.Processor : ProcessorBase;
		// 	const processor = this.has(name) ? this.get(name) : (changed = true) && new Processor(name, specs);

		// 	// Allow the processor to modify the config object without affecting the original configuration
		// 	const cloned = (() => {
		// 		if (typeof config !== 'object') return config;
		// 		if (config instanceof Array) return config.slice();
		// 		return Object.assign({}, config);
		// 	})();
		// 	processor.configure(cloned, multilanguage);
		// 	updated.set(name, processor);
		// }

		// // Destroy unused processors
		// this.forEach((processor, name) => !updated.has(name) && processor.destroy());

		// super.clear(); // Do not use this.clear() as it would destroy still used processors
		// updated.forEach((value, key) => this.set(key, value));

		// return changed;
	}

	clear() {
		this.forEach(processor => processor.destroy());
		super.clear();
	}

	destroy() {
		this.clear();
		super.destroy();
	}
};
