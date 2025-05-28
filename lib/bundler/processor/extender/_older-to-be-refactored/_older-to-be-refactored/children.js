/**
 * The children of the preprocessor are not disposed at startup, since data can be loaded from cache
 */
module.exports = class {
	#preprocessor;
	get preprocessor() {
		return this.#preprocessor;
	}

	#disposed = false;

	constructor(preprocessor) {
		this.#preprocessor = preprocessor;
	}

	/**
	 * When the processor is updated, the data is taken from the cache, otherwise the children must be set.
	 * This method can be overridden.
	 *
	 * @param children? {Map<string, object>} Used by the overridden method to set extra children
	 */
	dispose(children) {
		if (this.#disposed) return;
		this.#disposed = true;

		const { processor } = this.#preprocessor;
		const { analyzer, sources } = processor;

		children = children ? children : new Map();

		// If children of the preprocessor can be the analyzer, if it exists, or the processor sources
		if (analyzer) {
			children.set('analyzer', { child: analyzer });
		} else {
			const { files, overwrites } = sources;
			children.set('files', { child: files });
			overwrites && children.set('overwrites', { child: overwrites });
		}

		this.#preprocessor.children.register(children);
	}
};
