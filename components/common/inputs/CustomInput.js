import React from 'react';
import Select from 'react-select';

const CustomInput = ({ multiple = false, type, children, label, onChange, ...props }) => {

  const errorMessage = props.error && (
    <div className="error">{props.error}</div>
  );

  const [selectedOption, setSelectedOption] = React.useState(null)
  const [checkedOptions, setCheckedOptions] = React.useState([])


  const handleChange = (e) => {
    e.persist();
    // console.log(e)
    console.log(e.target.name, e.target.value, e.target.checked);
    e.target.type === 'checkbox' ? onChange(e.target.name, e.target.checked) : onChange(e.target.name, e.target.value);
  }

  const handleBlur = (e) => {
    e.persist();
    // console.log(e)
    props.onBlur(props.name);
  }

  const handleSelectChange = (e) => {
    e.persist();
    // console.log(e.target.selectedOptions)
    const optionsObjArrayToValues = arr => arr && arr.reduce((values, current) => [...values, current.value], [])
    const selectedOptions = optionsObjArrayToValues([...e.target.selectedOptions]);
    // console.log("Multi", multiple);
    if (!multiple) {
      onChange(e.target.name, e.target.value);
    } else {
      onChange(e.target.name, selectedOptions);
    }
    setSelectedOption(selectedOptions)
  }


  // const handleSelectChange = (selectedOption, action) => {

  //   const optionsObjArrayToValues = (arr = []) => arr && arr.reduce((values, current) => [...values, current.value], [])

  //   // console.log(action, selectedOption)
  //   // console.log(action.name, selectedOption && selectedOption.value)
  //   console.log("Multi", multiple);
  //   if (!multiple) onChange(action.name, selectedOption.value, selectedOption)
  //   else onChange(action.name, optionsObjArrayToValues(selectedOption), selectedOption)
  //   setSelectedOption(selectedOption)
  // }

  const handleCheckboxGroupChange = (e) => {
    e.persist();
    let values = [...checkedOptions];
    console.log(e.target.name, e.target.value, e.target.checked);
    if (e.target.checked) {
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
        // const { value, disabled, ...rest } = { ...props };
        // const selectProps = { ...rest, isDisabled: disabled }
        const { value, ...rest } = { ...props };
        const selectProps = { ...props }
        // console.log(props);
        return (
          <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select
              multiple={multiple}
              {...selectProps}
              onBlur={handleBlur}
              onChange={handleSelectChange}
              value={value && selectedOption}
            >
              <option value="" disabled>{props.placeholder || 'Select Value'}</option>
              {
                props.options.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))
              }
            </select>
            {/* <Select isMulti={multiple} {...selectProps} onBlur={handleBlur} onChange={handleSelectChange} value={value && selectedOption} /> */}
          </>
        )
      // case 'checkbox':
      //   return (
      //     <label className="checkbox">

      //       {label}
      //     </label>
      //     <div className={`ui checkbox ${ && "checked"}`} key={props.name}>
      //       <input type={'checkbox'} {...props} onBlur={handleBlur} onChange={handleChange} />            
      //       <label htmlFor={props.name}>{label}</label>
      //     </div>
      //   )
      case 'radioGroup':
        return (
          <div className="checkbox-group-wrapper">
            <label htmlFor={props.name}>{label}</label>
            {
              props.options.map((item, index) => (

                <div className={`ui checkbox checkbox-container radio ${checkedOptions.includes(item.value) && "checked"}`} key={item.value}>
                  <input type="radio" {...props} value={item.value} onBlur={handleBlur} onChange={handleChange} />
                  <label htmlFor={item.value}>{item.label}</label>
                </div>
              ))
            }

          </div>
        )
      case 'checkboxGroup':
        return (
          <div className="checkbox-group-wrapper">
            <label htmlFor={props.name}>{label}</label>
            {
              props.options.map((item, index) => (
                <div className={`ui checkbox checkbox-container ${checkedOptions.includes(item.value) && "checked"}`} key={item.value}>
                  <input type="checkbox" {...props} value={item.value} onBlur={handleBlur} checked={checkedOptions.includes(item.value)} onChange={handleCheckboxGroupChange} />
                  <label htmlFor={item.value}>{item.label}</label>
                </div>
              ))
            }
          </div>
        )
      default:
        return (
          <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input autoComplete={props.name} type={type} className="text-input" {...props} onBlur={handleBlur} onChange={handleChange} />
          </>
        )
    }
  }

  return (
    <div className={`${props.inputContainerClassName || 'input-wrapper'}`}>
      <div className="label-input-wrapper">
        {renderInput()}
      </div>
      {errorMessage}
    </div>
  );
};

export default CustomInput;