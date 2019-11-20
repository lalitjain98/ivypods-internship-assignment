import * as Yup from 'yup';
import { languageOptionsObj, hobbiesOptionsObj, genderOptionsObj } from "../constants";
const UserInfo = Yup.object({
  name: Yup.string()
    .min(3,  `Must be 3 characters or more`)
    .max(100,  `Must be 100 characters or less`)
    .required('Required'),
  email: Yup.string()
    .email('Invalid email addresss`')
    .required('Required'),
  mobileNo: Yup.string()
    .matches(/[0-9]+/, { message: 'Phone number is not valid', excludeEmptyString: false })
    .test('len', 'Must be 10 Digit Phone Number', val => val.length === 10)
    .required('Required'),
  hobbies: Yup.array()
    .ensure()
    .of( Yup.mixed().oneOf(Object.values(hobbiesOptionsObj)),'Invalid Hobby'),
  gender: Yup.mixed()
    .required('Required')
    .oneOf(Object.values(genderOptionsObj),`Must be one of ${Object.keys(genderOptionsObj).join(', ')}`),
  languages: Yup.array()
    .ensure()
    .of( Yup.mixed().oneOf(Object.values(languageOptionsObj)),'Invalid Hobby'),
  
})

export default UserInfo;