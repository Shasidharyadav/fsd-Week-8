import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'
import CIcon from '@coreui/icons-react';

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

} from "@coreui/react";
import { cilPencil, cilSettings,cilList } from '@coreui/icons';


const All = () => {     
  const [Data, setData] = useState([]);
  const navigate = useNavigate();


  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/allmembers", {
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Members List</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable caption="top">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Main Tasks</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">User Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Edit Committee</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Data.map((item, index) => item.role_id === 0?(
                  <CTableRow data-index={index}>
                    <CTableHeaderCell scope="row">{count++}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>Member</CTableDataCell>


                        <CTableDataCell>
                      <Link to={`/admin/details/${item._id}`} activeClassName="active">
                    <CIcon icon={cilList} size="xxl"/>
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/admin/edit/${item._id}/${item.committee_id}`} activeClassName="active"> 
                    <CIcon icon={cilPencil} size="xl"/>

                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ):null)}
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
          {/* <Pagination
            activePage={1}
            itemsCountPerPage={2}
            totalItemsCount={2}
            pageRangeDisplayed={2}
          // onChange={handlePageChange}
          /> */}
          {/* </div> */}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default All;