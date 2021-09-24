import React, { useEffect } from "react";
import { retrieveCommishLeagues } from "../../actions/ffl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AdminIndex = () => {
  const dispatch = useDispatch();
  const commishLeagues = useSelector(state => state.admin.commishLeagues);
  console.log(commishLeagues);

  useEffect(() => {
    dispatch(retrieveCommishLeagues());
  }, []);

  return (
    <div>
      <h4>Admin Index</h4>
      {commishLeagues &&
        commishLeagues.map((league, index) => {
          return (
            <div key={index}>
              {" "}
              <Link to={`/admin/${league.id}`}>{league.name}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default AdminIndex;

/*
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
*/
