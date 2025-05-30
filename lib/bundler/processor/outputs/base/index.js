const DynamicProcessor = require('@beyond-js/dynamic-processor');

module.exports = Parent =>
	class ProcessorOutputs extends DynamicProcessor(Parent) {
		#processor;
		get processor() {
			return this.#processor;
		}

		#hash;
		get hash() {
			return this.#hash;
		}

		get updated() {
			return this.#processor.sources.hash.value === this.#hash;
		}

		constructor(processor) {
			if (!processor.sources) {
				throw new Error('The processor must have sources');
			}

			super();
			this.#processor = processor;

			super.setup(new Map([['sources', { child: processor.sources.hash }]]));
		}

		async _begin() {
			const { cache } = this.#processor.bundler.cache;

			const cached = await cache.processors.load();
			cached && this.hydrate(cached);
		}

		async _build(request) {
			void request;
			throw new Error(`Method '._build' must be overridden`);
		}

		async _process(request) {
			void request;
			if (this.updated) return false;

			await this._build(request);
			if (request !== this._request) return;

			this.#hash = this.#processor.sources.hash.value;
		}

		hydrate(cached) {
			this.#hash = cached.hash;
		}

		serialize() {
			return { hash: this.#hash };
		}
	};
