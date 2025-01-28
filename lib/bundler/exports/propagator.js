module.exports = class {
	#listeners = new Map();

	constructor(emitter) {
		const events = [
			'export.change',
			'dependencies.change',
			'dependency.change',
			'js.change',
			'css.change',
			'hash.change',
		];
		events.forEach(event => this.#listeners.set(event, (...params) => emitter.emit(event, ...params)));
	}

	subscribe(exp) {
		const listeners = this.#listeners;
		exp.on('change', listeners.get('export.change'));
		exp.dependencies.on('change', listeners.get('dependencies.change'));
		exp.dependencies.on('dependency.change', listeners.get('dependency.change'));
		exp.js?.on('change', listeners.get('js.change'));
		exp.css?.on('change', listeners.get('css.change'));
		exp.hash.on('change', listeners.get('hash.change'));
	}

	unsubscribe(exp) {
		const listeners = this.#listeners;
		exp.off('change', listeners.get('export.change'));
		exp.dependencies.off('change', listeners.get('dependencies.change'));
		exp.dependencies.off('dependency.change', listeners.get('dependency.change'));
		exp.js?.off('change', listeners.get('js.change'));
		exp.css?.off('change', listeners.get('css.change'));
		exp.hash.off('change', listeners.get('hash.change'));
	}
};
