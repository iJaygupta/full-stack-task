import React, { Component } from "react";
import './LocationList.css';



class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdateModal: false
        }
    }



    render() {
        let totalRecords = this.props.provider ? this.props.provider.totalRecords : ""
        let totalResult = this.props.provider ? this.props.provider.totalResult : "";
        let previousPage = this.props.provider && this.props.provider.pagination ? this.props.provider.pagination.previousPage : "";
        let nextPage = this.props.provider && this.props.provider.pagination && this.props.provider.pagination ? this.props.provider.pagination.nextPage : 2;
        console.log("this.props ==>>", this.props);

        let dummy =[{
            "location" : "gurgaon",
            "addressLine1" : "dummy",
            "phoneNo" : 122222 
        }]
        let item = dummy.map((elem, i) => {
            return (

                <div className="rounded-block">
                    <div class="row">
                        <div class="col-sm">
                            {elem.location}
                        </div>
                        <div class="col-sm">
                            {elem.addressLine1}
                        </div>
                        <div class="col-sm">
                            {elem.phoneNo}
                        </div>
                        <div class="col-sm">
                            <span onClick={() => { this.props.updateLocation(elem._id) }} class="glyphicon">&#x270f;</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <a onClick={() => { this.props.deleteLocation(elem._id) }} href="javascript:void(0);" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a>
                        </div>


                    </div>
                </div>



                // <tr>
                //     <th scope="row">{i + 1}</th>
                //     <td>{elem.location}</td>
                //     <td>{elem.addressLine1}</td>
                //     <td>{elem.phoneNo}</td>
                //     <td>
                //         <span onClick={() => { this.props.updateLocation(elem._id) }} class="glyphicon">&#x270f;</span>
                //         &nbsp;&nbsp;&nbsp;&nbsp;
                //         <a onClick={() => { this.props.deleteLocation(elem._id) }} href="javascript:void(0);" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a>
                //     </td>
                // </tr>
            )

        })
        return (
            <div>
                <div className="rounded-block">
                    <div class="row">
                        <div class="col-sm">
                            <h1><strong> &nbsp; &nbsp; &nbsp; &nbsp;Location Name </strong></h1>
                        </div>
                        <div class="col-sm">
                            <h1><strong> Address </strong></h1>
                        </div>
                        <div class="col-sm">
                            <h1><strong>Phone No. </strong></h1>
                        </div>
                        <div class="col-sm">
                            <h1><strong>Actions </strong></h1>
                        </div>


                    </div>
                </div>

                {item}
                <div className="rounded-block">
                    <div class="row">
                        <div class="col-sm">

                        </div>
                        <div class="col-sm">
                            <div className="hint-text">Showing <b>{totalResult}</b> out of <b>{totalRecords}</b> entries</div><br />
                        </div>
                        <div class="col-sm">
                            <div className="row container-fluid">
                                <div className="col-sm-6">
                                    <ul className="pagination">  {/*justify-content-end */}
                                        {previousPage && <li onClick={() => { this.handlePageChange(previousPage) }} className="page-item">
                                            <a onClick={() => { this.handlePageChange(2) }} className="page-link" href="javascript:void(0);" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>}
                                        <li onClick={() => { this.handlePageChange(1) }} className="page-item"><a className="page-link" href="javascript:void(0);">1</a></li>
                                        <li onClick={() => { this.handlePageChange(2) }} className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                        <li onClick={() => { this.handlePageChange(3) }} className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                                        <li onClick={() => { this.handlePageChange(4) }} className="page-item"><a className="page-link" href="javascript:void(0);">4</a></li>
                                        {nextPage && <li onClick={() => { this.handlePageChange(nextPage) }} className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">

                        </div>


                    </div>
                </div>
            </div>
        )

    }

}

export default LocationList;
