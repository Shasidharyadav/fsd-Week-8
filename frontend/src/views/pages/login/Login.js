import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  CAlert
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted ✅");
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [info, setInfo] = useState(false);


  const loginUser = async (e) => {
    e.preventDefault();
    setInfo(true);
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
  if (res.status === 200 && data.role_id == 1) {
      setVisible(true);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 3000) 
    }
    else{
      setInvalid(true);
    }
  
   
  };
  return (
    <form onSubmit={handleSubmit} method="POSt">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
        <CAlert color="primary" visible={visible}>
            Login Successfull!!
            </CAlert>
            <CAlert color="danger" visible={invalid}>
            Invalid Credentials!!
            </CAlert>
            <CAlert color="info" visible={info}>
            Please Wait...
            </CAlert>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          autoComplete="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            onClick={loginUser}
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Have not registered yet????</p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
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

export default Login;
