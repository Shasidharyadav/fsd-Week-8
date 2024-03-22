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
  CAlert,
  CFormSelect
} from "@coreui/react";
import { CMultiSelect } from '@coreui/react-pro';
import $ from 'jquery';


const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};

const Add = () => {

  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [exist, setExist] = useState(false);
  const [Event, setEvent] = useState([]);

  const navigate = useNavigate();


  const [Data, setData] = useState({
    event_id: "",
    menu_desc: "",
  });

  let name, value;
  const handle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...Data, [name]: value });
    // console.log(Data);
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/events", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setEvent(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/admin/dashboard");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  const PostData = async (e) => {
    e.preventDefault();
    const event_id = Data.event_id;
    const menu_desc = Data.menu_desc;
    console.log(event_id, menu_desc);

    const res = await fetch("/api/menu-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id,
        menu_desc,
      }),
    });
    const data = await res.json();
    if (res.status === 401 || !data) {
      setInvalid(true);
    } else if (res.status === 422 || !data) {
      setExist(true);
    }
    else if (res.status == 201) {
      setVisible(true);
      setTimeout(() => {
        navigate("/admin/all-menu");
      }, 3000)
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div >
        <CContainer>
          <CAlert color="primary" visible={visible}>
            Menu Added Successfully!!
          </CAlert>
          <CAlert color="danger" visible={invalid}>
            Error!! Please Fill all the fields properly
          </CAlert>
          <CAlert color="danger" visible={exist}>
            Menu for this Event already exists!!!!
            Please Choose Another Event!!
          </CAlert>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Add Menu</h1>
                    <h6>Event Name</h6>
                    <CInputGroup className="mb-3">
                      <CFormSelect
                        id="event_id"
                        name="event_id"
                        value={value}
                        onChange={(e) =>
                          setData({ ...Data, event_id: e.target.value })
                        }
                      >
                        <option value=" ">None</option>
                        {Event.map((item) => (
                          <option value={item._id}>
                            {item.event_name}
                            {value}
                          </option>
                        ))}
                      </CFormSelect>
                    </CInputGroup>
                    <h6>Menu Desccription</h6>
                    <CFormTextarea
                      className="mb-3"
                      name="menu_desc"
                      value={Data.menu_desc}
                      rows={3}
                      onChange={handle}>
                    </CFormTextarea>

                    <div className="d-grid">
                      <CButton color="primary" onClick={PostData}>
                        Add Menu
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </form >
  )
}

export default Add