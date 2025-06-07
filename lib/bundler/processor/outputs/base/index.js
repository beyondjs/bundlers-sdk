const DynamicProcessor = require('@beyond-js/dynamic-processor');
const Items = require('../items');

module.exports = Parent =>
	class ProcessorOutputs extends DynamicProcessor(Parent) {
		get dp() {
			return 'processor.outputs.base';
		}

		#processor;
		get processor() {
			return this.#processor;
		}

		/**
		 * The output type of the processor.
		 * @type {['ims', 'types', 'css']}
		 */
		#output;
		get output() {
			return this.#output;
		}

		#hash;
		get hash() {
			return this.#hash;
		}

		get updated() {
			return this.#processor.sources.hash.value === this.#hash;
		}

		constructor(processor, output) {
			if (!processor.sources) {
				throw new Error('The processor must have sources');
			}

			super();
			this.#processor = processor;
			this.#output = output;

			super.setup(new Map([['sources', { child: processor.sources.hash }]]));
		}

		async _begin() {
			const { store } = this.#processor.conditional;
			const cached = await store.outputs.fetch(this.#processor.name, this.#output);
			cached && this.hydrate(cached);
		}

		async _build(request, items) {
			void request, items;
			throw new Error(`Method '._build' must be overridden`);
		}

		async _process(request) {
			void request;
			if (this.updated) return false;

			const items = new Items();
			await this._build(request, items);
			if (request !== this._request) return;

			this.#hash = this.#processor.sources.hash.value;
		}

		hydrate(cached) {
			this.#hash = cached.hash;
		}

		serialize(json) {
			json = json || {};
			return Object.assign({ hash: this.#hash }, json);
		}
	};
