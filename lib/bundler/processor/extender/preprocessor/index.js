const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);
const Hashes = require('./hashes');
const Item = require('./item');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'processor.extender.preprocessor';
	}

	#extensions;
	get extensions() {
		return this.#extensions;
	}

	#errors = [];
	get errors() {
		return this.#errors;
	}

	#warnings = [];
	get warnings() {
		return this.#warnings;
	}

	get valid() {
		return !this.#errors?.length;
	}

	#processor;
	get processor() {
		return this.#processor;
	}

	#hashes;
	get hashes() {
		return this.#hashes;
	}

	constructor(processor, extensions) {
		super();
		this.#processor = processor;
		this.#extensions = extensions;
		this.#hashes = new Hashes(this);

		super.setup(new Map([['files', { child: processor.sources.files }]]));
	}

	_prepared(require) {
		this.#processor.sources.files.forEach(file => require(file));
	}

	async _preprocess(file) {
		void file;
		throw new Error(`Method '._preprocess' must be overridden`);
	}

	async _process(request) {
		const { sources } = this.processor;
		const updated = new Map();

		for (const file of sources.files) {
			let item = this.has(file.relative.file) && this.get(file.relative.file);
			if (item?.hash === file.hash) {
				updated.set(file.relative.file, item);
				continue;
			}

			item = new Item(file, this.#extensions);
			await this._preprocess(item);
			if (this._request !== request) return;
		}

		const changed =
			this.size !== updated.size ||
			![...this.keys()].every(key => updated.has(key) && updated.get(key).hash === this.get(key).hash);

		this.clear();
		updated.forEach((value, key) => this.set(key, value));
		return changed;
	}

	serialize() {
		return {
			errors: this.#errors,
			warnings: this.#warnings,
			hashes: this.#hashes.serialize()
		};
	}

	hydrate(cached) {
		this.#errors = cached.errors ? cached.errors : [];
		this.#warnings = cached.warnings ? cached.warnings : [];
		this.#hashes.hydrate(cached.hashes);
	}
};
