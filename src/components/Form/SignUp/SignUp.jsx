import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBValidationItem,
  MDBRadio,
  MDBCol,
  MDBRow,
  MDBValidation,
} from "mdb-react-ui-kit";
import "./styles.css";
import { useFormik } from "formik";
import { signUpvalidations } from "../validations";
import usePost from "../../../hooks/usePost/usePost";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { data, loading, error, addUser } = usePost();
  const navigate = useNavigate()
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      gender: null,
      country: "",
      agreement: false,
    },
    onSubmit: (values) => {
      setTimeout(() => {
        const { passwordConfirm, ...postData } = values;
        addUser(postData);
        navigate("/users")
      }, 400);
    },
    validationSchema: signUpvalidations,
  });
  if (error) {
    Alert.alert("User signup failed, there is an error !");
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
              Create an account
            </h2>
            <MDBRow>
              <MDBCol md="6">
                <div className="mb-4">
                  <MDBInput
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    style={{
                      borderColor:
                        errors.firstName && touched.firstName ? "red" : null,
                    }}
                    size="lg"
                    id="form1"
                    type="text"
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className="error">{errors.firstName}</div>
                  ) : null}
                </div>
              </MDBCol>

              <MDBCol md="6">
                <div className="mb-4">
                  <MDBInput
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    style={{
                      borderColor:
                        errors.lastName && touched.lastName ? "red" : null,
                    }}
                    size="lg"
                    id="form2"
                    type="text"
                  />
                  {errors.lastName && touched.lastName ? (
                    <div className="error">{errors.lastName}</div>
                  ) : null}
                </div>
              </MDBCol>
            </MDBRow>
            <div className="mb-4">
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

            <select
              name="country"
              value={values.country}
              onChange={handleChange}
              class="custom-select mb-4"
              id="inputGroupSelect01"
            >
              <option selected>Country</option>
              <option value="Turkey">Turkey</option>
              <option value="Italy">Italy</option>
              <option value="France">France</option>
            </select>
            <MDBCol md="12" className="mb-4 d-flex">
              <h6 className="fw-bold mr-4">Gender: </h6>
              <MDBRadio
                onChange={handleChange}
                value="female"
                name="gender"
                label="Female"
                inline
              />
              <MDBRadio
                onChange={handleChange}
                value="male"
                name="gender"
                label="Male"
                inline
              />
              <MDBRadio
                onChange={handleChange}
                value="other"
                name="gender"
                label="Other"
                inline
              />
            </MDBCol>
            <div className="mb-4">
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

            <div className="mb-4">
              <MDBInput
                name="passwordConfirm"
                onChange={handleChange}
                value={values.passwordConfirm}
                style={{
                  borderColor:
                    errors.passwordConfirm && touched.passwordConfirm
                      ? "red"
                      : null,
                }}
                placeholder="Repeat your password"
                size="lg"
                id="form4"
                type="password"
              />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className="error">{errors.passwordConfirm}</div>
              ) : null}
            </div>

            <div className="d-flex flex-row justify-content-center mb-4">
              <MDBCheckbox
                name="agreement"
                label="I agree all statements in Terms of service"
                value={values.agreement}
                onChange={handleChange}
                required
              />
            </div>
            <MDBRow>
            <MDBCol className='d-flex flex-column align-items-center'>
            <MDBBtn
              className="w-100 gradient-custom-4"
              disabled={!formValid || Object.keys(errors).length || loading}
              type="submit"
            >
              Register
            </MDBBtn>
            <div
            >
              Already have an account ? <MDBBtn onClick={() => navigate("/login")} className="gradient-custom-5 p-2">Login here !</MDBBtn>
            </div>
            </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default SignUp;
