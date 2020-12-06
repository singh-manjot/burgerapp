import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import Button from "../../components/ui/Button/Button";
import Modal from "../../components/ui/Modal/Modal";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const authToken = props.token ? props.token : localStorage.getItem('idToken') ;

  useEffect(() => {
    if (authToken) {
      setLoading(true);
      axios
        .get("/orders.json?auth=" + authToken)
        .then((response) => {
          const fetchedData = [];
          for (let key in response.data) {
            fetchedData.push({
              ...response.data[key],
              id: key,
            });
          }
          setOrders(fetchedData);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [authToken]);

  const redirectToAuth = () => {
    props.history.push({
      pathname: "/auth",
      state: { redirectLocation: "/orders" },
    });
  };

  let content = loading ? (
    <p>Loading...</p>
  ) : authToken ? (
    orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      ></Order>
    ))
  ) : (<Modal show>
    <Button btnType="Danger" clicked={redirectToAuth}>
      Please login to see Orders.
    </Button>
  </Modal>
  );
  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.idToken,
  };
};
export default connect(mapStateToProps, null)(withErrorHandler(Orders, axios));
