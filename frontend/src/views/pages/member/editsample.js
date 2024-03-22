import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
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

const Edit = () => {

  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [exist, setExist] = useState(false);

  const navigate = useNavigate();
  let { member_id,committee_id} = useParams();


  const [Committees, setCommittees] = useState();
  const[Committee,setCommittee] = useState();

  // const [Data, setData] = useState({
  //   name: Committee[0].committee_name,
  //   seats: Committee[0].seats,
  //   tasks: Committee[0].tasks,
  // });
  const[committee_name,setName] = useState();
  const[DOB,setDOB] = useState();
  const[Roles,setRoles] = useState(); 

  const handle = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setData({ ...Data, [name]: value});
    // console.log(Data);
  };
  
  useEffect(
    () => {
      const loginUser = async () => {
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
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      };
      const fetchData = async () => {
        console.log("Hello fetch ")
        const res = await fetch("/api/member-committee", {
          method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member_id,
        committee_id

      })
    })
        const data = await res.json();
        setCommittee(data.committee);
        
        if(res.status==422 && !data){
            window.alert("error in getting member details")
        }
        // setCommittee(data);
        // setName(data.name);
        // console.log(member_name)
        
      };
      fetchData();loginUser();
    },

    []
  );


  const PostData = async (e) => {
  //   e.preventDefault();
  //   const name = Data.name;
  //   const seats = Data.seats;
  //   const tasks = Data.tasks;
  //  console.log(name,seats,tasks);

  //   const res = await fetch("/api/committee-data", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       seats,
  //       tasks,

  //     }),
  //   });
    const data = await res.json();
    // console.log(data);
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
            Committee Updated Successfully!!
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
                    <h1>Update Committee</h1>
                    <h6>Member Name</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="member_name"
                        type="text"
                        // value={member_name}
                        // onChange={handleChange}
                        />
                    </CInputGroup>
                    <h6>Date Of Birth</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                      />
                    </CInputGroup>
                    <h6>Roles</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                      />
                    </CInputGroup>
                    <h6>Main Tasks</h6>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        name="tasks"
                        placeholder="Tasks"
                        type="text"
                        // value={Data.tasks}
                        // onChange={handle}
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

export default Edit;