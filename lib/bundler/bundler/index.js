const Conditional = require('@beyond-js/bundlers-sdk/conditional');
const Processors = require('@beyond-js/bundlers-sdk/bundler/processors');
const BundlerStore = require('./store');

module.exports = class extends Conditional {
	#processors;
	get processors() {
		return this.#processors;
	}

	#store;
	get store() {
		return this.#store;
	}

	constructor(module, conditions, strategy) {
		super(module, conditions);

		if (typeof strategy !== 'object') {
			throw new Error(`Invalid strategy on module "${module.specifier}". An object is expected`);
		}
		if (!strategy.Processors && !strategy.processors) {
			throw new Error(`Invalid strategy on module "${module.specifier}". A Processors class is expected`);
		}

		this.#processors = strategy.processsors
			? new Processors(this, strategy.processors)
			: new strategy.Processors(this);

		this.#store = new BundlerStore(this);
	}
};
