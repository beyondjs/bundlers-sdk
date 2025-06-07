const DynamicProcessor = require('@beyond-js/dynamic-processor')(Map);

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.conditional.outputs';
	}

	#conditional;
	get conditional() {
		return this.#conditional;
	}

	#key;
	get key() {
		return this.#key;
	}

	constructor(conditional, key) {
		super();
		this.#conditional = conditional;
		this.#key = key;
	}

	_process() {}

	clear() {
		this.forEach(output => output.destroy());
		super.clear();
	}

	destroy() {
		super.destroy();
		this.clear();
	}
};
