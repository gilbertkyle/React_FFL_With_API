import React, { Component, Fragment } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { ButtonGroup } from "react-bootstrap";
import { getPicksAdmin } from "../../actions/admin";
import AdminPickForm from "./AdminPickForm";
import { withRouter } from "react-router-dom";

export class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: props.week || 1
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    getPicksAdmin: PropTypes.func.isRequired,
    picks: PropTypes.array
  };

  componentDidMount() {
    this.props.getPicksAdmin(this.props.match.params.id, this.props.match.params.username);
  }

  handleClick(e) {
    let week = e.target.innerText;
    this.setState({
      week: week
    });
  }

  render() {
    return (
      <Fragment>
        <h5>User: {this.props.match.params.username}</h5>
        <ButtonGroup size="sm" className="flex-wrap">
          {this.props.picks.map((pick, index) => (
            <button
              key={index}
              className="btn btn-outline-secondary"
              onClick={this.handleClick.bind(this)}
            >
              {pick.week}
            </button>
          ))}
        </ButtonGroup>
        <h3>Week: {this.state.week}</h3>
        <AdminPickForm week={this.state.week} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  picks: state.admin.picks
});

export default connect(
  mapStateToProps,
  { getPicksAdmin }
)(withRouter(AdminProfile));
