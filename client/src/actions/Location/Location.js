import api from '../../lib/request';
import apiPaths from '../../lib/api';



const location = {

    addLocation: function (data,callback) {
        return dispatch => {
            api.setMethod('POST').sendRequest(apiPaths.addLocation, data, false, function (response) {
                callback(response.data);
            }, dispatch)
        }
    },
    getLocationList: function (callback) {
        return dispatch => {
            api.setMethod('GET').sendRequest(apiPaths.getLocationList, null, false, function (response) {
                dispatch({
                    type: 'getLocationList',
                    error: response.data.error,
                    msg: response.data.msg,
                    data: response.data.data
                });
                callback(response.data);

            }, dispatch)
        }
    },
    deleteLocation: function (id, callback) {
        return dispatch => {
            api.setMethod('DELETE').sendRequest(`${apiPaths.deleteLocation}?id=${id}`, null, false, function (response) {
                callback(response.data);
            }, dispatch)
        }
    },
    getLocationData : function (id, callback) {
        return dispatch => {
            api.setMethod('DELETE').sendRequest(`${apiPaths.deleteLocation}?id=${id}`, null, false, function (response) {
                callback(response.data);
            }, dispatch)
        }
    },

    

}

export default location;

