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
import { cilPencil, cilSettings,cilList,cilCloudDownload } from '@coreui/icons';


const All = () => {     
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const [Tasks, setTasks] = useState([]);
//   const [Transactions, setTransactions] = useState([]);
//   const [Users, setUsers] = useState([]);


  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/task/alltasks", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("data:",data);
      setTasks(data);
    //   setTransactions(data.transactions);
    //   setUsers(data.users);



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
            <strong>Task Assigned So Far</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CTable caption="top">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Committee Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Task</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Tasks.map((item, index) => (
                  <CTableRow data-index={index}>
                    <CTableHeaderCell scope="row">{count++}</CTableHeaderCell>
                    <CTableDataCell>{item.committee_name}</CTableDataCell>
                    <CTableDataCell>{item.user_name}</CTableDataCell>
                    <CTableDataCell>{item.task_desc}</CTableDataCell>
                    <CTableDataCell>{item.deadline}</CTableDataCell>
                    {/* <CTableDataCell>{item.date}</CTableDataCell> */}
                        <CTableDataCell>
                      {/* <Link to={`${item.receipt}`} activeClassName="active"> */}
                      {/* <a href={item.receipt} target="_blank" rel="noreferrer"> */}
				{/* <CButton >Downlaod Receipt</CButton> */}
                    {/* <CIcon icon={cilCloudDownload} size="xxl"/> */}
				{/* </a> */}
                      {/* </Link> */}
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