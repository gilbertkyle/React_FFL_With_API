import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayers } from '../../actions/players';

export class Players extends Component {

    static propTypes = {
        players: PropTypes.array.isRequired
    }

    
    componentDidMount() {
        this.props.getPlayers();
    }
    

    render() {
        return (
            <div>
                <h2>Players go here</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players.players
});

export default connect(mapStateToProps, { getPlayers })(Players);
