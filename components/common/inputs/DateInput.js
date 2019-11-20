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
    yearOptions: range(1970, moment().year()+1),
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
          const dayOfCurrentMonth = moment().year(moment().year()).month(moment().month()).date()+1
          if(newState.year == moment().year() && newState.month == moment().month()+1) {
            newState.dayOptions = range(1, dayOfCurrentMonth)
          } else {
            newState.dayOptions = range(1, moment().year(newState.year).month(newState.month-1).daysInMonth()+1)
          }
        break;
      case `${name}_year`:
          newState.year = value;
          if(value == moment().year()) newState.monthOptions = range(1, moment().month()+2)
          else newState.monthOptions = range(1, 13)
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
    <div className={`${props.dateInputContainerClassName|| 'input-wrapper label-input-wrapper'}`}>
      <label htmlFor="date">{label}</label>
      <div className="date-select-wrapper">
      <CustomInput
          name={`${name}_year`}
          type="select"
          value={year}
          options={optionsArrayToObjectsArray(state.yearOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Year"
          // isSearchable={false}
          // label={'Year'}
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
          // isSearchable={false}
          // label={'Month'}
        />
        <CustomInput
          name={`${name}_day`}
          type="select"
          value={day}
          options={optionsArrayToObjectsArray(state.dayOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Day"
          disabled={!month}
          // isSearchable={false}
          // label={'Day'}
        />
      </div>
      {errorMessage}
    </div>
  );
};

export default DateInput;