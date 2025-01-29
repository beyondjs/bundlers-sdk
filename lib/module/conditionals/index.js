const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const Bundler = require('@beyond-js/bundlers-sdk/bundler');
const Propagator = require('./propagator');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.conditionals';
	}

	#module;
	#propagator;

	constructor(module) {
		super();
		this.#module = module;
		this.#propagator = new Propagator(this);

		super.setup(new Map([['specs', { child: module.specs }]]));
	}

	_process() {
		const specs = this.#module.specs.values;
		specs.platforms = typeof specs.platforms === 'string' ? [specs.platforms] : specs.platforms;
		specs.platforms = specs.platforms?.filter(platform => platform && typeof platform === 'string');
		const platforms = specs.platforms instanceof Array ? specs.platforms : ['default'];

		const updated = new Map();
		platforms.forEach(platform => {
			const conditional = this.has(platform) ? this.get(platform) : new Bundler(this.#module, { platform });
			updated.set(platform, conditional);
		});
	}

	#clear = () => {
		this.forEach(conditional => {
			this.#propagator.unsubscribe(conditional);
			conditional.destroy();
		});
	};

	destroy() {
		super.destroy();
		this.#clear();
	}
};
