import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user_id, setUserid] = useState((location.state[0]._id))
  const [user_name, setUserName] = useState((location.state[0].name))
  const [event_name, setEventName] = useState((location.state[1].event_name))
  const [event_id, setEvent] = useState((location.state[1]._id))
  const [Amount, setAmount] = useState(location.state[2]);

  // console.log(event_id,user_id,event_name)


  //   const [product, setProduct] = useState({
  //     planid: (location.state[2]),
  //     price: (location.state[1]),
  //     userid: (location.state[0]._id),
  //     plan_name:(location.state[3]),
  //     email_limit:(location.state[4]),
  //     lists:(location.state[5])
  //   });

  const makePayment = async (token) => {
    console.log(token);
    // const body = {
    //   token,
    //   //   product,
    //   event_id,
    //   user_id,
    //   event_name,
    //   Amount
    // };
    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        event_id,
        event_name,
        user_id,
        user_name,
        Amount,

      }),
    });
    const data = await res.json();
    console.log(data.receipt);
    if (res.status === 400 || !data) {
      window.alert("Problem in transaction");
      setTimeout(() => {
        navigate("/admin/dashboard")
      }, 3000)
    } else {
      const status = { state: [data.receipt] };
      navigate("/payment/status",status)

    }
    // const header = {
    //   "COntent-Type": "application/json",
    // };
    // return fetch(`http://localhost:5000/create-checkout-session`, {
    //   method: "POST",
    //   headers: header,
    //   body: JSON.stringify(body),
    // })
    //   .then((response) => {
    //     console.log(response)
    //     // const data = await response.json();
    //     // window.alert(response);
    //     if (response.status === 400) {
    //       window.alert("Problem in transaction");
    //       // console.log("Invalid Credentials!!");
    //       navigate("/admin/dashboard")
    //     } else {
    //       // navigate("/payment/status");
    //     }
    //   })
    //   .catch((err) => {
    //     windwow.alert("Error in Payment");
    //     console.log(err)});
  };
  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout
          className="center"
          stripeKey="pk_test_51LKbQ9KAjzxspP2ZuD97jXjcN85fXO8SlU02c3UonZfSLieIIHmNiIjMbPP4Rrty48PQAWIlG4k7wZW6FP7IhYF100l5BGu9vB"
          token={makePayment}
          name={event_name}
        />
      </header>
    </div>
  );
}
export default App;
