const SourcesInputs = require('./inputs');
const SourcesFiles = require('./files');
const SourcesHashes = require('./hashes');

module.exports = class {
	#processor;
	get processor() {
		return this.#processor;
	}

	#inputs;
	get inputs() {
		return this.#inputs;
	}

	#files;
	get files() {
		return this.#files;
	}

	#hashes;
	get hashes() {
		return this.#hashes;
	}

	constructor(processor, strategy) {
		this.#processor = processor;

		const Inputs = strategy.inputs && (strategy.inputs.Inputs || SourcesInputs);
		this.#inputs = Inputs && new Inputs(processor, strategy.inputs);

		const Files = strategy.files && SourcesFiles;
		this.#files = Files && new SourcesFiles(processor, strategy.files);

		const Hashes = strategy.Hashes || SourcesHashes;
		this.#hashes = new Hashes(this);
	}

	destroy() {
		this.#inputs.destroy();
		this.#files?.destroy();
		this.#hashes.destroy();
	}
};
