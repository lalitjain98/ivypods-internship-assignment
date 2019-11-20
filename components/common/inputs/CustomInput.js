import React from 'react';
import Select from 'react-select';

const CustomInput = ({ multiple = false, type, children, label, onChange, ...props }) => {

  const errorMessage = props.touched && props.error && (
    <div className="error">{props.error}</div>
  );

  const [selectedOption, setSelectedOption] = React.useState(null)
  const [checkedOptions, setCheckedOptions] = React.useState([])


  const handleChange = (e) => {
    e.persist();
    e.target.type === 'checkbox' ? onChange(e.target.name, e.target.checked) : onChange(e.target.name, e.target.value);
  }

  const handleBlur = (e) => {
    e.persist();
    console.log(e)
    props.onBlur(props.name);
  }

  const handleSelectChange = (selectedOption, action) => {

    const optionsObjArrayToValues = (arr = []) => arr && arr.reduce((values, current) => [...values, current.value], [])

    // console.log(action, selectedOption)
    // console.log(action.name, selectedOption && selectedOption.value)
    console.log("Multi", multiple);
    if (!multiple) onChange(action.name, selectedOption.value, selectedOption)
    else onChange(action.name, optionsObjArrayToValues(selectedOption), selectedOption)
    setSelectedOption(selectedOption)
  }

  const handleCheckboxGroupChange = (e) => {
    e.persist();
    let values = [...checkedOptions];
    console.log(e.target.name, e.target.value, e.target.checked);
    if(e.target.checked) {
      values = [...values, e.target.value];
    } else {
      values = values.filter(v => v !== e.target.value);
    }
    setCheckedOptions(values);
    console.log(values);
    onChange(props.name, values);
  }

  const renderInput = () => {
    switch (type) {
      case 'select':
        const { value, disabled, ...rest } = { ...props };
        const selectProps = { ...rest, isDisabled: disabled }
        return (
          <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Select isMulti={multiple} {...selectProps} onBlur={handleBlur} onChange={handleSelectChange} value={value && selectedOption} />
          </>
        )
      case 'checkbox':
        return (
          <label className="checkbox">
            <input type={'checkbox'} {...props} onBlur={handleBlur} onChange={handleChange} />
            {label}
          </label>
        )
      case 'radioGroup':
        return (
          <div className="">
            {
              props.options.map((item, index) => (
                <label className="checkbox" key={index}>
                  <input type="radio" {...props} value={item.value} onBlur={handleBlur} onChange={handleChange} />
                  {item.label}
                </label>
              ))
            }
            {label}
          </div>
        )
      case 'checkboxGroup':
        return (
          <div className="">
            {
              props.options.map((item, index) => (
                <label className="checkbox" key={index}>
                  <input type="checkbox" {...props} value={item.value} onBlur={handleBlur} checked={checkedOptions.includes(item.value)} onChange={handleCheckboxGroupChange} />
                  {item.label}
                </label>
              ))
            }
            {label}
          </div>
        )
      default:
        return (
          <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type={type} className="text-input" {...props} onBlur={handleBlur} onChange={handleChange} />
          </>
        )
    }
  }

  return (
    <div className="input-wrapper">
      {renderInput()}
      {errorMessage}
    </div>
  );
};

export default CustomInput;