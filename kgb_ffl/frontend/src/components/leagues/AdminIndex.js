import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { retrieveCommishLeagues } from "../../actions/league";
import { Link } from "react-router-dom";

export class AdminIndex extends Component {
  static propTypes = {
    commishLeagues: PropTypes.array
  };

  componentDidMount() {
    this.props.retrieveCommishLeagues();
  }

  render() {
    return (
      <div>
        <h4>Admin Index</h4>
        {this.props.commishLeagues.map((league, index) => {
          return (
            <div key={index}>
              {" "}
              <Link to={`/admin/${league.id}`}>{league.name}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commishLeagues: state.admin.commishLeagues
});

export default connect(
  mapStateToProps,
  { retrieveCommishLeagues }
)(AdminIndex);
