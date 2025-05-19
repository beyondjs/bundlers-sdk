/**
 * Process the specs of the files configuration from the processor specification set in the module.json file
 *
 * @param {*} specs
 * @returns
 */
module.exports = function (specs) {
	const warnings = [];

	let path,
		includes,
		excludes,
		other = {};

	if (typeof specs === 'string') {
		includes = [specs];
	} else if (specs instanceof Array) {
		includes = specs;
	} else if (typeof specs === 'object') {
		path = specs.path;
		includes = specs.files;
		includes = typeof includes === 'string' ? [includes] : includes;
		excludes = specs.excludes;

		delete specs.path;
		delete specs.files;
		delete specs.excludes;
		other = specs;
	} else if (specs === void 0) {
		includes = ['*'];
	} else {
		return { errors: ['Invalid configuration'] };
	}

	if (!(includes instanceof Array)) {
		return { errors: ['Files configuration not set'] };
	}

	excludes = excludes ? excludes : [];
	if (!(excludes instanceof Array)) {
		warnings.push(`Excludes configuration is invalid`);
		excludes = [];
	}

	!excludes.includes('module.json') && excludes.push('module.json');
	path = path ? path : '';

	const values = Object.assign({ path, includes, excludes }, other);

	return { warnings: warnings, values };
};
