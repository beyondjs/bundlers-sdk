module.exports = class {
	#code;
	get code() {
		return this.#code;
	}

	#map;
	get map() {
		return this.#map;
	}

	#hash;
	get hash() {
		if (this.#hash !== void 0) return this.#hash;

		if (!this.#code) return (this.#hash = 0);

		this.#hash = crc32(`${this.#code}::${this.#map}`);
		return this.#hash;
	}

	set(values) {
		if (typeof values !== 'object') throw new Error('Invalid parameters');

		const { code, map } = values;
		this.#code = code ? code : '';
		this.#map = map ? map : void 0;

		this.#hash = void 0; // Reset hash when code or map changes
	}
};
