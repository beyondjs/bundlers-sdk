const Conditional = require('@beyond-js/bundlers-sdk/conditional');
const Processors = require('./processors');

module.exports = class extends Conditional {
	#processors;
	get processors() {
		return this.#processors;
	}

	constructor(module, conditions, specs) {
		super(module, conditions);
		this.#processors = new Processors(this, specs);
	}
};
