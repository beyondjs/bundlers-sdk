module.exports = class {
	#listeners = new Map();

	constructor(emitter) {
		const events = [
			'distribution.change',
			'dependencies.change',
			'dependency.change',
			'js.change',
			'css.change',
			'hash.change',
		];
		events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
	}

	subscribe(distribution) {
		const listeners = this.#listeners;
		distribution.on('change', listeners.get('distribution.change'));
		distribution.dependencies.on('change', listeners.get('dependencies.change'));
		distribution.dependencies.on('dependency.change', listeners.get('dependency.change'));
		distribution.js?.on('change', listeners.get('js.change'));
		distribution.css?.on('change', listeners.get('css.change'));
		distribution.hash.on('change', listeners.get('hash.change'));
	}

	unsubscribe(distribution) {
		const listeners = this.#listeners;
		distribution.off('change', listeners.get('distribution.change'));
		distribution.dependencies.off('change', listeners.get('dependencies.change'));
		distribution.dependencies.off('dependency.change', listeners.get('dependency.change'));
		distribution.js?.off('change', listeners.get('js.change'));
		distribution.css?.off('change', listeners.get('css.change'));
		distribution.hash.off('change', listeners.get('hash.change'));
	}
};
