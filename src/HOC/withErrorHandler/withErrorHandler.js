import React from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/ui/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal modalClosed={clearError} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
