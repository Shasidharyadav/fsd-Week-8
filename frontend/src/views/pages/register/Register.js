import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardGroup,
  CAlert
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};
const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(false);

    const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    setInfo(true);

    const { name, email, password, cpassword } = user;
    console.log(user);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });
    setMsg(res.message)
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration!!");
      console.log("Invalid Registration!!");
    } else {
      setVisible(true);
          setTimeout(() => {
            navigate("/login")
          }, 3000)
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
        <CAlert color="info" visible={info}>
            Please Wait...
            </CAlert>
        <CAlert color="primary" visible={visible}>
        Thank you for registration. An Email sent to your account please verify!!
            </CAlert>
          <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody >
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="name"
                        value={user.name}
                        onChange={handleInputs}
                        placeholder="Name"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        value={user.email}
                        onChange={handleInputs}
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={user.password}
                        onChange={handleInputs}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="cpassword"
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        value={user.cpassword}
                        onChange={handleInputs}
                      />
                    </CInputGroup>
                    {msg && <div calssname={StyleSheet.success_msg}>{msg}</div>}
                    <div className="d-grid">
                      <CButton color="primary" onClick={PostData}>
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                  className="text-white bg-primary py-5"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign In</h2>
                      <p>Already Registered????</p>
                      <Link to="/login">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Login Now!!!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
                </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </form>
  );
};

export default Register;
