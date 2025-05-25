// const ProcessorBase = require('@beyond-js/bundlers-sdk/processor/base');
const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const ProcessorSettings = require('./settings');
const ProcessorSpecs = require('./specs');

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

	constructor(conditional) {
		super();
		this.#conditional = conditional;
	}

	_process({ processors, errors, warnings }) {
		const updated = new Map();
		for (const [name, config] of Object.entries(processors)) {
			if (this.has(name)) {
				updated.set(name, this.get(name));
				this.get(name).specs.values = config;
				continue;
			}

			let resolved = null;
			try {
				resolved = require.resolve(specifier, { paths: [module.package.path] });
			} catch (exc) {
				console.log(module.bundler.path);
				throw new Error(`Error resolving processor "${specifier}": ${exc.message}`, { cause: exc });
			}

			try {
				const Processor = require(resolved);
				const settings = new ProcessorSettings();
				const specs = new ProcessorSpecs();

				const processor = new Processor(this.#conditional, name, specifier, settings, specs);

				settings.setup(processor, name);
				specs.setup();
				specs.values = config;

				updated.set(name, processor);
			} catch (exc) {
				console.error(exc);
				throw new Error(`Error requiring bundler "${specifier}": ${exc.message}`);
			}
		}

		let changed = updated.size !== this.size;
		!changed && updated.forEach((value, key) => (changed = changed || !this.has(key)));
		if (!changed) return false;

		// Destroy unused processors
		this.forEach((processor, name) => !updated.has(name) && processor.destroy());

		super.clear(); // Do not use this.clear() as it would destroy still used processors
		updated.forEach((value, key) => this.set(key, value));
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
