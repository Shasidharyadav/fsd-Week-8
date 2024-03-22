import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import { CDateRangePicker, CDatePicker } from '@coreui/react-pro';

import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Calendar from 'react-calendar';
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

function Assign() {
    const [Committees, setCommittees] = useState([]);
    const [Members, setMembers] = useState([]);
    const [committeeid, setCommitteeid] = useState('');
    const [memberid, setMemberid] = useState('');
    const [task_desc, setTask] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [visible, setVisible] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [exist, setExist] = useState(false);

    const navigate = useNavigate();

    //   useEffect( ()=>{
    // //    const getcountry= async ()=>{
    // //      const req= await fetch("/api/allcommittees");
    // //     //  const getres= await req.json();
    // //      console.log(req.json);
    // //     //  setCountry(await );

    // //    }
    // //    getcountry();


    //   },[]);
    const callAboutPage = async () => {
        try {
            const res = await fetch("/api/task/allcommittees", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            //   console.log("data:",data);
            setCommittees(data);

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

    const handlecommittee = (event) => {
        const getcommitteeid = event.target.value;
        setCommitteeid(getcommitteeid);
        // console.log(committeeid)
        event.preventDefault();
        fetchMember()

    }
    const handleMember = (event) => {
        const getmemberid = event.target.value;

        setMemberid(getmemberid);
        console.log(getmemberid, "handelMember", memberid);
        // console.log(committeeid)
        event.preventDefault();
        // fetchMember()

    }
    const handleTask = (event) => {

        const task = event.target.value;
        setTask(task);
        // console.log( "handelTask", task_desc,deadline);
        // console.log(committeeid)
        event.preventDefault();
        // fetchMember()

    }
    const yesterday = moment().subtract(1, 'day');

    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    //Post Data
    const PostData = async () => {


        // console.log(committeeid);
        const res = await fetch("/api/task/add-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                committeeid,
                memberid,
                task_desc,
                deadline
            }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 401 || !data) {
            setInvalid(true);
        } else if (res.status === 422 || !data) {
            setExist(true);
        }
        else if (res.status == 201) {
            setVisible(true);
            setTimeout(() => {
                navigate("/admin/all-tasks");
            }, 3000)
        }
        // setMembers(data);
    };

    // Fetch member details of selected committee
    const fetchMember = async () => {
        // console.log(committeeid);
        const res = await fetch("/api/task/member/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                committeeid,
            }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status == 422 && !data) {
            window.alert("error in getting member details")
        }
        setMembers(data);
    };

    //   },[countryid]);


    return (
        <Container className="content">
            <CAlert color="primary" visible={visible}>
                Task Assigned Successfully!!
            </CAlert>
            <CAlert color="danger" visible={invalid}>
                Error!! Please Fill all the fields properly
            </CAlert>
            <CAlert color="danger" visible={exist}>
                Event Already Exist!!!!
                Please Choose Another Name!!
            </CAlert>
            <div className="row">
                <div className="col-sm-12">
                    <h5 className="mt-4 mb-4 fw-bold">Assign Task  { }</h5>

                    <div className="row mb-3">
                        <div className="form-group col-md-4">
                            <label className="mb-2">Committee</label>
                            <select name="country" className="form-control" onChange={(e) => handlecommittee(e)}>
                                <option>--Select Committee --</option>
                                {
                                    Committees.map((getcom) => (
                                        <option key={getcom._id} value={getcom._id}> {getcom.committee_name}</option>
                                    ))
                                }

                            </select>
                        </div>
                        {/* <select name="country" className="form-control" onChange={(e)=>handlecommittee(e)}>
                   <option>--Select Committee --</option>
                   {
                     Members.map( (getmember)=>(
                   <option key={getmember.item._id} value={getmember.item._id }> { getmember.item.name}</option>
                     ))
                }
                 
                 </select> */}
                        <div className="form-group col-md-4">
                            <label className="mb-2">Member</label>
                            <select name="state" className="form-control" onChange={(e) => handleMember(e)}>
                                <option>--Select Member--</option>
                                {
                                    Members?.map((member) => (
                                        <option key={member.item._id} value={member.item._id}>{member.item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>



                </div>
                <div className="col-sm-12">
                    <div className="row mb-3">
                        <div className="form-group col-md-4">
                            <label className="mb-2">Deadline</label>
                            <DatePicker
                                format='yyyy-MM-dd'
                                timeFormat={false}
                                isValidDate={disablePastDt}
                                // className="basic-multi-select"
                                onChange={setDeadline}
                                value={deadline}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label className="mb-2">Task Description</label>
                            <textarea className="form-control" name="task_desc" onChange={(e) => handleTask(e)}></textarea>
                        </div>


                    </div>

                </div><div className="form-group col-md-2 mt-4">
                    <button className="btn btn-success mt-2" onClick={PostData}>Submit</button>
                </div>

            </div>
        </Container>
    );
}
export default Assign;