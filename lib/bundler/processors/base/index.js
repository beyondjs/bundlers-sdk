// const ProcessorBase = require('@beyond-js/bundlers-sdk/processor/base');
const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const equal = require('@beyond-js/equal');

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

	_resolve(name) {
		void name;
		return { error: `Processor "${name}" not found in the bundler settings` };
	}

	_process() {
		const done = ({ errors, warnings, updated }) => {
			const previous = { errors: this.#errors, warnings: this.#warnings };
			const changed =
				!equal({ errors, warnings }, previous) ||
				updated.size !== this.size ||
				updated.forEach((value, key) => (changed = changed || !this.has(key)));
			if (!changed) return false;

			this.#errors = errors || [];
			this.#warnings = warnings || [];

			// Destroy unused processors
			this.forEach((processor, name) => !updated.has(name) && processor.destroy());

			super.clear(); // Do not use this.clear() as it would destroy still used processors
			updated.forEach((value, key) => this.set(key, value));
		};

		const { processors, errors, warnings } = this.#conditional._processors();
		if (errors?.length) return done({ errors, warnings });

		const updated = new Map();
		for (const [name, data] of Object.entries(processors)) {
			const { specs } = data;

			let specifier = data.specifier;
			if (!specifier) {
				const resolved = this._resolve(name);
				if (resolved.error) {
					errors.push(resolved.error);
					continue;
				}

				specifier = resolved.specifier;
			}

			if (this.has(name)) {
				updated.set(name, this.get(name));
				this.get(name).specs.values = specs;
				continue;
			}

			let resolved = null;
			try {
				resolved = require.resolve(specifier, { paths: [module.package.path] });
			} catch (exc) {
				throw new Error(`Error resolving processor "${specifier}": ${exc.message}`, { cause: exc });
			}

			try {
				const Processor = require(resolved);
				const processor = new Processor(this.#conditional, name, specifier);
				specs.values = config;

				updated.set(name, processor);
			} catch (exc) {
				console.error(exc);
				throw new Error(`Error requiring bundler "${specifier}": ${exc.message}`);
			}
		}
		return done({ errors, warnings, updated });
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
