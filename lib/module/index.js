const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');
const Conditionals = require('./conditionals');

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
	 * Bundle settings as they are defined in the package.json file
	 */
	#settings;
	get settings() {
		return this.#settings;
	}

	/**
	 * Bundle specs as they are defined in the module.json file
	 */
	#specs;
	get specs() {
		return this.#specs;
	}

	get id() {
		return this.#specs.values?.id;
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

	#subpath;
	get subpath() {
		return this.#subpath;
	}

	#values;
	get values() {
		return this.#values;
	}

	get description() {
		return this.#specs.values?.description;
	}

	get specifier() {
		const subpath = this.#subpath === '.' ? '' : `/${this.#subpath}`;
		return `${this.#package.name}${subpath}`;
	}

	get vspecifier() {
		const subpath = this.#subpath === '.' ? '' : `/${this.#subpath}`;
		return `${this.#package.name}@${this.#package.version}${subpath}`;
	}

	#language;
	get language() {
		return this.#language;
	}

	#conditionals;
	get conditionals() {
		return this.#conditionals;
	}

	_specs(values) {
		return { values };
	}

	_conditional({ key }) {
		void key;
		throw new Error(`Private method '_conditional' must be overriden`);
	}

	_conditionals() {
		return ['default'];
	}

	constructor({ package: pkg, path, settings, specs, language }) {
		super();
		this.#package = pkg;
		this.#path = path;
		this.#settings = settings;
		this.#specs = specs;
		this.#language = language;

		this.#specs = specs;
		this.#conditionals = new Conditionals(this);

		super.setup(new Map([['specs', { child: specs }]]));
	}

	_process() {
		const done = function ({ errors, warnings, values }) {
			errors = errors ? errors : [];
			warnings = warnings ? warnings : [];

			const previous = { errors: this.#errors, warnings: this.#warnings, values: this.#values };
			const changed = !equal(previous, { errors, warnings, values });
			if (!changed) return false;

			this.#errors = errors;
			this.#warnings = warnings;
			this.#values = values;
		};

		if (!this.#specs.valid) return { errors: this.#specs.errors, warnings: this.#specs.warnings };

		if (typeof this.#specs.values !== 'object') {
			const errors = ['Invalid specs configuration, an object is expected'];
			return done({ errors });
		}

		let { subpath } = this.#specs.values;
		subpath = typeof subpath === 'string' ? subpath : this.#package.name;

		const { errors, warnings, values } = this._specs(this.#specs.values);
		return done({ errors, warnings, values });
	}
};
