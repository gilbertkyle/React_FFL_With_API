import React, { Component, Fragment, useEffect } from "react";
import { withRouter, Link, useParams } from "react-router-dom";
import { getUsersInLeague } from "../../actions/admin";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

const AdminHome = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUsersInLeague(id));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <td>Username</td>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/admin/${id}/${user.username}`}>{user.username}</Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default AdminHome;

/*
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
*/
