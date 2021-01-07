import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const App = (props) => {
  const { searchField, onSearchChange, robots, isPending, onRequestRobots } = props;

  useEffect(() => {
    onRequestRobots();
  }, []);

  const filterRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));

  return isPending ?
    <h1>Loading</h1> :
    (
      <div id='app' className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots}/>
          </ErrorBoundry>
        </Scroll>
      </ div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);