import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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
    CCardImage,
    CCardTitle,
    CCardText
  
  } from "@coreui/react";
  import Pdf from "react-to-pdf";

const Details = () => {
    let { member_id} = useParams();
    const [Data, setData] = useState([]);
    const ref = React.createRef();

    useEffect(
        () => {
          const fetchData = async () => {
            const res = await fetch("/api/member/details", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                member_id,
              }),
            });
            const data = await res.json();
            if(res.status==422 && !data){
                window.alert("error in getting member details")
            }
            console.log(data);
            setData(data);
          };
          fetchData();
        },
    
        []
      );

  return (
    <>
    <div className="Post" ref={ref}>
    <CCard textColor="white" className="mb-3" style={{ maxWidth: '25rem' }} color="dark">
      {/* <CCol md={4}> */}
      {/* <CCardImage src="/images/react400.jpg" /> */}
      {/* </CCol> */}
      <CCardHeader component="h5">Member Details</CCardHeader>
      <CCardBody>
        {Data.map((item, index) => (
          <CCardText data-index={index}>
            <h4>{item.name}</h4>
            <CCardText>Email: {item.email}</CCardText>
            <CCardText>Phone Number: {item.phone}</CCardText>
            <CCardText>Date of Birth: {item.DOB}</CCardText>
            <CCardText>Roles: {item.roles}</CCardText>
            <CCardText>Committee ID: {item.committee_id}</CCardText>
            <CCardText>Mail Verified: {item.verified}</CCardText>
            <CCardText>Address: {item.address}</CCardText>
            <CCardText>Postal Code: {item.postal_code}</CCardText>
            <CCardText>City: {item.city}</CCardText>
            <CCardText>Country: {item.country}</CCardText>

          </CCardText>
        ))}
      </CCardBody>

    </CCard>
  </div>
  <Pdf targetRef={ref} filename="$.pdf">
  {({ toPdf }) => <CButton onClick={toPdf}>Download PDF</CButton>}
</Pdf>
</>
  )
}

export default Details;