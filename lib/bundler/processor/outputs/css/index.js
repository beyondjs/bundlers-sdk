const DynamicProcessor = require('@beyond-js/dynamic-processor')();

module.exports = class extends DynamicProcessor {
	#processor;
	get processor() {
		return this.#processor;
	}

	constructor(processor) {
		super();
		this.#processor = processor;
	}
};
