module.exports = class {
	#processor;

	get sources() {
		return this.#processor.sources.hashes.files;
	}

	#processed;
	get processed() {
		return this.#processed;
	}

	get updated() {
		return this.sources === this.#processed;
	}

	constructor(processor) {
		this.#processor = processor;
	}
};
