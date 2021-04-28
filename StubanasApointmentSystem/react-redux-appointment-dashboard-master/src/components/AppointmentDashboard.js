import React, { Component } from 'react';
import AppointmentItem from './AppointmentItem'
import List from '@material-ui/core/List';
import AppointmentEditDialog from './AppointmentEditDialog';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/actions';

class AppointmentDashboard extends Component {

	_openEditModal = (appointmentItem) => {
		this.props.action.toggleDialog();
		this.props.action.selectAppointment(appointmentItem);
	}

	_closeEditModal = () => {
		this.props.action.toggleDialog();
	}

    _handleChange = (e) => {
		let newSelectedAppointment = {
			...this.props.selectedAppointment,
			[e.target.id]: e.target.value
		};
		this.props.action.updateForm(newSelectedAppointment);
    }

	_handleSave = () => {
		let updatedAppointment;
		// edit state of availability to conditionally render red background
		if (this.props.selectedAppointment.name !== '' || this.props.selectedAppointment.phone !== '') {
			updatedAppointment = {
		    	...this.props.selectedAppointment,
		    	available: false
			};
		} else {
			updatedAppointment = {
		    	...this.props.selectedAppointment,
		    	available: true
			};
		}

		// find selectedApt and replace it in main data src
		let newAppointmentDataArray = this.props.appointmentData.map(appointment => {
			if (appointment.time === this.props.selectedAppointment.time) {
		    	return updatedAppointment;
			} else {
		    	return appointment;
			}
		});

		this.props.action.updateAppointment(newAppointmentDataArray);
		this.props.action.toggleDialog();
	}

	render() {
		let appointmentsArray = this.props.appointmentData.map(appointmentItem => {
			return (
				<div onClick={() => this._openEditModal(appointmentItem)} key={appointmentItem.time}>
					<AppointmentItem 
					time={appointmentItem.time} 
					name={appointmentItem.name} 
					phone={appointmentItem.phone}
					available={appointmentItem.available} 
					/>
				</div>
			)
		});

		return (
			<div className="appointment-dashboard">
				<List component="nav">
					{appointmentsArray}
				</List>
				<AppointmentEditDialog
					open={this.props.open}
					handleClose={this._closeEditModal}
					selectedAppointment={this.props.selectedAppointment}
					handleChange={this._handleChange}
					handleSave={this._handleSave}
				>
				</AppointmentEditDialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	appointmentData: state.appointmentData,
	open: state.open,
	selectedAppointment: state.selectedAppointment
});

const mapDispatchToProps = (dispatch) => ({
	action: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDashboard);
