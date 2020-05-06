import React, { Component } from "react";
import './LocationList.css';



class LocationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdateModal: false,
            searchKeyword: "",
            pagination: "",
            page: "",
            resPerPage: "",

        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            page: pageNumber,
            pagination: true,
            resPerPage: this.state.resPerPage,
            searchKeyword: this.state.searchKeyword.trim()
        }, () => {
            this.applyFilter()
        });
    }

    applyFilter = () => {
        let filters = {
            pagination: this.state.pagination,
            page: this.state.page,
            resPerPage: this.state.resPerPage,
            searchKeyword: this.state.searchKeyword.trim()
        }
        this.props.getLocationListing(filters)
    }



    render() {
        let totalRecords = this.props.data ? this.props.data.totalRecords : ""
        let totalResult = this.props.data ? this.props.data.totalResult : "";
        let previousPage = this.props.data && this.props.data.pagination ? this.props.data.pagination.previousPage : "";
        let nextPage = this.props.data && this.props.data.pagination && this.props.data.pagination.nextPage ? this.props.data.pagination.nextPage : "";
        let totalPages = this.props.data && this.props.data.totalPages ? this.props.data.totalPages : 2;

        console.log("this.props ==>>", this.props);


        let item = this.props.data.items.map((elem, i) => {
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
                            <span onClick={() => { this.props.updateLocation(elem._id) }} title="Edit" class="glyphicon">&#x270f;</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <a onClick={() => { this.props.deleteLocation(elem._id) }} href="javascript:void(0);" className="glyphicon glyphicon-trash" title="Delete" data-toggle="tooltip"><i className="fa fa-trash">&#xE417;</i></a>
                        </div>


                    </div>
                </div>
            )
        })
        let pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push((
                <li onClick={() => { this.handlePageChange(i) }} className="page-item"><a className="page-link" href="javascript:void(0);">{i}</a></li>
            ))
        }


        return (
            <div>
                <nav className="rounded-block navbar navbar-light bg-light justify-content-between">
                    <form className="search-box form-inline">
                        <input id="table-serach" className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.searchProviders} aria-label="Search" />
                    </form>
                </nav>
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
                                        {previousPage && <li className="page-item">
                                            <a onClick={() => { this.handlePageChange(previousPage) }} className="page-link" href="javascript:void(0);" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>}
                                        {pages}
                                        {nextPage && <li onClick={() => { this.handlePageChange(nextPage) }} className="page-item">
                                            <a className="page-link" href="javascript:void(0);" aria-label="Next">
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
