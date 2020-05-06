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
        this.setState({ isLocationModal: false, locationId: "" });
    };

    getLocationListing = (filters) => {
        this.props.locationAction.getLocationList(filters);
    }

    deleteLocation = (id) => {
        this.props.locationAction.deleteLocation(id, (output) => {
            if (output.error) {
                toast.error(output.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.success(output.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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

        console.log("Location Props", this.props)

        return (
            <div className="app container-fluid">
                <ToastContainer autoClose={3000} hideProgressBar pauseOnHover={false} />
                <div class="row">
					<h1 class="col-sm-6"><strong>Locations </strong></h1>
					<div className="col-sm-6 mt-2" style={{ "text-align-last": "right" }}><button onClick={() => { this.setState({ isLocationModal: true }) }} style={{ "border-radius": "20px" }} className="btn btn-primary border active px-4 py-3">Add Location</button> </div>
                </div>
				{this.state.isLocationModal && <AddLocation show={this.state.isLocationModal} handleClose={this.hideModal} getLocationListing={this.getLocationListing} locationId={this.state.locationId} />}
                {!(this.props.locationData && this.props.locationData.items) ?
                    <div className="no-data container-fluid">
                        <div class="text-center" style={{ "width": "18rem;" }}>
                            <div class="map">
                                <img className="d-block m-auto" width="100px" height="100px" src="https://qss-assign.s3.ap-south-1.amazonaws.com/location.png" alt="Card image cap"></img>
                                <p><strong>Kindly Add Your Location First</strong></p>
                                <p class="card-text">There is no location added right now</p>
                            </div>
                        </div>
                    </div>
                    : ""}
                {(this.props.locationData && this.props.locationData.totalRecords) ? <LocationList data={this.props.locationData} deleteLocation={this.deleteLocation} updateLocation={this.updateLocation} getLocationListing={this.getLocationListing} /> : ""}

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