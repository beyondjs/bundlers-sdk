const Extension = require('./extension');

module.exports = class extends Map {
	#processor;
	get processor() {
		return this.#processor;
	}

	#preprocessor;
	get preprocessor() {
		return this.#preprocessor;
	}

	constructor(processor, strategy) {
		if (typeof strategy !== 'object' || !strategy.Preprocessor || !Array.isArray(strategy.extends)) {
			const { specifier } = processor;
			throw new Error(`Processor "${specifier}" error: Invalid strategy provided to the processor extender`);
		}

		super();
		this.#processor = processor;

		const { Preprocessor } = strategy;
		this.#preprocessor = new Preprocessor(processor, strategy.extends);

		/**
		 * The extends property is an array of processor names that this extender will handle.
		 * Each name corresponds to a processor that will be instantiated and added to this Map.
		 */
		const processors = strategy.extends;
		processors.forEach(name => {
			const extension = new Extension(name, this.#preprocessor);
			this.set(name, extension);
		});
	}
};
