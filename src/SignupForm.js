import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

const initialValues = {
  userName: "",
  businessName: "",
  email: "",
  phone: ""
}

const validationSchema = Yup.object({
  userName: Yup.string()
    .required('Required'),
  businessName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email!')
    .required('Required'),
  phone: Yup.string(),
})

const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2))
}



// const generateField = (value) => {
//   return React.createElement(
//     Field, 
//     {
//       name: `${value}`, 
//       type: "text", 
//       placeholder: `${value}`
//     },
//     null)
// }



const generateFields = (values) => {
  return (
    values.map(value =>
      <Field 
        name={value}
        type="text"
        placeholder={value}
      />
    )
  )
}


const SignupForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
    {props => {
      const {
        values,
        touched,
        handleSubmit,
        handleBlur,
        errors
      } = props
    
      return (
        <Form>
          {generateFields(Object.keys(initialValues))}
          {/* <Field
            name="userName"
            type="text"
            placeholder="name goes here"
          /> */}
          <button
            type="submit"
          >
          Click to Submit
          </button>
        </Form>
      )
    
    }}


    </Formik>
  )
}

export default SignupForm