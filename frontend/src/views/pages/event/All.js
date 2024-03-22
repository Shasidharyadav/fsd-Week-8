import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

import Pagination from 'react-bootstrap/Pagination'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTableHeaderCell,
  CCardHeader,
  CCardText,

} from "@coreui/react";

const All = () => {
  const [Committee, setCommittee] = useState([]);
  const [Event, setEvent] = useState([]);
  const [PayEvent, setPayEvent] = useState([]);

  const [User, setUser] = useState();
  const [Amount, setAmount] = useState();
  const [visible, setVisible] = useState(false);


  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/allevents", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log("data:", data);
      setCommittee(data.committees);
      setEvent(data.events);


      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/admin/dashboard");
    }
  };
  const currentUser = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await res.json();
      setUser(user);
      // console.log(user);

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
    callAboutPage(); currentUser();
  }, []);

  // Set Choose Event for Donaiton
  function setEventFunction(event) {
    setVisible(!visible);
    setPayEvent(event);
  };
// Redirect to Payment Checkout
  function Pay(Amount){
    if (Amount) {
      // window.alert(PayEvent, Amount)
      console.log(PayEvent,Amount)
      const data = { state: [User, PayEvent, Amount] };
      navigate("/payment", data);
    }
    else {
      window.alert("Please Fill Amount First!!")

    }
  }
  function handle(event) {
    console.log(event.target.value);
    setAmount(event.target.value)
  }
  const renderCard = (event, index) => {
    return (
      <CRow xs={{ cols: 3, gutter: 1 }} md={{ cols: 2 }}>
        <CCol xs={3}>
          <CCard style={{ width: "25rem" }} key={index} className="box">
          {/* <CCard textColor="white" className="mb-3" style={{ maxWidth: '25rem' }} color="dark" key={index}> */}

            <CCardHeader >
              <h2>{event.event_name}</h2>
            </CCardHeader>
            <CCardBody style={{ position: "relative" }}>
              <CCardText>Venue: {event.venue}</CCardText>
              <CCardText>Organiser: {event.organiser}</CCardText>
              <CCardText>From: {event.from}</CCardText>
              <CCardText>To: {event.to}</CCardText>
              <CCardText>Event Created At: {event.createdAt}</CCardText>
              <CCardText>Event Description: {event.event_desc}</CCardText>
              <h6>Committee Involved:</h6>
              {Committee.map(committee => {
                return (
                  <div key={committee._id}>
                    {event.committees_id.map(comm => {
                      return (
                        <div key={comm._id}>
                          {(() => {
                            if (comm.value == committee._id) {
                              return (

                                <CCardText>{committee.committee_name}</CCardText>
                              )
                            } else {
                              return (
                                console.log("")
                              )
                            }
                          })()}
                        </div>
                      );
                    })}

                  </div>
                );
              })}
              <div>
                 <CModal visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Please Confirm Donation Amount</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <h3>Rs.</h3>
                <CFormInput type="number" id="amount" placeholder="Amount" name="amount" onChange={handle} />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="success" onClick={() => Pay(Amount)}>Pay</CButton>
              </CModalFooter>
            </CModal>
                {(() => {
                  if (event.payment == "True") {
                    return (
                      <CButton color="info" onClick={() => setEventFunction(event)}>Donate Now</CButton>
                    )
                  } else {
                    return (
                      <h6>Payment N/A </h6>

                    )
                  }
                })()}
              </div>
              {/* <Card.Title>Plan Name: {card.plan_name}</Card.Title> */}

              {/* <button
            className="btn btn-primary"
            // onClick={() =>
            //   Planedit(
            //     card._id,
            //     card.plan_name,
            //     card.price,
            //     card.emails,
            //     card.lists,
            //     card.listemails,
            //     card.plan_type
            //   )
            // }
          >
            Edit
          </button> */}
              {/* <button
            className="btn btn-danger"
            onClick={() => DeletePlan(card._id,card.plan_name)}
          >
            Delete
          </button> */}
              {/* <Card.Text type = "hidden">{card._id}</Card.Text> */}
            </CCardBody>
            {/* <CButton onClick={() => setVisible(!visible)}>Launch static backdrop modal</CButton> */}
           
          </CCard>
        </CCol>
      </CRow>
    );
  };


  return <div className="grid">{Event.map(renderCard)}</div>;
}
export default All;