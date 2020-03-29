
var requireOption = require('../common').requireOption;

/**
 * This MW saves the sw
 * - if ok, redirect to /...
 * - if not ok crash
 */
module.exports = function (objectrepository) {

	return function (req, res, next) {
		return next();
	};

};
