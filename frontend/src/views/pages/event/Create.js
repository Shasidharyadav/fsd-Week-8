import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CDateRangePicker, CDatePicker } from '@coreui/react-pro';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
// import DateTimePicker from 'react-datetime-picker';

import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
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
    CFormSelect,
    CAlert,
    CFormCheck,
    CFormSwitch
} from "@coreui/react";
import $ from 'jquery';

import { CMultiSelect } from '@coreui/react-pro'


const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted ✅");
};

const Create = () => {

    const [visible, setVisible] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [exist, setExist] = useState(false);
    const [committees, setCommittee] = useState([]);
    const [committees_ids, setCommitteeid] = useState([]);
    const [newarray, setarray] = useState([]);
    const [value, onChange] = useState(new Date());
    const [from, setDate1] = useState(new Date());
    const [to, setDate2] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const [EventData, setEventData] = useState({
        event_name: "",
        venue: "",
        organiser: "",
        event_desc: "",
        payment: ""
    });
    const handle = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setEventData({ ...EventData, [name]: value });
        console.log(EventData)
        // console.log(Data);
    };

    const callAboutPage = async () => {
        try {
            const res = await fetch("/api/allcommittees", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            setCommittee(data.map((record) => {
                return {
                    value: record._id,
                    text: record.committee_name,
                }
            }))
            //   console.log(committees)
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/admin/dashboard");
        }
    };
    // useEffect(() => {
    //     callAboutPage();
    // }, []);

    // const [users, setUsers] = useState([])
    const getUsers = useCallback(() => {
        fetch("/api/allcommittees")
            .then((response) => response.json())
            .then((result) => {
                setCommittee(
                    result.map((record) => {
                        return {
                            value: record._id,
                            label: record.committee_name,
                        }
                    }),
                )
            })
    }, [])
    useEffect(() => {
        getUsers()
    }, [getUsers]);
    const handleChange = (selectedOption) => {
        setCommitteeid(newarray.concat(selectedOption))
        // console.log(committees_ids)
    }
    // Post Data function to send form data to backend API of Event 
    const PostData = async (e) => {
        e.preventDefault();
        const event_name = EventData.event_name;
        // const date = EventData.date;
        const venue = EventData.venue;
        const organiser = EventData.organiser;
        const event_desc = EventData.event_desc;
        const payment = EventData.payment
        // console.log(event_name, from, to, venue, committees_ids, organiser, event_desc);
        // console.log(name, seats, tasks);

        const res = await fetch("/api/event-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event_name, from, to, venue, committees_ids, organiser, event_desc,payment

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
                navigate("/admin/all-events");
            }, 3000)
        }
    };

    // disable past dates in the calender
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    
    return (
        <form onSubmit={handleSubmit} method="POST">
            <div >
                <CContainer>
                    <CAlert color="primary" visible={visible}>
                        Event Added Successfully!!
                    </CAlert>
                    <CAlert color="danger" visible={invalid}>
                        Error!! Please Fill all the fields properly
                    </CAlert>
                    <CAlert color="danger" visible={exist}>
                        Event Already Exist!!!!
                        Please Choose Another Name!!
                    </CAlert>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={7} xl={6}>
                            <CCard className="mx-1">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h1>Create Event</h1>
                                        <h6>Event Name</h6>
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                name="event_name"
                                                type="text"
                                                value={EventData.event_name}
                                                onChange={handle}
                                            />
                                        </CInputGroup>
                                        <h6>Select Committee</h6>
                                        <CInputGroup className="mb-3">
                                            <Select
                                                isMulti
                                                name="committees"
                                                options={committees}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                value={committees_ids}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                        </CInputGroup>
                                        <h6>Date & Timings</h6>
                                        {/* <CDateRangePicker
                                            name="date"
                                            date="2023/03/15 02:22:13 PM"
                                            locale="en-US"
                                            timepicker
                                            value={EventData.date}
                                            onChange={handle} /> */}
                                        <CInputGroup className="mb-3">
                                            {/* <DateTimePicker  onChange={onChange} value={value}   minDate={new Date()}/> */}
                                            <h6>From   :</h6>
                                            <DatePicker
                                                timeFormat={true}
                                                isValidDate={disablePastDt}
                                                className="basic-multi-select"
                                                onChange={setDate1}
                                                value={from}
                                            />
                                            <h6>To:</h6>
                                            <DatePicker
                                                timeFormat={true}
                                                isValidDate={disablePastDt}
                                                className="basic-multi-select"
                                                onChange={setDate2}
                                                value={to}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                        </CInputGroup>
                                        <h6>Venue</h6>
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                name="venue"
                                                type="text"
                                                value={EventData.venue}
                                                onChange={handle}
                                            />
                                        </CInputGroup>
                                        {/* <h6>Committees</h6> */}
                                        {/* <CInputGroup className="mb-3">
                                            <CFormInput
                                                name="committees"
                                                type="text"
                                                value={EventData.tasks}
                                                onChange={handle}
                                            />
                                        </CInputGroup> */}
                                        <h6>Organised By</h6>
                                        <CInputGroup className="mb-3">
                                            <CFormInput
                                                name="organiser"
                                                type="text"
                                                value={EventData.organiser}
                                                onChange={handle}
                                            />
                                        </CInputGroup>
                                        <h6>Event Description</h6>
                                        <CFormTextarea
                                            name="event_desc"
                                            rows={3}
                                            text="Must be 8-20 words long."
                                            value={EventData.event_desc}
                                            onChange={handle}
                                        ></CFormTextarea>

                                        <h6>Payment Information</h6>
                                        {/* <CFormSelect
                                            id="payment"
                                            name="payment"
                                            value={value}
                                            onChange={(e) =>
                                                setEventData({ ...EventData, payment: e.target.value })
                                            }
                                        >
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3" disabled>Three</option>

                                        </CFormSelect> */}
                                        <CFormSelect
                                            id="payment"
                                            name="payment"
                                            onChange={handle}
                                        >
                                            <option value="">Open this select menu</option>
                                            <option value="True" >Activate</option>
                                            <option value="False">Deactivate</option>
                                        </CFormSelect>
                                        <div className="d-grid">
                                            <CButton color="primary" onClick={PostData}>
                                                Create
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

export default Create;