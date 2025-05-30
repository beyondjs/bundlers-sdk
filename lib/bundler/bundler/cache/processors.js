module.exports = class {
	#bundler;
	#db;

	constructor(bundler, db) {
		this.#bundler = bundler;
		this.#db = db;
	}

	async load() {
		const { id } = this.#bundler.processor;

		let row;
		try {
			const select = 'SELECT * FROM bundlers WHERE bundler_id=?';
			row = await this.#db.get(select, id);
			if (!row) return;
		} catch (exc) {
			console.log('Error loading bundler data from cache:', exc.stack);
			return;
		}

		try {
			return JSON.parse(row.data);
		} catch (exc) {
			console.log('Error parsing bundler data from cache:', exc.stack);
			await this.delete();
		}
	}

	async save() {
		const { id } = this.#bundler.processor;

		try {
			const data = JSON.stringify(this.#bundler);
			await this.#db.run('INSERT OR REPLACE INTO bundlers(bundler_id, data) VALUES(?, ?)', [id, data]);
		} catch (exc) {
			console.log('Error saving bundler data into cache:', exc.stack);
		}
	}

	async delete() {
		const { id } = this.#bundler.processor;

		try {
			const sentence = 'DELETE FROM bundlers WHERE bundler_id=?';
			await this.#db.run(sentence, id);
		} catch (exc) {
			console.log('Error deleting bundler data from cache:', exc.stack);
		}
	}
};
