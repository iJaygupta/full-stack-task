import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import actions from "../../actions/index"
import './AddLocation.css';



class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthModal: false,
            showHideClassname: this.props.show ? " display-block" : " display-none",
            location: "",
            addressLine1: "",
            suiteNo: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNo: "",
            timeZone: "",
            facility: "",
            pool: "",
        }
    }

    updateState = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    validateData = (callback) => {
        callback();
    }

    saveLocation = () => {
        this.validateData(() => {
            //    console.log("Location Data  ", this.state)
            let data = {
                "location": this.state.location,
                "addressLine1": this.state.addressLine1,
                "suiteNo": this.state.suiteNo,
                "addressLine2": this.state.addressLine2,
                "city": this.state.city,
                "state": this.state.state,
                "zipCode": this.state.zipCode,
                "phoneNo": this.state.phoneNo,
                "timeZone": this.state.timeZone,
                "facility": this.state.facility,
                "pool": this.state.pool,
            }
            this.props.locationAction.addLocation(data, (response) => {
                this.props.getLocationListing()
            })
        })
    }

    getLocationData = (id) => {
        
        this.props.locationAction.getLocationData(id, (response) => {
        })
     
    }

    componentDidMount() {
        if (this.props.locationId) {
            console.log("this.props.locationId", this.props.locationId)
        }
    }

    render() {
        // console.log("Add Location Props", this.props);
        return (
            <div className={this.state.showHideClassname}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><h3><b style={{ "font-size": "16px" }}>Add Location</b></h3></h5>

                            <form>
                                <div class="form-group">
                                    <label for="location">Location</label>
                                    <input name="location" type="text" class="form-control" id="location" value={this.state.location} onChange={this.updateState} />
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="addressLine1">Address Line 1</label>
                                        <input name="addressLine1" type="text" class="form-control" id="addressLine1" value={this.state.addressLine1} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="suiteNo">Suite No</label>
                                        <input name="suiteNo" type="text" class="form-control" id="suiteNo" value={this.state.suiteNo} onChange={this.updateState} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="addressLine2">Address Line 2</label>
                                        <input name="addressLine2" type="text" class="form-control" id="addressLine2" value={this.state.addressLine2} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="city">City</label>
                                        <input name="city" type="text" class="form-control" id="city" value={this.state.city} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="state">State</label>
                                        <input name="state" type="text" class="form-control" id="state" value={this.state.state} onChange={this.updateState} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="zipCode">Zip Code</label>
                                        <input name="zipCode" type="text" class="form-control" id="zipCode" value={this.state.zipCode} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="phoneNo">Phone Number</label>
                                        <input name="phoneNo" type="text" class="form-control" id="phoneNo" value={this.state.phoneNo} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="timeZone">Time Zone</label>
                                        <input name="timeZone" type="text" class="form-control" id="timeZone" value={this.state.timeZone} onChange={this.updateState} />
                                    </div>

                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="facility">Facility Times</label>
                                        <input name="facility" type="text" class="form-control" id="facility" value={this.state.facility} onChange={this.updateState} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="pool">Appointment Pool</label>
                                        <input name="pool" type="text" class="form-control" id="pool" value={this.state.pool} onChange={this.updateState} />
                                    </div>
                                </div>
                            </form>
                            <div className="row text-center m-3">
                                <div className="col-6" style={{ "text-align-last": "right" }}><button onClick={this.props.handleClose} className="btn btn-danger border active px-4 py-3">Cancel</button> </div>
                                <div className="col-6" style={{ "text-align-last": "left" }}><button onClick={this.saveLocation} className="btn btn-primary border px-4 py-3 ">Save</button></div>
                            </div>

                            {/* <p className="card-text text-center" style="font-size: 12px">By loggi ngin, you agree to MyWeb <a href="#" className="card-link">Terms of Service. Cookie Policy.<br />Privacy Policy</a> and <a href="#" className="card-link m-0">Content Policies</a></p> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {

    return {
        // userInfo: state.authData.userInfo,
        // token: state.authData.token

    }
}

function mapDispatchToProps(dispatch) {

    return {
        locationAction: bindActionCreators(actions.location, dispatch),
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal))
// export default Modal;