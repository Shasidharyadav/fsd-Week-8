// import React from "react";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";


import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";

// import avatar1 from "src/assets/images/avatars/1.jpg";
// import avatar2 from "src/assets/images/avatars/2.jpg";
// import avatar3 from "src/assets/images/avatars/3.jpg";
// import avatar4 from "src/assets/images/avatars/4.jpg";
// import avatar5 from "src/assets/images/avatars/5.jpg";
// import avatar6 from "src/assets/images/avatars/6.jpg";

import WidgetsBrand from "../widgets/WidgetsBrand";
import WidgetsDropdown from "../widgets/WidgetsDropdown";

const Dashboard = () => {
  const navigate = useNavigate();

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
    const callAboutPage = async () => {
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
        // window.alert("user dashboard")
        console.log(user);
  
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
    <>
      <WidgetsDropdown />
        
    </>
  );
};

export default Dashboard;
