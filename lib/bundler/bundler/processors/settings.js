const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class ProcessorSettings extends DynamicProcessor {
	get dp() {
		return 'processor.settings';
	}

	#processorName;
	#bundler;

	#values = {};
	get values() {
		return this.#values;
	}

	constructor(processorName, bundler) {
		super();
		this.#processorName = processorName;
		this.#bundler = bundler;

		super.setup(new Map([['bundler-settings', { child: bundler.settings }]]));
	}

	_process() {
		const { settings } = this.#bundler;
		let values = settings[this.#processorName];
		values = values || {};

		const changed = !equal(values, this.#values);
		if (!changed) return false;
		this.#values = values;
	}
};
