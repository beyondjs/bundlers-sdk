const Conditionals = require('./conditionals');

module.exports = class {
	#package;
	get package() {
		return this.#package;
	}

	#path;
	get path() {
		return this.#path;
	}

	#settings;
	get settings() {
		return this.#settings;
	}

	#specs;
	get specs() {
		return this.#specs;
	}

	get id() {
		return this.#specs.values?.id;
	}

	get subpath() {
		return this.#specs.values?.subpath;
	}

	get description() {
		return this.#specs.values?.description;
	}

	#language;
	get language() {
		return this.#language;
	}

	#conditionals;
	get conditionals() {
		return this.#conditionals;
	}

	constructor({ package: pkg, path, settings, specs, language }) {
		this.#package = pkg;
		this.#path = path;
		this.#settings = settings;
		this.#specs = specs;
		this.#language = language;

		this.#conditionals = new Conditionals(this);
	}
};
