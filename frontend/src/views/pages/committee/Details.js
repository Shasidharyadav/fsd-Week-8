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
    let { committee_id} = useParams();
    const [Data, setData] = useState([]);
    const ref = React.createRef();

    useEffect(
        () => {
          const fetchData = async () => {
            const res = await fetch("/api/committee/details", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                committee_id,
              }),
            });
            const data = await res.json();
            if(res.status==422 && !data){
                window.alert("error in getting member details")
            }
            setData(data);
          };
          fetchData();
        },
    
        []
      );

  return (
    <>
    <div className="Post" ref={ref}>
    <CCard textColor="white" className="mb-3" style={{ maxWidth: '18rem' }} color="dark">
      {/* <CCol md={4}> */}
      {/* <CCardImage src="/images/react400.jpg" /> */}
      {/* </CCol> */}
      <CCardHeader component="h5">Committee Details</CCardHeader>
      <CCardBody>
        {Data.map((item, index) => (
          <CCardText data-index={index}>
            <h4>{item.committee_name}</h4>
            <CCardText>Total Seats: {item.seats}</CCardText>
            <CCardText>Tasks: {item.tasks}</CCardText>
            {(() => {
                      if (item.status == 1) {
                        return (
                            <CCardText>Committee Status: Active</CCardText>
                            )

                      } else {
                        return (
                            <CCardText>Committee Status: Inactive</CCardText>
                            )
                      }
                    })()}

            <CCardText>createdAt: {item.createdAt}</CCardText>
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