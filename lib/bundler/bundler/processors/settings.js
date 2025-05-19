const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class ProcessorSettings extends DynamicProcessor {
	get dp() {
		return 'processor.settings';
	}

	#processor;
	get processor() {
		return this.#processor;
	}

	#values = {};
	get values() {
		return this.#values;
	}

	setup(processor) {
		this.#processor = processor;
		const bundler = processor.conditional.module.bundler;

		super.setup(new Map([['bundler-settings', { child: bundler.settings }]]));
	}

	_process() {
		const bundler = processor.conditional.module.bundler;
		const { processors } = bundler.settings.values;
		let values = processors[this.#processor.name];
		values = values || {};

		const changed = !equal(values, this.#values);
		if (!changed) return false;
		this.#values = values;

		this.#processor._specs(values);
	}
};
