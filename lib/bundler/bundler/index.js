const Conditional = require('@beyond-js/bundlers-sdk/conditional');

module.exports = class extends Conditional {
	#processors;
	get processors() {
		return this.#processors;
	}

	constructor(module, conditions, processors) {
		super(module, conditions);
		this.#processors = new Processors(this, processors);
	}
};
