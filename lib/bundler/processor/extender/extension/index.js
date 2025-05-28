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
	}
};
