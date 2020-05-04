const sendResponse = require("../utils/apiResponse").sendResponse;
const Location = require("../models/location");
const resPerPage = process.env.RESULTS_PER_PAGE || 10;


/**
 * Get List of Internet Service Provider.
 *
 * @param {string}      page
 * @param {string}      pagination
 * @param {string}      searchKeyword 
 * @param {string}      orderBy
 * @param {string}      sortBy
 * @param {string}      limit
 * @param {string}      skip
 *
 * @returns {Object}
 */


exports.listLocations = (request, response) => {

    let page = parseInt(request.query.page) || 1;
    let sortBy, orderBy, limit, skip, searchKeyword;

    if (!(request.query.pagination && request.query.page)) {
        sortBy = request.query.sortBy;
        orderBy = request.query.orderBy;
        limit = parseInt(request.query.limit) || resPerPage;
        skip = parseInt(request.query.skip) || 0;
        searchKeyword = request.query.searchKeyword || "";
    } else {
        limit = resPerPage;
        skip = (page - 1) * resPerPage
    }

    Location.getModel().find({})
        .then(data => {
            sendResponse(response, false, 200, 2000, data);
        })
        .catch(error => {
            sendResponse(response, true, 500, 4001, error);
        })
};



/**
 * Add Location.
 *
 * @param {string}      page
 * @param {string}      pagination
 * @param {string}      searchKeyword 
 * @param {string}      orderBy
 * @param {string}      sortBy
 * @param {string}      limit
 * @param {string}      skip
 *
 * @returns {Object}
 */

exports.addLocation = (request, response) => {

    Location.getModel().insertMany(request.body)
        .then(data => {
            sendResponse(response, false, 200, 2001, data);
        })
        .catch(error => {
            sendResponse(response, true, 500, 4001, error);
        })
};

/**
 *   Update Location.
 *
 * @param {string}      page
 * @param {string}      pagination
 * @param {string}      searchKeyword 
 * @param {string}      orderBy
 * @param {string}      sortBy
 * @param {string}      limit
 * @param {string}      skip
 *
 * @returns {Object}
 */

exports.updateLocation = (request, response) => {

    Location.getModel().updateMany(
        { _id: request.query.id },
        { $set: request.body }
    ).then((result) => {
        sendResponse(response, false, 200, 2002, result);
    }).catch((error) => {
        sendResponse(response, true, 500, 4001, error);
    })
};


/**
 * Delete Location.
 *
 * @param {string}      page
 * @param {string}      pagination
 * @param {string}      searchKeyword 
 * @param {string}      orderBy
 * @param {string}      sortBy
 * @param {string}      limit
 * @param {string}      skip
 *
 * @returns {Object}
 */

exports.deleteLocation = (request, response) => {

    Location.getModel().deleteMany({ "_id": request.query.id })
        .then((result) => {
            sendResponse(response, false, 200, 2003, result);
        })
        .catch((error) => {
            console.log(error)
            sendResponse(response, true, 500, 4001, error);
        })
};

