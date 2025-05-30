const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const crc32 = require('@beyond-js/crc32');
const Conditionals = require('./conditionals');
const ModuleSpecs = require('./specs');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.module';
	}

	#package;
	get package() {
		return this.#package;
	}

	#path;
	get path() {
		return this.#path;
	}

	/**
	 * Bundler
	 * .path {string} The path where the bundler was located when required
	 * .settings {object} as they are defined in the package.json file
	 */
	#bundler;
	get bundler() {
		return this.#bundler;
	}

	#specs;
	get specs() {
		return this.#specs;
	}

	#id;
	get id() {
		return this.#id;
	}

	#language;
	get language() {
		return this.#language;
	}

	get errors() {
		return this.#specs.errors;
	}

	get warnings() {
		return this.#specs.warnings;
	}

	get valid() {
		return !this.#specs.valid;
	}

	get subpath() {
		return this.#specs.subpath;
	}

	get description() {
		return this.#specs.description;
	}

	get specifier() {
		if (!this.valid) return;

		const subpath = this.subpath === '.' ? '' : `/${this.subpath}`;
		return `${this.#package.name}${subpath}`;
	}

	get vspecifier() {
		if (!this.valid) return;

		const subpath = this.subpath === '.' ? '' : `/${this.subpath}`;
		return `${this.#package.name}@${this.#package.version}${subpath}`;
	}

	#conditionals;
	get conditionals() {
		return this.#conditionals;
	}

	/**
	 * This method can be overriden to provide the specs values required for the processing of the conditionals
	 *
	 * @param {object} values
	 * @returns {object}
	 * @private
	 */
	_specs(values) {
		// The module should return only the specs values it will require for the processing of the conditionals
		// Take into account that a change in the specs values will invalidate the conditionals
		void values;
		return { values: {} };
	}

	_processors() {
		throw new Error(`Private method '_processors' must be overriden`);
	}

	_conditional({ key }) {
		void key;
		throw new Error(`Private method '_conditional' must be overriden`);
	}

	_conditionals() {
		return ['default'];
	}

	constructor({ package: pkg, path, bundler, specs, language }) {
		super();
		this.#package = pkg;
		this.#id = crc32(`${path.dirname}//${bundler.name}` + (language ? `//${language}` : ''));

		this.#path = { dirname: path.dirname, relative: path.relative };
		this.#bundler = bundler;
		this.#specs = new ModuleSpecs(this, specs);
		this.#language = language;

		this.#conditionals = new Conditionals(this);

		super.setup(new Map([['module-specs', { child: this.#specs }]]));
	}

	destroy() {
		this.#specs.destroy();
		this.#conditionals.destroy();
	}
};
