const Files = require('./files');
const Hash = require('./hash');

module.exports = class {
	#processor;

	#files;
	get files() {
		return this.#files;
	}

	#options;
	get options() {
		return this.#options;
	}

	#dependencies;
	get dependencies() {
		return this.#dependencies;
	}

	#hash;
	get hash() {
		return this.#hash;
	}

	constructor(processor) {
		this.#processor = processor;

		const { name, strategy } = this.#processor;
		if (!strategy?.files) {
			throw new Error(`Processor "${name}", sources specification is invalid`);
		}

		this.#files = new (strategy.sources.Files ? strategy.Files : Files)(processor, strategy.files);
		this.#dependencies = strategy.Dependencies ? new strategy.Dependencies(this) : void 0;
		this.#hash = new (strategy.sources.Hash ? strategy.Hash : Hash)(processor, strategy.hash);
	}

	destroy() {
		this.#files.destroy();
		this.#options?.destroy();
		this.#dependencies?.destroy();
		this.#hash.destroy();
	}
};
