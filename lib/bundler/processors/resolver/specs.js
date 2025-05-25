const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class ProcessorSpecs extends DynamicProcessor {
	get dp() {
		return 'processor.specs';
	}

	#processor;
	get processor() {
		return this.#processor;
	}

	#values;
	get values() {
		return this.#values;
	}
	set values(values) {
		if (equal(values, this.#values)) return;

		this.#values = values;
		this._invalidate();
	}

	setup(processor) {
		this.#processor = processor;
	}
};
