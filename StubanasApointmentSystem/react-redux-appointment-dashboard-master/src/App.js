import React, { Component } from 'react';
import './App.css';
import AppointmentDashboard from './components/AppointmentDashboard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>React-Redux Appointment Scheduler</h1>
				<AppointmentDashboard></AppointmentDashboard>
			</div>
		);
	}
}

export default App;
