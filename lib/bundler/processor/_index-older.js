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

	#hashes;
	get hashes() {
		return this.#hashes;
	}

	#analyzer;
	get analyzer() {
		return this.#analyzer;
	}

	#multilanguage;
	get multilanguage() {
		return this.#multilanguage;
	}

	set multilanguage(value) {
		if (this.#multilanguage === value) return;
		this.#multilanguage = value;
	}

	#errors = [];
	get errors() {
		return this.#errors;
	}

	get valid() {
		return !this.#errors.length;
	}

	#warnings = [];
	get warnings() {
		return this.#warnings ? this.#warnings : [];
	}

	#packager;
	get packager() {
		return this.#packager;
	}

	#extender;
	get extender() {
		return this.#extender;
	}

	constructor(processor) {
		this.#processor = processor;

		const { name, strategy } = this.#processor;

		this.#name = name;
		this.#specs = specs;
		this.#sources = new Sources(this);

		let Packager = meta.packager?.Packager;
		Packager = meta.packager && !Packager ? require('../packager') : Packager;
		this.#packager = Packager && new Packager(this);

		this.#packager?.setup();
	}

	configure(config, multilanguage) {
		const { path, errors, warnings, sources, code } = require('./config')(config, this.#meta);
		this.#path = require('path').join(this.#specs.bundle.path, path ? path : '');
		this.#errors = errors;
		this.#warnings = warnings;

		if (errors.length) {
			this.#sources.configure();
			return;
		}

		this.#sources.configure(this.#path, sources);

		multilanguage = !!multilanguage;
		this.#packager?.configure({ multilanguage, code });
	}
};
