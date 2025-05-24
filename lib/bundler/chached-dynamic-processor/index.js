const DynamicProcessor = require('@beyond-js/dynamic-processor')();

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'cached-processing-unit';
	}

	#cache;

	#processor;
	get processor() {
		return this.#processor;
	}

	#hash;
	get hash() {
		return this.#hash;
	}

	get synchronized() {
		return this.#hash.synchronized;
	}

	get updated() {
		return this.#hash.updated;
	}

	constructor(processor, hash) {
		super();
		this.#processor = processor;
		this.#hash = hash;

		super.setup(new Map([['hash', { child: hash }]]));
	}

	async _begin() {
		const cached = await this.#cache.load();
		cached && this._hydrate(cached);
	}

	async _analyze(request) {
		void request;
		throw new Error('Method must be overridden');
	}

	_finalize() {}

	async _process(request) {
		// const diagnostics = (this.#diagnostics = new Diagnostics());
		// const updated = { files: new Map(), extensions: new Map(), overwrites: new Map() };

		// const { extensions } = this.#processor.sources;
		// extensions.valid
		// 	? await this._analyze(updated, diagnostics, request)
		// 	: extensions.errors.forEach(error => diagnostics.general.push(error));

		// this.files.clear();
		// this.extensions.clear();
		// this.overwrites.clear();
		// updated.files.forEach((value, key) => this.files.set(key, value));
		// updated.extensions.forEach((value, key) => this.extensions.set(key, value));
		// updated.overwrites.forEach((value, key) => this.overwrites.set(key, value));

		// this.#hash.update();

		this._finalize();

		// Save the interfaces into cache
		this.#cache.save().catch(exc => console.log(exc.stack));
	}

	_hydrate(cached) {}

	_serialize() {}
};
