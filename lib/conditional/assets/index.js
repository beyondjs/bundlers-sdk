const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.conditional.asset';
	}

	#conditional;
	#propagator;

	constructor(conditional) {
		super();
		this.#conditional = conditional;
		this.#propagator = new Propagator(this);

		super.setup(new Map([['specs', { child: conditional.specs }]]));
	}

	_process() {
		const assets = this.#conditional._assets();

		const updated = new Map();
		assets.forEach(key => {
			const conditional = this.has(key) ? this.get(key) : this.#conditional._asset({ key });
			updated.set(key, conditional);
		});

		// Destroy unused assets
		this.forEach((conditional, key) => !updated.has(key) && conditional.destroy());

		// @TODO: Propagator subscribe and unsubscribe

		this.#clear();
		updated.forEach((conditional, key) => this.set(key, conditional));
	}

	#clear = () => {
		this.forEach(asset => {
			this.#propagator.unsubscribe(asset);
			asset.destroy();
		});
	};

	destroy() {
		super.destroy();
		this.#clear();
	}
};
