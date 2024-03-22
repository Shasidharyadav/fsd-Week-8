import { number } from 'prop-types'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from "@coreui/react";
import $ from 'jquery';


const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};

const Add = () => {

  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [exist, setExist] = useState(false);

  const navigate = useNavigate();


  const [Data, setData] = useState({
    name: "",
    seats: "",
    tasks: "",

  });

  const handle = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setData({ ...Data, [name]: value});
    // console.log(Data);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const name = Data.name;
    const seats = Data.seats;
    const tasks = Data.tasks;
   console.log(name,seats,tasks);

    const res = await fetch("/api/committee-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        seats,
        tasks,

      }),
    });
    const data = await res.json();
    if (res.status === 401 || !data) {
      setInvalid(true);
    }  else if (res.status === 422 || !data) {
      setExist(true);}
      else if(res.status == 201) {
      setVisible(true);
      setTimeout(() => {
        navigate("/admin/all-committees");
      }, 3000)
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      <div >
        <CContainer>
        <CAlert color="primary" visible={visible}>
            Committee Added Successfully!!
            </CAlert>
            <CAlert color="danger" visible={invalid}>
            Error!! Please Fill all the fields properly
            </CAlert>
            <CAlert color="danger" visible={exist}>
              Committee Already Exist!!!!
              Please Choose Another Name!!
            </CAlert>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Add Committee</h1>
                    <h6>Committee Name</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={Data.name}
                        onChange={handle}
                      />
                    </CInputGroup>
                    <h6>Total seats</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="seats"
                        placeholder="Seats"
                        type="Number"
                        value={Data.seats}
                        onChange={handle}
                      />
                    </CInputGroup>
                    <h6>Main Tasks</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="tasks"
                        placeholder="Tasks"
                        type="text"
                        value={Data.tasks}
                        onChange={handle}
                      />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-3">
                      <CFormInput
                        type="hidden"
                        value={userData}
                        name="userid"
                        id="userid"
                      />
                    </CInputGroup> */}
                    <div className="d-grid">
                      <CButton color="primary" onClick={PostData}>
                        Add Committee
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </form>
  )
}

export default Add