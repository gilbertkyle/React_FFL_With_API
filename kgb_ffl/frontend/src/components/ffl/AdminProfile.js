import React, { Component, Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ButtonGroup } from "react-bootstrap";
import { getPicksAdmin } from "../../actions/admin";
import AdminPickForm from "./AdminPickForm";
import PickForm from "./PickForm";
import { withRouter, useParams } from "react-router-dom";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { id, username } = useParams();
  const [week, setWeek] = useState(1);
  const picks = useSelector(state => state.admin.picks);

  useEffect(() => {
    dispatch(getPicksAdmin(id, username));
  }, []);

  return (
    <Fragment>
      <h5>User: {username}</h5>
      <ButtonGroup size="sm" className="flex-wrap">
        {picks.map((pick, index) => (
          <button
            key={index}
            className="btn btn-outline-secondary"
            onClick={e => setWeek(e.target.value)}
          >
            {pick.week}
          </button>
        ))}
      </ButtonGroup>
      <h3>Week: {week}</h3>
      <PickForm week={week} admin />
    </Fragment>
  );
};

export default AdminProfile;
/*
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
*/
