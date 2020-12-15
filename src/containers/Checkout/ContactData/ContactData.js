import React, { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";
import withErrorHandler from "../../../HOC/withErrorHandler/withErrorHandler";
import { purchase } from "../../../store/actions/index";

const ContactData = (props) => {
  const [validForm, setValidForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street Address",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    postalCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Postal Code",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        email:true
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
      touched: false,
    },
  });

  const checkValidity = (value, rules) => {
    let isValid = false;

    if (rules && rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules && rules.email) {
      isValid = isValid && value.includes('@');
    }

    return isValid;
  };

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId];
    }

    const orderObject = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
    };

    props.onOrder(orderObject);
    props.history.replace("/");
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    let formIsValid = true;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setValidForm(formIsValid);
  };

  const formElements = [];

  for (let key in orderForm) {
    formElements.push({ id: key, config: orderForm[key] });
  }
  const form = props.loading ? (
    <Spinner></Spinner>
  ) : (
    <form>
      {formElements.map((formElement) => (
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
      ))}
      <Button clicked={props.checkoutCancelledHandler} btnType="Danger">
        Cancel
      </Button>
      <Button clicked={orderHandler} btnType="Success" disabled={!validForm}>
        Place Order
      </Button>
    </form>
  );
  return (
    <div className={classes.ContactData}>
      <h3>Please Fill in Your Details</h3>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (orderData) => dispatch(purchase(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
