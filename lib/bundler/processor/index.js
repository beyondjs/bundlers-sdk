const ProcessorSources = require('./sources');
const ProcessorExtender = require('./extender');

module.exports = class {
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

	#strategy;
	get strategy() {
		return this.#strategy;
	}

	#sources;
	get sources() {
		return this.#sources;
	}

	#analyzer;
	get analyzer() {
		return this.#analyzer;
	}

	#extender;
	get extender() {
		return this.#extender;
	}

	#ims;
	get ims() {
		return this.#ims;
	}

	#types;
	get types() {
		return this.#types;
	}

	#css;
	get css() {
		return this.#css;
	}

	/**
	 * The bundler processor constructor
	 * @param {object} conditional - The module conditional
	 * @param {string} name - The name of the processor
	 * @param {string} specifier - The specifier of the processor
	 * @param {object} settings - The settings object for the processor as specified in the package.json file
	 * @param {object} specs - The specs object for the processor as specified in the module.json file
	 * @param {object} strategy
	 */
	constructor(conditional, name, specifier, settings, specs, strategy) {
		this.#conditional = conditional;
		this.#name = name;
		this.#specifier = specifier;
		this.#settings = settings;
		this.#specs = specs;
		this.#strategy = strategy;

		if (!strategy) {
			throw new Error(`Processor "${specifier}" error: "strategy" specification is required`);
		}
		if (strategy.extender && !strategy.extender.Preprocessor) {
			throw new Error(
				`Processor "${specifier}" error: "extender" specification is invalid. Preprocessor is required`
			);
		}

		const Sources = strategy.sources && (strategy.sources.Sources || ProcessorSources);
		this.#sources = Sources && new Sources(this, strategy.sources);

		const { Analyzer } = strategy;
		this.#analyzer = Analyzer && new Analyzer(this, strategy.analyzer);

		const Extender = strategy.extender && (strategy.extender?.Extender || ProcessorExtender);
		this.#extender = Extender && new Extender(this, strategy.extender);
	}
};
