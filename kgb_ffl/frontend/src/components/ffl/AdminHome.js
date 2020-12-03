import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { getUsersInLeague } from "../../actions/admin";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class AdminHome extends Component {
  static propTypes = {
    users: PropTypes.array
  };

  componentDidMount() {
    this.props.getUsersInLeague(this.props.match.params.id);
  }

  render() {
    const { users } = this.props;
    const { id } = this.props.match.params;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Username</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/admin/${id}/${user.username}`}>{user.username}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
});

export default connect(
  mapStateToProps,
  { getUsersInLeague }
)(withRouter(AdminHome));
