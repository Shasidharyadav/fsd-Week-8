import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPaginationItem,
  CPagination,
  CFormSwitch
} from "@coreui/react";
const All = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();


  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/allcommittees", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log("data:",data);
      setData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/admin/dashboard");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  var count = 1;
  // if (status ==1) {
  //   button = <LogoutButton onClick={this.handleLogoutClick} />;
  // } else {
  //   button = <LoginButton onClick={this.handleLoginClick} />;
  // }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Committee List</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable caption="top">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Committee Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total Seats</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Main Tasks</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Creation Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Data.map((item, index) => (
                  <CTableRow data-index={index}>
                    <CTableHeaderCell scope="row">{count++}</CTableHeaderCell>
                    <CTableDataCell>{item.committee_name}</CTableDataCell>
                    <CTableDataCell>{item.seats}</CTableDataCell>
                    <CTableDataCell>{item.tasks}</CTableDataCell>
                    {(() => {
                      if (item.status == 1) {
                        return (
                          <CTableHeaderCell>Active</CTableHeaderCell>
                          )

                      } else {
                        return (
                          <CTableHeaderCell>Inactive</CTableHeaderCell>
                          )
                      }
                    })()}

                    <CTableDataCell>{item.createdAt}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/admin/committee/${item._id}`} activeClassName="active">
                        View Details
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))}
                {/* <CPagination aria-label="Page navigation example">
                  <CPaginationItem>Previous</CPaginationItem>
                  <CPaginationItem>1</CPaginationItem>
                  <CPaginationItem>2</CPaginationItem>
                  <CPaginationItem>3</CPaginationItem>
                  <CPaginationItem>Next</CPaginationItem>
                </CPagination> */}
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
          {/* <div> */}
          <Pagination
            activePage={1}
            itemsCountPerPage={2}
            totalItemsCount={2}
            pageRangeDisplayed={2}
          // onChange={handlePageChange}
          />
          {/* </div> */}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default All;