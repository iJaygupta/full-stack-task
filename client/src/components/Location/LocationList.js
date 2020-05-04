import React, { Component } from "react";
import AddLocation from './AddLocation'


class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdateModal: false
        }
    }



    render() {
        console.log("this.props ==>>", this.props);
        let item = this.props.data.map((elem, i) => {
            return (
                <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{elem.location}</td>
                    <td>{elem.addressLine1}</td>
                    <td>{elem.phoneNo}</td>
                    <td>
                        <span onClick={() => { this.props.updateLocation(elem._id) }} class="glyphicon">&#x270f;</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a onClick={() => { this.props.deleteLocation(elem._id) }} href="javascript:void(0);" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a>
                    </td>
                </tr>
            )

        })
        return (
            <div>

                <table class="table">
                    <caption>List of users</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone No</th>
                            <th scope="col">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {item}
                    </tbody>
                </table>
            </div>
        )

    }

}

export default LocationList;
