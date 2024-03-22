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
    let { transaction_id } = useParams();
    const [Event_Name, setEventName] = useState();
    const [User_Name, setUserName] = useState();
    const [Transaction, setTransaction] = useState();
    const [Receipt, setReceipt] = useState();
    const [Amount, setAmount] = useState();

    const [User, setUser] = useState(); 
    const ref = React.createRef();

    useEffect(
        () => {
            const fetchData = async () => {
                const res = await fetch("/api/transaction/details", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        transaction_id,
                    }),
                });
                const data = await res.json();
                console.log(data)

                if (res.status == 422 && !data) {
                    window.alert("error in getting transaction details")
                }
                else{
                console.log("Hii Else")
                setEventName(data.event.event_name)
                setUserName(data.user.name)
                setAmount(data.transaction.amount)
                setReceipt(data.transaction.receipt)
            }};
            fetchData();
        },

        []
    );

    return (
        <>
            <div className="Post" ref={ref}>
                <CCard textColor="white" className="mb-3" style={{ maxWidth: '18rem' }} color="dark">
                    <CCardHeader component="h6">Transaction Details</CCardHeader>
                    <CCardBody>
                        {/* {Data.map((item, index) => (
                            <CCardText data-index={index}>
                                <h4>Committee Name: {item.committee_name}</h4>
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
                        ))} */}
                        <CCardTitle> Event: {Event_Name}</CCardTitle>
                        <CCardText>User Name: {User_Name}</CCardText>
                        <CCardText>Amount: {Amount}</CCardText>
                        <CCardText>{Receipt}</CCardText>


                    </CCardBody>
                </CCard>
            </div>
            <div>
        <CButton style={{ maxWidth: '10rem' }} href=''>Download Receipt</CButton>
            <Pdf targetRef={ref} filename="$.pdf">
                {({ toPdf }) => <CButton onClick={toPdf}>Download PDF</CButton>}
            </Pdf>
            </div>
        </>
    )
}

export default Details;