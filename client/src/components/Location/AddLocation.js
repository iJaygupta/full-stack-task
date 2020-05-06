import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import actions from "../../actions/index"
import './AddLocation.css';
import { toast, ToastContainer } from 'react-toastify';




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
            errorParam: {
                location: false,
                city: false,
                state: false,
                zipCode: false,
                phoneNo: false,
                timeZone: false,
            }
        }
    }

    updateState = (e) => {

        const { name, value } = e.target;
        this.setState({ [name]: value.trimLeft() }, () => {
            let data = this.state;
            let errorParam = { ...this.state.errorParam };
            if (name == 'location' && data[name] == "") {
                errorParam[name] = true
            } else if (name == 'location') {
                errorParam[name] = false
            }

            if ((name == 'zipCode' && data[name] != "") && (data[name].length < 5 || !data[name].match(/^[a-zA-Z0-9]+$/))) {
                errorParam[name] = true
            } else if (name == 'zipCode') {
                errorParam[name] = false
            }

            this.setState({ errorParam: errorParam })

        });

    };

    validateData = (callback) => {

        let errorParam = { ...this.state.errorParam }
        let flag = false;
        let data = this.state;
        let formData = this.state.errorParam
        for (const key in formData) {
            if (key == 'location' && data[key] == "") {
                errorParam[key] = true
                flag = true
            }
            if ((key == 'zipCode' && data[key] != "") && (data[key].length < 5 || !data[key].match(/^[a-zA-Z0-9]+$/))) {
                errorParam[key] = true
                flag = true
            }
            if ((key == 'phoneNo' && data[key] != "") && (data[key].length < 16 )) {
                errorParam[key] = true
                flag = true
            }
        }
        this.setState({ errorParam: errorParam })

        return flag;
    }

    submitInputHandler = (callback) => {
        if (!this.validateData()) {
            callback();
        }
    }

    saveLocation = () => {
        this.submitInputHandler(() => {
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
            this.props.handleClose()

            if (this.props.locationId) {
                this.props.locationAction.updateLocation(this.props.locationId, data, (output) => {
                    if (output.error) {
                        toast.error(output.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.success(output.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    this.props.getLocationListing()
                })
            } else {
                this.props.locationAction.addLocation(data, (output) => {
                    if (output.error) {
                        toast.error(output.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.success(output.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    this.props.getLocationListing()
                })
            }
        })
    }

    getLocationData = (id) => {

        this.props.locationAction.getLocationData(id, (response) => {

            if (!response.data.error && response.data && response.data.length) {
                let locationData = response.data[0];
                let data = {
                    "location": locationData.location,
                    "addressLine1": locationData.addressLine1,
                    "suiteNo": locationData.suiteNo,
                    "addressLine2": locationData.addressLine2,
                    "city": locationData.city,
                    "state": locationData.state,
                    "zipCode": locationData.zipCode,
                    "phoneNo": locationData.phoneNo,
                    "timeZone": locationData.timeZone,
                    "facility": locationData.facility,
                    "pool": locationData.pool
                }
                this.setState(data)
            }

            console.log("responseresponse", response)
        })

    }

    componentDidMount() {
        if (this.props.locationId) {
            console.log("this.props.locationId", this.props.locationId);
            this.getLocationData(this.props.locationId)
        }
    }

    phoneFormat = (e) => {
        const { name, value } = e.target;
        let input = value

       
        // Strip all characters from the input except digits
        input = input.replace(/\D/g, '');

        // Trim the remaining input to ten characters, to preserve phone number format
        input = input.substring(0, 10);

        // Based upon the length of the string, we add formatting as necessary
        var size = input.length;
        if (size == 0) {
            input = input;
        } else if (size < 4) {
            input = '(' + input;
        } else if (size < 7) {
            input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
        } else {
            input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
        }

        this.setState({ [name]: input}, ()=>{
         
            let data = this.state;
            let errorParam = { ...this.state.errorParam };

            if (data[name] == "") {
                errorParam[name] = false
            } else if (data[name].length != 16 ) {
                errorParam[name] = true
            } else if (name == 'phoneNo') {
                errorParam[name] = false
            }

            this.setState({ errorParam: errorParam })

        })

    }

    render() {
        // console.log("Add Location Props", this.state);

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
                                    <span className="errorMsg">{this.state.errorParam['location'] ? "Location is required" : ""}</span>
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
                                        <select name="state" id="state" class="form-control" value={this.state.state} onChange={this.updateState}>
                                            <option value="">Select State</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="CA">California</option>
                                            <option value="NY">New York</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="TX">Texas</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <label for="zipCode">Zip Code</label>
                                        <input name="zipCode" type="text" class="form-control" id="zipCode" value={this.state.zipCode} onChange={this.updateState} placeholder="Alpha Numeric" maxlength="10" />
                                        <span className="errorMsg">{this.state.errorParam['zipCode'] ? "Zip Code is not valid" : ""}</span>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <label for="phoneNo">Phone Number</label>
                                        <input name="phoneNo" type="text" class="form-control" id="phoneNo" value={this.state.phoneNo} onChange={this.phoneFormat} />
                                        <span className="errorMsg">{this.state.errorParam['phoneNo'] ? "Phone is not valid" : ""}</span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="timeZone">Time Zone</label>
                                        <select name="timeZone" id="timeZone" class="form-control" value={this.state.timeZone} onChange={this.updateState}>
                                            <option value="">Select Time Zone </option>
                                            <option value="ST">ST</option>
                                            <option value="HT">HT</option>
                                            <option value="AKT">AKT</option>
                                            <option value="PT">PT</option>
                                            <option value="MT">MT</option>
                                            <option value="CT">CT</option>
                                            <option value="ET">ET</option>
                                            <option value="AST">AST</option>
                                        </select>
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
                                <div className="col-6" style={{ "text-align-last": "left" }}><button onClick={this.saveLocation} className="btn btn-primary border px-4 py-3 ">{this.props.locationId ? "Update" : "Save"}</button></div>
                            </div>
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