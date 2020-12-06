import React, { useState } from "react";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/ui/Spinner/Spinner";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const [formControls, setFormControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Pass",
      },
      value: "",
      validation: {
        required: true,
        minLength: 7,
      },
      valid: false,
      touched: false,
    },
  });

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...formControls,
      [controlName]: {
        ...formControls[controlName],
        value: event.target.value,
        touched: true,
        valid: checkValidity(
          event.target.value,
          formControls[controlName].validation
        ),
      },
    };
    setFormControls(updatedControls);
  };

  const checkValidity = (value, rules) => {
    let isValid = false;

    if (rules && rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules && rules.isEmail) {
      value = value.trim();
      isValid = value.includes("@");
    }
    if (rules && rules.minLength) {
      isValid = value.length > rules.minLength;
    }
    return isValid;
  };

  const formElements = [];

  for (let key in formControls) {
    formElements.push({ id: key, config: formControls[key] });
  }

  let errMessage = null;
  let form = formElements.map((formElement) => (
    <Input
      key={formElement.id}
      inputtype={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => {
        inputChangeHandler(event, formElement.id);
      }}
    />
  ));

  form = props.loading ? <Spinner></Spinner> : form;
  const localId = props.localId
    ? props.localId
    : localStorage.getItem("localId");
  const token = props.idToken ? props.idToken : localStorage.getItem("idToken");
  const redirectLocation =
    props.history.location.state &&
    props.history.location.state.redirectLocation
      ? props.history.location.state.redirectLocation
      : "/";
  let displayLink = (
    <Redirect
      to={{
        pathname: redirectLocation,
        state: { idToken: token, localId: localId },
      }}
    />
  );

  form = localId ? <>{displayLink}</> : form;

  if (props.error) errMessage = <p style={{ color: "red" }}>{props.error}</p>;

  return (
    <div className={classes.Auth}>
      <h3 style={{ fontWeight: "bold", color:"brown" }}>Login </h3>
      {errMessage}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onAuth(formControls.email.value, formControls.password.value);
        }}
      >
        {form}
        {!localId && <Button btnType="Success">Submit</Button>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    redirect: state.auth.redirect,
    localId: state.auth.localId,
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass) => dispatch(actions.auth(email, pass)),
    logoutUser: () => dispatch(actions.logoutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
