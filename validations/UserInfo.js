import * as Yup from 'yup';
import { languageOptionsObj, hobbiesOptionsObj, genderOptionsObj } from "../constants";
const UserInfo = Yup.object({
  firstName: Yup.string()
    .min(3,  `Must be 3 characters or less`)
    .max(100,  `Must be 100 characters or less`)
    .required('Required'),
  lastName: Yup.string()
    .max(100, 'Must be 100 characters or less'),
    // .required('Required'),
  email: Yup.string()
    .email('Invalid email addresss`')
    .required('Required'),
  mobileNo: Yup.number()
    .integer('Must not have decimal point')
    .test('len', `Must be exactly 10 digits`, val => val && val.toString().length === 10)
    .required('Required'),
  hobbies: Yup.array()
    .of( Yup.mixed().oneOf(Object.values(hobbiesOptionsObj)),'Invalid Hobby'),
  gender: Yup.mixed()
    .oneOf(Object.values(genderOptionsObj),'Invalid Gender'),
  languages: Yup.array()
    .of( Yup.mixed().oneOf(Object.values(hobbiesOptionsObj)),'Invalid Hobby'),
  
})

export default UserInfo;