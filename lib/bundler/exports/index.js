const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const Export = require('./export');
const Propagator = require('./propagator');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.exports';
	}

	#bundler;
	#propagator;

	constructor(bundler) {
		super();
		this.#bundler = bundler;
		this.#propagator = new Propagator(this);

		super.setup(new Map([['specs', { child: bundler.specs }]]));
	}

	_process() {
		console.log('module exports specs', this.#bundler.specs.values);
	}

	#clear = () => {
		this.forEach(exp => {
			this.#propagator.unsubscribe(exp);
			exp.destroy();
		});
	};

	destroy() {
		super.destroy();
		this.#clear();
	}
};
