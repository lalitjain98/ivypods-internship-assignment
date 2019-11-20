import React from 'react';
import UserInfoFormValidation from '../validations/UserInfo';
import CustomInput from './common/inputs/CustomInput';
import DateInput from './common/inputs/DateInput';
import { languageOptionsObj, hobbiesOptionsObj, genderOptionsObj } from "../constants";

const UserInfoForm = (props) => {
  
  const optionsObjToArray = (optionsObj) => Object.keys(optionsObj).reduce((options, label) => { options.push({ label, value: optionsObj[label] }); return options }, [])

  // const languageOptionsObj = {
  //   'Hindi': 'hindi',
  //   'English': 'english',
  //   'German': 'german',
  //   'French': 'french',
  //   'Tamil': 'tamil',
  // }

  // const genderOptionsObj = {
  //   'Male': 'male',
  //   'Female': 'female'
  // }
  
  // const hobbiesOptionsObj = {
  //   'Music': 'music',
  //   'Dance': 'dance',
  //   'Books': 'books',
  //   'Cooking': 'cooking',
  // }

  const genderOptions = optionsObjToArray(genderOptionsObj);
  const languageOptions = optionsObjToArray(languageOptionsObj);
  const hobbiesOptions = optionsObjToArray(hobbiesOptionsObj)
  const initState = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    gender: '',
    hobbies: {

    },
    languages: null,
    dateOfBirth: null,
    organization: '',
    isValid: false,
    touched: {},
    errors: {}
  }
  const [state, setState] = React.useState(initState);
  const validate = async () => {
    return UserInfoFormValidation.validate(state)
  }
  
  // const handleChange = (e) => {
  //   console.log(e.target.name, e.target.value, e.target.checked)
  //   setState({...state, [e.target.name]: e.target.value})
  // }

  const handleBlur = (name) => {
    console.log("handleBlur", name)
    setState({...state, touched: {...state.touched, [name]: true } })
  }

  // React.useEffect(()=>{
  //   alert(JSON.stringify(state))
  // }, [state])

  const handleChange = (name, value) => {
    console.log(name, value)
    setState({...state, [name]: value})
  }

  const commonInputProps = {
    onChange: handleChange,
    onBlur: handleBlur,
  }

  const validateAndHandleSubmit = async (e) => {
    e.preventDefault();
    let errors = await validate()
    console.log(errors)
    alert(JSON.stringify(state));
  }

  const { errors } = state;

  return (
    <>
      <h1>Subscribe!</h1>
      <form onSubmit={validateAndHandleSubmit}>
        <CustomInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Jane"
          {...commonInputProps}
        />
        <CustomInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
          {...commonInputProps}
        />
        <CustomInput
          label="Mobile Number"
          name="mobileNo"
          type="number"
          placeholder="jon@example.com"
          {...commonInputProps}
        />
        <DateInput 
          name={'dateOfBirth'} 
          label={'Date of Birth'}
          error={errors.dateOfBirth}
          {...commonInputProps}
          />
        <CustomInput
          name="gender" 
          type="radioGroup"
          options={genderOptions}
          {...commonInputProps}
          />
        <CustomInput
          name="hobbies" 
          type="checkboxGroup"
          options={hobbiesOptions}
          {...commonInputProps}
          />
        <CustomInput
          multiple
          name="languages" 
          type="select"
          options={languageOptions}
          {...commonInputProps}
          />
        
        <CustomInput type='checkbox' name="acceptedTerms" label={'I accept the terms and conditions'} {...commonInputProps}/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default UserInfoForm;