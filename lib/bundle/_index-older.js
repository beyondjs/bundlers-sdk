const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'bundler.bundle';
	}

	#module;
	get module() {
		return this.#module;
	}

	#settings;
	get settings() {
		return this.#settings;
	}

	/**
	 * @deprecated Use property .module instead of container
	 */
	get container() {
		return this.#module;
	}

	get version() {
		return this.#module.version;
	}

	get application() {
		return this.#module.application;
	}

	get watcher() {
		return this.#module.watcher;
	}

	// The PLM id
	get id() {
		return `${this.#module.id}//${this.#type}`;
	}

	#path;
	get path() {
		return this.#path;
	}

	#platforms;
	get platforms() {
		return this.#platforms;
	}

	/**
	 * Stores the processed attributes of the bundle
	 */
	#config;
	get config() {
		return this.#config;
	}

	// The name of the bundle type (ex: 'ts', 'sass', etc.)
	#type;
	get type() {
		return this.#type;
	}

	/**
	 * The name of the bundle specified in the module.json
	 * If the bundle name is not specified, then the bundle type (ex: 'ts', 'sass', etc) is taken by default
	 * @return {string}
	 */
	get name() {
		return this.#config?.name;
	}

	// The name of the bundle specified in the module.json
	get platforms() {
		return this.#config?.platforms;
	}

	/**
	 * The path of the resource relative to the package, used as the exported value in the package.json
	 * @return {string}
	 */
	get subpath() {
		return this.#config?.subpath;
	}

	get specifier() {
		return this.#config?.specifier;
	}

	get vspecifier() {
		return this.#config?.vspecifier;
	}

	resource(distribution) {
		const resource = this.module.resource(distribution);
		return resource + (this.module.bundles.size === 1 ? '' : `.${this.name}`);
	}

	pathname(distribution) {
		const pathname = this.module.pathname(distribution);
		return pathname + (this.module.bundles.size === 1 ? '' : `.${this.name}`);
	}

	get multilanguage() {
		return !!this.#config?.multilanguage;
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
		return this.#warnings;
	}

	get imports() {
		throw new Error('This property is deprecated and not currently supported');
	}

	/**
	 * This method can be overridden
	 * @param config {object} The bundle configuration
	 * @return {{value?: object, errors?: string[], warnings?: string[]}}
	 */
	processConfig(config) {
		return typeof config !== 'object' ? { errors: ['Invalid configuration'] } : { value: config };
	}

	/**
	 * Bundler constructor
	 *
	 * @param module {object} The application module that contains the bundle
	 * @param type {string} The bundle's type ('ts', 'sass', etc)
	 * @param config {object} The bundle's configuration
	 */
	constructor(module, type, config) {
		if (!module || !type) throw new Error('Invalid parameters');
		if (!module.application.bundlers.has(type)) {
			throw new Error(`Bundle "${type}" is not registered`);
		}

		super();
		const { meta, settings } = module.application.bundlers.get(type);
		this.#meta = meta;
		this.#settings = settings;
		this.#module = module;
		this.#type = type;
		this.#platforms = new (require('./platforms'))(this);

		super.setup(
			new Map([
				['module', { child: module }],
				['config', { child: config }],
			])
		);
	}

	_process() {
		const module = this.children.get('module').child;
		const config = this.children.get('config').child;

		const done = ({ errors, warnings, value }) => {
			value = value ? value : {};
			const name = (value.name = typeof value.name === 'string' ? value.name : this.#type);
			value.subpath = module.subpath + (module.bundles.size === 1 ? '' : `.${name}`);
			value.specifier = module.specifier + (module.bundles.size === 1 ? '' : `.${name}`);
			value.vspecifier = module.vspecifier + (module.bundles.size === 1 ? '' : `.${name}`);

			value.platforms = (() => {
				let {
					platforms: { all },
				} = global;
				let platforms = config.value.platforms ? config.value.platforms : all;
				platforms = typeof platforms === 'string' ? [platforms] : platforms;
				platforms = platforms instanceof Array ? platforms : all;
				platforms = platforms.includes('*') ? all : platforms;

				// Remove the platforms that are not included in the module
				platforms = platforms.filter(platform => module.platforms.has(platform));

				return new Set(platforms);
			})();

			if (equal(this.#errors, errors) && equal(this.#warnings, warnings) && equal(this.#config, value)) {
				return false;
			}

			this.#errors = errors ? errors : [];
			this.#warnings = warnings ? warnings : [];
			this.#config = value;
		};

		this.#path = config.path;
		if (!config.valid || !config.value) {
			const { errors, warnings } = config;
			return done({ errors, warnings });
		}

		this.#errors = [];
		const processed = this.processConfig(config.value);
		if (typeof processed !== 'object') throw new Error('Invalid configuration');

		let { errors, warnings, value } = processed;
		warnings = warnings ? warnings : [];
		warnings = warnings.concat(config.warnings ? config.warnings : []);
		if (errors?.length) return done({ errors, warnings });

		return done({ warnings, value });
	}

	destroy() {
		super.destroy();
		this.#platforms.destroy();
	}
};
