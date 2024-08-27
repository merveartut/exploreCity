import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { loginValidations } from "../validations";
import "./styles.css";
import Modal from "../../Modal/Modal";
import usePost from "../../../hooks/usePost/usePost";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBCol,
  MDBRow
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../../../context/slices/loginSlice";
function Form() {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const { data, loading, error, loginUser } = usePost();
  const dispatch = useDispatch()
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    errors,
    touched,
    isValid
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberme: false,
    },
    onSubmit: (values) => {
      setTimeout(() => {
       setShowModal(true)
       loginUser(values)
       dispatch(setLoggedIn())
       navigate("/")
      }, 400);
    },
    validationSchema: loginValidations,
  });
  if (error) {
    alert("error", error)
  }
  const formValid = isValid && Object.keys(touched).length > 0;
  return (
    <form onBlur={handleBlur} onSubmit={handleSubmit}>
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px", width: "500px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">
              WELCOME BACK
            </h2>
            <MDBRow>
            <MDBCol className='d-flex flex-column align-items-center'>
            <div className="w-100 mb-4">
              <MDBInput
                name="email"
                onChange={handleChange}
                value={values.email}
                style={{
                  borderColor: errors.email && touched.email ? "red" : null,
                }}
                placeholder="Your Email"
                size="lg"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
            </div>

           
            <div className="w-100 mb-4">
              <MDBInput
                name="password"
                onChange={handleChange}
                value={values.password}
                style={{
                  borderColor:
                    errors.password && touched.password ? "red" : null,
                }}
                placeholder="Password"
                size="lg"
                id="form3"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="error">{errors.password}</div>
              ) : null}
            </div>


            <div className="w-100 d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="rememberme"
                label="Remember me"
                value={values.rememberme}
                onChange={handleChange}
              />
            </div>
            <MDBBtn
              className="w-100 gradient-custom-4"
              disabled={!formValid || Object.keys(errors).length || loading}
              type="submit"
            >
              Login
            </MDBBtn>
            <div
            >
              Don't have an account ? <MDBBtn onClick={() => navigate("/signup")} className="gradient-custom-5 p-2">Register !</MDBBtn>
            </div>
            </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default Form;
