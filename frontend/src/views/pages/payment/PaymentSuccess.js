import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import axios from "axios";
// import success from ".../images/success.png";
import styles from "./styles.module.css";
import success from "src/Images/success.png";




const PaymentSuccess = () => {
	const location = useLocation();
	console.log(location.state)
	const [receipt, setReceipt] = useState((location.state[0]))


	return (
		<Fragment>
			<div className={styles.container}>
				<img src={success} alt="success_img" className={styles.success_img} />
				<h1>Donation successfull</h1>
				<h1>Thank you for being a important part of this event!!</h1>
				
				<a href={receipt} target="_blank" rel="noreferrer">
				<button className={styles.green_btn}>Downlaod Receipt</button>
				</a>
				<Link to="/admin/dashboard">
					<button className={styles.green_btn}>Go to Dashboard</button>
				</Link>
			</div>


		</Fragment>
	);
};

export default PaymentSuccess;