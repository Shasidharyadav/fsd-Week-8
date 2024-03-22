import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const EmailVerify = React.lazy(() => import('./views/pages/EmailVerify/index'))
const Payment = React.lazy(() => import('./views/pages/payment/Payment'))
const PaymentSuccess = React.lazy(() => import('./views/pages/payment/PaymentSuccess'));

// const AdminDefalut = React.lazy(() => import('./views/admin/layout/DefaultLayout'))

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/:id/verify/:token" name="EmailVerify" element={<EmailVerify />} />
            <Route exact path="/payment" name="Payment" element={<Payment />} />
            <Route exact path="/payment/status" name="paymentstatus" element={<PaymentSuccess/>} />
s
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
