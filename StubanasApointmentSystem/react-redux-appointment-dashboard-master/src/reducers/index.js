import {
  TOGGLE_DIALOG,
  SELECT_APPOINTMENT,
  UPDATE_APPOINTMENT,
  UPDATE_FORM
} from '../actions/actionTypes';

// just using 1 reducer since so few things to keep track of..
export default function rootReducer(state = getInitialState(), action) {
  switch (action.type) {
    case TOGGLE_DIALOG:
      let newState = {
        ...state,
        open: !state.open
      }
      localStorage.setItem('data', JSON.stringify(newState));
      return newState

    case SELECT_APPOINTMENT:
      return {
        ...state,
        selectedAppointment: action.payload
      }      
    case UPDATE_FORM:
      return {
        ...state,
        selectedAppointment: action.payload
      };

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointmentData: action.payload.appointmentData
      }

    default:
      return state;
  }
}

const getInitialState = () => {
  var localData = JSON.parse(localStorage.getItem('data'));
  if (localData) {
    return localData
  } else {
    return initialState
  }
}

const initialState = {
  appointmentData: [{
      time: "9:00am-10:00am",
      name: "John Doe",
      phone: 5554035521,
      available: false
    },
    {
      time: "10:00am-11:00am",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "11:00am-12:00pm",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "12:00pm-1:00pm",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "1:00pm-2:00pm",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "2:00pm-3:00pm",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "3:00pm-4:00pm",
      name: '',
      phone: '',
      available: true
    },
    {
      time: "4:00pm-5:00pm",
      name: '',
      phone: '',
      available: true
    },
  ],
  open: false,
  selectedAppointment: {
    time: '',
    name: '',
    phone: '',
    available: true
  }
};