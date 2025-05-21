const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.processor.sources.files';
	}

	#processor;
	get processor() {
		return this.#processor;
	}

	constructor(processor) {
		super();
		this.#processor = processor;
	}

	#hash;
	get hash() {
		return this.#hash;
	}
};
