process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Add Location', function () {
    it(`should return location list on /api/location/${process.env.id} GET`, function (done) {
        chai.request(server)
            .post(`/api/location/add`)
            .send({"location":"Gurgaon","addressLine1":"D-69","suiteNo":"Near Radha Krishna Mandir","addressLine2":"Near Radha Krishna Mandir","city":"Pandav Nagar, New Delhi","state":"","zipCode":"110092","phoneNo":"(088) 089 - 7426","timeZone":"","facility":"","pool":""})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('Location Listing API', function () {
    it('should return location list on /api/location/list GET', function (done) {
        chai.request(server)
            .get('/api/location/list')
            .end(function (err, res) {
                process.env.id = res.body && res.body.data && res.body.data.items && res.body.data.items.length ? res.body.data.items[0]._id : ""
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
            });
    });
});

describe('Get Location By Id', function () {
    it(`should return location list on /api/location/${process.env.id} GET`, function (done) {
        chai.request(server)
            .get(`/api/location/${process.env.id}`)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('Delete Location', function () {
    it(`should return location list on /api/location/${process.env.id} GET`, function (done) {
        chai.request(server)
            .delete(`/api/location/delete?id=${process.env.id}`)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});


