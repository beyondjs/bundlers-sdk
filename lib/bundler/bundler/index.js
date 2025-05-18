const Conditional = require('@beyond-js/bundlers-sdk/conditional');
const Processors = require('./processors');

module.exports = class extends Conditional {
	#processors;
	get processors() {
		return this.#processors;
	}

	constructor(module, conditions) {
		super(module, conditions);
		this.#processors = new Processors(this);

		super.setup(new Map([['processors', { child: this.#processors }]]));
	}

	_prepared(required) {
		this.#processors.forEach(processor => required(processor));
	}

	_process() {}
};
