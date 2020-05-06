const sendResponse = require("../utils/apiResponse").sendResponse;
const Location = require("../models/location");


/**
 * Get List of Locations.
 *
 * @param {string}      page
 * @param {string}      pagination
 * @param {string}      searchKeyword 
 * @param {string}      limit
 * @param {string}      skip
 *
 * @returns {Object}
 */


exports.listLocations = (request, response) => {

    let page = parseInt(request.query.page) || 1;
    let limit, skip, searchKeyword;
    let resPerPage = parseInt(request.query.resPerPage) || 5;



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
    let countQuery = Location.getModel().count();
    Location.getModel()
        .find({})
        .limit(limit)
        .skip(skip)
        .then(data => {
            countQuery.then((countData) => {
                let result = {
                    "items": data,
                    "totalRecords": countData,
                    "totalResult": data.length,
                    "pagination": !(request.query.pagination && request.query.page) ? false : "",
                    "totalPages": Math.ceil(countData / resPerPage),
                }
                if (request.query.pagination && request.query.page) {
                    result["pagination"] = {
                        "totalRecords": countData,
                        "totalPages": Math.ceil(countData / resPerPage),
                        "currentPage": page,
                        "resPerPage": resPerPage,
                        "hasPrevPage": page > 1,
                        "hasNextPage": page < Math.ceil(countData / resPerPage),
                        "previousPage": page > 1 ? page - 1 : null,
                        "nextPage": page < Math.ceil(countData / resPerPage) ? page + 1 : null
                    }
                } else {
                    if (request.query.limit) {
                        result["limit"] = limit
                    }
                    if (request.query.skip) {
                        result["skip"] = skip
                    }
                }
                sendResponse(response, false, 200, 2000, result);
            })
        })
        .catch(error => {
            sendResponse(response, true, 500, 4001, error);
        })
};



/**
 * Add Location.
 *
 * @param {Object}      payload
 *
 * @returns {Object}
 */

exports.addLocation = (request, response) => {

    Location.getModel().insertMany(request.body)
        .then(data => {
            sendResponse(response, false, 200, 2001);
        })
        .catch(error => {
            sendResponse(response, true, 500, 4001, error);
        })
};

/**
 *   Update Location.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */

exports.updateLocation = (request, response) => {

    Location.getModel().updateMany(
        { _id: request.params.id },
        { $set: request.body }
    ).then((result) => {
        sendResponse(response, false, 200, 2002);
    }).catch((error) => {
        sendResponse(response, true, 500, 4001, error);
    })
};


/**
 * Delete Location.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */

exports.deleteLocation = (request, response) => {

    Location.getModel().deleteMany({ "_id": request.query.id })
        .then((result) => {
            sendResponse(response, false, 200, 2003);
        })
        .catch((error) => {
            sendResponse(response, true, 500, 4001);
        })
};

/**
 * Get Location.
 * 
 * @param {string}      id
 *
 * @returns {Object}
 */

exports.getLocation = (request, response) => {

    Location.getModel().find({ "_id": request.params.id })
        .then((result) => {
            sendResponse(response, false, 200, 2004, result);
        })
        .catch((error) => {
            console.log(error)
            sendResponse(response, true, 500, 4001);
        })
};

