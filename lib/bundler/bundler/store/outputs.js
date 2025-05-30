module.exports = class {
	#bundler;
	#db;

	constructor(bundler, db) {
		this.#bundler = bundler;
		this.#db = db;
	}

	/**
	 * Fetches the processor's output data from the store.
	 * If the data is not found, it returns undefined.
	 * If the data is found but cannot be parsed, it deletes the data from the store.
	 * @param {string} name - The name of the processor.
	 * @param {string} output - The output (can be 'css', 'types', 'ims').
	 * @returns
	 */
	async fetch(name, output) {
		let row;
		try {
			const select = 'SELECT * FROM processor_outputs WHERE bundler_id=? AND processor_name=? AND output=?';
			row = await this.#db.get(select, [this.#bundler.id, name, output]);
			if (!row) return;
		} catch (exc) {
			const error = `Error fetching output data from store: ${exc.stack}`;
			console.log(error);
			return { error };
		}

		try {
			return JSON.parse(row.data);
		} catch (exc) {
			const error = `Error parsing output data from store: ${exc.stack}`;
			console.log(error);
			// If the data cannot be parsed, delete it from the store
			await this.delete(name);
		}
	}

	/**
	 * Stores processor's output data in the store.
	 * @param {string} name - The name of the processor.
	 * @param {string} output - The output.
	 * @returns
	 */
	async store(name, output) {
		try {
			const data = JSON.stringify(this.#bundler);
			await this.#db.run(
				'INSERT OR REPLACE INTO processor_outputs(bundler_id, processor_name, output, data) VALUES(?, ?, ?)',
				[this.#bundler.id, name, output, data]
			);
		} catch (exc) {
			// If the data cannot be stored, log the error
			// and return an error object
			const error = `Error saving bundler data into store: ${exc.stack}`;
			console.log(error);
			return { error };
		}
	}

	/**
	 * Deletes the processor's output data from the store.
	 * @param {string} name - The name of the processor.
	 * @param {string} output - The output.
	 */
	async delete(name, output) {
		try {
			const sentence = 'DELETE FROM processor_outputs WHERE bundler_id=? AND processor_name=? AND output=?';
			await this.#db.run(sentence, [this.#bundler.id, name, output]);
		} catch (exc) {
			// If the data cannot be deleted, log the error
			// and return an error object
			const error = `Error deleting output data from store: ${exc.stack}`;
			console.log(error);
			return { error };
		}
	}
};
