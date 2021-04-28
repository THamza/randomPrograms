import {
  TOGGLE_DIALOG,
  SELECT_APPOINTMENT,
  UPDATE_APPOINTMENT,
  UPDATE_FORM
} from './actionTypes';

export const toggleDialog = () => ({
  type: TOGGLE_DIALOG,
});

export const selectAppointment = appointmentItem => ({
  type: SELECT_APPOINTMENT,
  payload: {
    time: appointmentItem.time,
    name: appointmentItem.name,
    phone: appointmentItem.phone,
    available: appointmentItem.available,
  }
});

export const updateAppointment = (appointmentData) => ({
  type: UPDATE_APPOINTMENT,
  payload : {
    appointmentData
  },
  appointmentData
});

export const updateForm = (appointmentItem) => ({
  type: UPDATE_FORM,
  payload: {
    time: appointmentItem.time,
    name: appointmentItem.name,
    phone: appointmentItem.phone,
    available: appointmentItem.available,
  }
});
