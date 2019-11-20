import React from 'react';
import UserInfoFormValidation from '../validations/UserInfo';
import CustomInput from './common/inputs/CustomInput';
import DateInput from './common/inputs/DateInput';
import { languageOptionsObj, hobbiesOptionsObj, genderOptionsObj } from "../constants";

class UserInfoForm extends React.Component {
  
  initState = {
    name: '',
    email: '',
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
  // const [state, setState] = React.useState(initState);
  constructor(props){
    super(props);
    this.state = {...this.initState}
  }

  optionsObjToArray = (optionsObj) => Object.keys(optionsObj).reduce((options, label) => { options.push({ label, value: optionsObj[label] }); return options }, [])
 
  genderOptions = this.optionsObjToArray(genderOptionsObj);
  languageOptions = this.optionsObjToArray(languageOptionsObj);
  hobbiesOptions = this.optionsObjToArray(hobbiesOptionsObj)
  
  validate = async () => {
    try {
      let valid = await UserInfoFormValidation.validate(this.state, { abortEarly: false });
      this.setState(state=>({...state, errors: {}}))
      return valid;
      // console.log(valid);
    } catch(validationErrors) {
      console.log(validationErrors)
      const allErrors = validationErrors.inner.reduce((errors, currentValidation) => Object.assign(errors, {
        [currentValidation.path]: currentValidation.errors[0], //first error is enough for this demo
      }), {});
      this.setState(state => ({...state, errors: allErrors}))
      console.log('allErrors', allErrors)
      return allErrors;
    }
  }
  
  handleBlur = async (name) => {
    console.log("handleBlur", name);
    this.setState(state => ({...state, touched: {...state.touched, [name]: true } }));
  }

  handleChange = async (name, value) => {
    console.log(name, value);
    this.setState(state => ({...state, [name]: value}));
  }  

  validateAndHandleSubmit = async (e) => {
    e.preventDefault();
    let errors = await this.validate()
    console.log(this.state);
  }

  render() {
    const { errors, touched } = this.state;
    const commonInputProps = {
      onChange: this.handleChange,
      onBlur: this.handleBlur,
    }
    return (
      <>
        <h1 className="user-info-form-title">Please Fill out the Form!</h1>
        <form className="user-info-form" onSubmit={this.validateAndHandleSubmit}>
          <CustomInput
            label="Name"
            name="name"
            type="text"
            placeholder="Jon"
            touched={touched.name}
            error={errors.name}
            {...commonInputProps}
          />
          <CustomInput
            label="Email"
            name="email"
            type="email"
            placeholder="jon@example.com"
            touched={touched.email}
            error={errors.email}
            {...commonInputProps}
          />
          <CustomInput
            label="Mobile Number"
            name="mobileNo"
            type="number"
            placeholder="9876543210"
            touched={touched.mobileNo}
            error={errors.mobileNo}
            {...commonInputProps}
          />
          <DateInput 
            name={'dateOfBirth'} 
            label={'Date of Birth'}
            error={errors.dateOfBirth}
            touched={touched.dateOfBirth}
            error={errors.dateOfBirth}
            {...commonInputProps}
            />
          <CustomInput
            label={'Gender'}
            name="gender" 
            type="radioGroup"
            options={this.genderOptions}
            touched={touched.gender}
            error={errors.gender}
            {...commonInputProps}
            />
          <CustomInput
            name="hobbies" 
            label={'Hobbies'}
            type="checkboxGroup"
            options={this.hobbiesOptions}
            touched={touched.hobbies}
            error={errors.hobbies}
            {...commonInputProps}
            />
          <CustomInput
            multiple
            label={'Languages'}
            name="languages" 
            type="select"
            options={this.languageOptions}
            touched={touched.languages}
            error={errors.languages}
            {...commonInputProps}
            />
          
          {/* <CustomInput type='checkbox' name="acceptedTerms" label={'I accept the terms and conditions'} {...commonInputProps}/> */}
          <div className="submit-button-wrapper">
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    )
  }
}

export default UserInfoForm;