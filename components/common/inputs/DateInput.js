import React from 'react';
import moment from 'moment';
import { range } from 'lodash';
import CustomInput from './CustomInput';

const DateInput = ({ name, children, label, ...props }) => {

  const initState = {
    dateValue: '',
    day: '',
    month: '',
    year: '',
    touched: false,
    dayOptions: [],
    monthOptions: range(1, 13),
    yearOptions: range(2015, 2100),
  }

  const optionsArrayToObjectsArray = (optionsArray) => optionsArray.reduce((options, label) => { options.push({ label, value: label }); return options }, [])

  const [state, setState] = React.useState(initState)

  const handleChange = (selectName, value) => {
    let newState = {...state}
    switch (selectName) {
      case `${name}_day`:
        newState.day = value;
        break;
      case `${name}_month`:
          newState.month = value;
          newState.day = '';
          console.log(newState.year, newState.month, moment().year(newState.year).month(newState.month-1).daysInMonth())
          newState.dayOptions = range(1, moment().year(newState.year).month(newState.month-1).daysInMonth()+1)
        break;
      case `${name}_year`:
          newState.year = value;
          newState.month = '';
          newState.day = '';
        break;
    }
    setState(newState);
    const dateValue = (({day, month, year}) => ({day, month, year}))(newState);
    // alert(JSON.stringify(dateValue))
    props.onChange(name, dateValue)
  }

  const handleBlur = () => {
    setState({ ...state, touched: true })
  }

  const errorMessage = props.touched && props.error && (
    <div className="error">{props.error}</div>
  );

  const { day, month, year } = state;
  return (
    <div className="input-wrapper">
      <div className="date-select-input-wrapper">
        <CustomInput
          name={`${name}_day`}
          type="select"
          value={day}
          options={optionsArrayToObjectsArray(state.dayOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Day"
          disabled={!month}
          isSearchable={false}
        />
        <CustomInput
          name={`${name}_month`}
          type="select"
          value={month}
          options={optionsArrayToObjectsArray(state.monthOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Month"
          disabled={!year}
          isSearchable={false}
        />
        <CustomInput
          name={`${name}_year`}
          type="select"
          value={year}
          options={optionsArrayToObjectsArray(state.yearOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Year"
          isSearchable={false}
        />
      </div>
      {errorMessage}
    </div>
  );
};

export default DateInput;