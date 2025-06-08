const Output = require('@beyond-js/bundlers-sdk/conditional/output');
const InternalModules = require('./ims');

module.exports = class extends Output {
	get dp() {
		return 'bundler.output.esm';
	}

	#ims;

	constructor(...args) {
		super(...args);
		this.#ims = new InternalModules(this.conditional.processors);
		super.setup(new Map([['ims', { child: this.#ims }]]));
	}

	_process() {
		const { specifier } = this.conditional.module;
		const { platform } = this.conditional;

		console.log(`Processing conditional "${platform}" of "${specifier}" module, output: "esm"`);
		console.log([...this.#ims.keys()].join(', '));
	}
};
