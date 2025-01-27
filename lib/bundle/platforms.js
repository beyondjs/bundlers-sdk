const { EventEmitter } = require('events');

module.exports = class extends EventEmitter {
	#bundle;
	#distributions = new Map();
	#propagator;

	constructor(bundle) {
		super();
		this.#bundle = bundle;
		this.#propagator = new (require('./propagator'))(this);
	}

	get(distribution, language) {
		language = language ? language : '.';
		const key = `${distribution.key}//${language}`;
		if (this.#distributions.has(key)) return this.#distributions.get(key);

		const { meta } = this.#bundle;
		const distribution = meta.bundle?.distribution ? meta.bundle.distribution : require('./distribution');
		const distribution = new distribution(this.#bundle, distribution, language);
		this.#propagator.subscribe(distribution);
		this.#distributions.set(key, distribution);
		return distribution;
	}

	#destroyed = false;
	get destroyed() {
		return this.#destroyed;
	}

	#clear = () => {
		this.#distributions.forEach(distribution => {
			this.#propagator.unsubscribe(distribution);
			distribution.destroy();
		});
	};

	destroy() {
		if (this.#destroyed) throw new Error('Object already destroyed');
		this.#destroyed = true;
		this.#clear();
	}
};
