const List = require('./list');

module.exports = class {
	#errors = new List('error');
	get errors() {
		return this.#errors;
	}

	#warnings = new List('warning');
	get warnings() {
		return this.#warnings;
	}
};
