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
                    <div class="pt-3 row">
                        <div class="col-sm text-center">
                            {elem.location}
                        </div>
                        <div class="col-sm text-center">
                            {elem.addressLine1}
                        </div>
                        <div class="col-sm text-center">
                            {elem.phoneNo}
                        </div>
                        <div class="col-sm text-center">
                            <span onClick={() => { this.props.updateLocation(elem._id) }} title="Edit" >&#x270f;</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                         <span onClick={() => { this.props.deleteLocation(elem._id) }} title="Delete" ><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></span>
                        
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
                <div className="rounded-block">
                    <div class="row">
                        <div class="col-sm text-center">
                            <h1><strong> &nbsp; &nbsp; &nbsp; &nbsp;Location Name </strong></h1>
                        </div>
                        <div class="col-sm text-center">    
                            <h1><strong> Address </strong></h1>
                        </div>
                        <div class="col-sm text-center">
                            <h1><strong>Phone No. </strong></h1>
                        </div>
                        <div class="col-sm text-center">
                            <h1><strong>Actions </strong></h1>
                        </div>


                    </div>
                </div>

                {item}
                <div className="clear-fix rounded-block">
                    <div class="row">
                        
                       <div class="col-sm-6  pt-1 text-center">
                            <div className="hint-text float-right">Showing <b>{totalResult}</b> out of <b>{totalRecords}</b> entries</div><br />
                        </div>
                        <div class="col-sm-6 text-center">
                            <div className="row container-fluid">
                                <div className="col-sm-6">
                                    <ul className="pagination">  {/*justify-content-end */}
                                        {previousPage && 
                                        <li className="page-item">
                                            <a onClick={() => { this.handlePageChange(previousPage) }} className="page-link" href="javascript:void(0);" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>}
                                        {pages}
                                        {nextPage && 
                                        <li onClick={() => { this.handlePageChange(nextPage) }} className="page-item">
                                            <a className="page-link" href="javascript:void(0);" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>}
                                    </ul>
                                </div>
                            </div>
                        </div><br/>
                     </div>
                </div>
            </div>
        )

    }

}

export default LocationList;