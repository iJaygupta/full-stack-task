/*
* @Description : Common library to send http requests
* @Author : Ritesh
* @Version : 1.0
*/

import axios from 'axios';
import { toast } from 'react-toastify';



const self = {
	method: "GET",
	headers: {
		'Content-Type': 'application/json',
	},
	fingerPrint: '',
	setMethod: function (method) {
		self.method = method;
		return self;
	},
	setHeader: function (key, value) {
		self.headers[key] = value;
		return self;
	},
	reset: function () {
		self.method = "GET";
		self.headers = { "Content-Type": "application/json" };
		return self;
	},
	handleApiError: function () {
		// return auth.signout();
	},
	setFingerPrint: function (fingerPrint) {
		self.fingerPrint = fingerPrint;
		return self;
	},
	sendRequest: function (url, data, authenticate, callback, dispatch) {

		if (self.fingerPrint) {
			self.setHeader('fingerPrint', self.fingerPrint)
		} else {
			// var fingerPrintFromCookies = (typeof Cookies.load('fingerPrint') != 'undefined') ? Cookies.load('fingerPrint') : ''
			let fingerPrintFromCookies = ""
			self.setHeader('fingerPrint', '');
			self.setFingerPrint(fingerPrintFromCookies);
		}
		url = process.env.REACT_APP_API_URL + url
		console.log("self.headers", self.headers);
		return axios({
			method: self.method,
			url: url,
			responseType: 'json',
			headers: self.headers,
			data: data,
			timeout: 120000,
			params: (self.method == "GET") ? data : {}
		})
			.then(function (response) {
				self.reset();

					// if (response.data.error) {
					// 	toast.error(response.data.message, {
					// 		position: toast.POSITION.TOP_RIGHT
					// 	});
					// } else {
					// 	toast.success(response.data.message, {
					// 		position: toast.POSITION.TOP_RIGHT
					// 	});
					// }

				callback(response);
			})
			.catch(function (error) {
				
				console.error("API LIB ERROR : ", error);
			});
	},
	sendExtRequest: function (url, data, callback) {

		return axios({
			method: self.method,
			url: url,
			responseType: 'json',
			headers: self.headers,
			data: data,
			timeout: 120000,
			params: (self.method == "GET") ? data : {}
		})
			.then(function (response) {
				self.reset();

				callback(null, response);
			})
			.catch(function (error) {
				callback(error, null);
			});
	}
}

export default self;