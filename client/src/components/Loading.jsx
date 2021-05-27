import React from "react";
import { Spinner } from "react-bootstrap";

export default class Loading extends React.Component {
  state = {
    loading: false,
  };

  setLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <button className="button" onClick={this.setLoading}>
          Login
          {this.state.loading && (
            <Spinner animation="border" role="status"></Spinner>
          )}
        </button>
      </div>
    );
  }
}
