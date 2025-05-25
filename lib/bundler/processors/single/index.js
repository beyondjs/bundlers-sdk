const BundlerProcessors = require('@beyond-js/bundlers-sdk/bundler/processors');

module.exports = class extends BundlerProcessors {
	get dp() {
		return 'bundler.processors.single';
	}

	constructor(conditional, settings) {
		if (typeof settings !== 'object') {
			throw new Error(`Invalid settings on module "${conditional.module.specifier}". An object is expected`);
		}

		super(conditional);
		super.setup(
			new Map([
				// Derived from the module specs: specified in the module.json file
				['conditional-specs', { child: conditional.specs }]
			])
		);
	}

	_process() {
		const specs = this.conditional.specs.source.values;

		/**
		 * All the properties that are not reserved for the module specification
		 * are considered the specs of the 'ts' processor
		 */
		const reserved = ['platforms'];
		const processor = {};
		for (const [key, value] of Object.entries(specs)) {
			if (reserved.includes(key)) continue;
			processor[key] = value;
		}

		const processors = new Map(),
			errors = [],
			warnings = [];

		for (const [name, config] of Object.entries(specs.processors || {})) {
			const found = settings.processors[name];
			if (typeof found !== 'object') {
				errors.push(`Processor "${name}" not found in the bundler settings`);
				continue;
			}

			const { specifier } = found;
			if (typeof specifier !== 'string' || !specifier) {
				errors.push(`Processor "${name}" does not have a valid specifier`);
				continue;
			}
		}
	}
};
