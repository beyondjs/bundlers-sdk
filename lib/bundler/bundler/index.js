const Conditional = require('@beyond-js/bundlers-sdk/conditional');
const StaticProcessors = require('@beyond-js/bundlers-sdk/bundler/processors/static');

module.exports = class extends Conditional {
	#processors;
	get processors() {
		return this.#processors;
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
			? new StaticProcessors(this, strategy.processors)
			: new strategy.Processors(this);

		super.setup(new Map([['processors', { child: this.#processors }]]));
	}

	_process() {}
};
