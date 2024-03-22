import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import Pdf from "react-to-pdf";
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

const Profile = () => {
    const ref = React.createRef();

    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [Committee, setCommittee] = useState([]);
    const [Transactions, setTransactions] = useState([]);
    const [Profile, setProfile] = useState();

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about/profile", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const response = await res.json();
            // window.alert("user dashboard")
            console.log(response);
            setTransactions(response.transactions)
            setData(response.user)
            console.log(response.rootUser, "Hii", Data);
            setCommittee(response.committee);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };
    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        // <div>Hello</div>
        <>
        <div className="Post" ref={ref}>
                <CCard textColor="white" className="mb-3" style={{ maxWidth: '25rem' }} color="dark">
                    {/* <CCol md={4}> */}
                    {/* <CCardImage src="/images/react400.jpg" /> */}
                    {/* </CCol> */}
                    <CCardHeader component="h5">Profile</CCardHeader>
                    <CCardBody>
                        {Data.map((item, index) => (
                            <CCardText data-index={index}>
                                <h4>User name: {item.name}</h4>
                                <CCardText>Email: {item.email}</CCardText>
                                <CCardText>Phone Number: {item.phone}</CCardText>
                                <CCardText>Date of Birth: {item.DOB}</CCardText>
                                <CCardText>Roles: Admin</CCardText>
                                <CCardText>Mail Verified: True</CCardText>
                                <CCardText>Address: {item.address}</CCardText>
                                <CCardText>Postal Code: {item.postal_code}</CCardText>
                                <CCardText>City: {item.city}</CCardText>
                                <CCardText>Country: {item.country}</CCardText>
                                {Committee.map((committee, index) => (
                                    <CCardText data-index={index}>
                                        {(() => {
                                            if (item.committee_id == committee._id) {
                                                return (
                                                    <CCardText>Committee: {committee.committee_name}</CCardText>
                                                )
                                            } 
                                        })()}


                                    </CCardText>
                                ))}

                            </CCardText>
                        ))}
                    </CCardBody>

                </CCard>
            </div>
            <Pdf targetRef={ref} filename="profile.pdf">
                {({ toPdf }) => <CButton onClick={toPdf}>Download PDF</CButton>}
            </Pdf>
        </>
    )
}

export default Profile