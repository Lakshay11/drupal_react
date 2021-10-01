import React from 'react';
import axios from 'axios';
export default class App extends React.Component {
  // define constructor
  constructor(props) {
    super(props);

    this.state = {
      node: [],
      loading: true,
      error: null,
    };
  }

  // Life cycle 
  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://drupal9.info/api/article/4`,
        ),
      )
      .then(response => {
        const node = response.data;
        this.setState({
          node,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  // Loading state 
  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  // error state 
  renderError() {
    return (
      <div>
        <div>
          Sorry, an error ocurred: {this.state.error.response.data.message}
        </div>
      </div>
    );
  }

  // output state 
  renderList() {
    const { error } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <div className="Content-wrapper">
          {
            this.state.node.map(d=>
              <div className="content-container">{d.title}</div>)
          }
      </div>
    );
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderList();
  }
}
