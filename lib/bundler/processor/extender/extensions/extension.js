const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'processor.extender.extension';
	}

	#extending;
	get extending() {
		return this.#extending;
	}

	#preprocessor;
	get preprocessor() {
		return this.#preprocessor;
	}

	constructor(extending, preprocessor) {
		super();
		this.#extending = extending;
		this.#preprocessor = preprocessor;

		super.setup(new Map([['preprocessor', { child: preprocessor }]]));
	}

	_process() {
		const preprocessor = this.#preprocessor;

		const changed =
			this.size !== preprocessor.size ||
			![...this.values()].every(([key, extension]) => {
				if (!preprocessor.has(key)) return false;

				const item = preprocessor.get(key);
				if (!item.extensions.has(this.#extending)) return false;

				return extension.hash === item.extensions.get(key).hash;
			});
		if (!changed) return false;

		this.clear();
		preprocessor.forEach((value, key) => this.set(key, value));
	}
};
