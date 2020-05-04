import React, { Component } from "react";
import LocationList from '../components/Location/LocationList'
import AddLocation from '../components/Location/AddLocation'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import actions from "../actions/index"
import { connect } from 'react-redux'
import './LocationContainer.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLocationModal: false,
            locationId: "",
        }
    }

    hideModal = () => {
        this.setState({ isLocationModal: false });
    };

    getLocationListing = () => {
        this.props.locationAction.getLocationList();
    }

    deleteLocation = (id) => {
        this.props.locationAction.deleteLocation(id, () => {
            this.getLocationListing();
        })
    }

    updateLocation = (locationId) => {
        this.setState({ isLocationModal: true, locationId: locationId })
    }

    componentDidMount() {
        this.getLocationListing()
    }

    notify = (isSuccess) => {

    }

    render() {
        console.log("Location Props", this.state)

        return (
            <div className="main bg-light">
                <ToastContainer autoClose={3000} />
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <h2>Locations</h2>
                    <div className="col-6" style={{ "text-align-last": "right" }}><button onClick={() => { this.setState({ isLocationModal: true }) }} className="btn btn-primary border active px-4 py-3">Add Location</button> </div>
                </nav>
                <div className="container">
                    {this.state.isLocationModal && <AddLocation show={this.state.isLocationModal} handleClose={this.hideModal} getLocationListing={this.getLocationListing} locationId={this.state.locationId}/>}
                    {this.props.locationData && this.props.locationData.length && <LocationList data={this.props.locationData} deleteLocation={this.deleteLocation} updateLocation={this.updateLocation} />}
                </div>

            </div>


        )

    }

}

const mapStateToProps = (state) => {

    return {
        locationData: state.locationData.location

    }
}

function mapDispatchToProps(dispatch) {

    return {
        locationAction: bindActionCreators(actions.location, dispatch),
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location))

