import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination'
import CIcon from '@coreui/icons-react';
// import http from "./http";

import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableCaption,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton,
  CPaginationItem, CPagination, CCardTitle, CCardSubtitle, CCardText, CCardLink, CListGroup, CListGroupItem
} from "@coreui/react";
import { cilPencil, cilSettings, cilList } from '@coreui/icons';


const All = () => {
  const [Event, setEvent] = useState([]);
  const [Menu, setMenu] = useState([]);

  const navigate = useNavigate();


  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/menu", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log("data:", data);

      setEvent(data.events);
      setMenu(data.menus);
      // console.log(Menu, Event)

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

    <CRow xs={ { cols: 4, gutter: 1 } } md={ { cols: 2 } }>
      { Menu.map((item, index) => {
        return (
          <CCol xs={ 3 }>
            { Event.map((item1, index) => {

              if (item1._id == item.event_id) {
                return (
                  <CCard key={ index } className="box" style={ { width: '25rem' } }>
                    <CCardHeader ><h1>{ item1.event_name } </h1></CCardHeader>
                    <CCardBody style={ { position: "relative" } }>
                      <CCardText className="mb-2 pb-0 text-medium"><i><b>Venue:</b></i>   { item1.venue }</CCardText>
                      <CCardText className="mb-2 pb-0 text-medium"><i><b>Organised by:</b></i>  { item1.organiser }</CCardText>
                      <CCardText className="mb-2 pb-0 text-medium"><i><b>Menu:</b>  { item.menu_desc }</i></CCardText>
                    </CCardBody>
                  </CCard>
                )
              }
              // else {

              //   console.log('NOTHING')
              // }

              // )
            }) }
          </CCol>)
      })
      }

    </CRow>
  )
}

export default All;


