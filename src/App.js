import React, { Component } from 'react';
import * as Yup from 'yup';
import './App.css';

// testing miniFormik
import { Reservation } from './miniFormik';

// testing real Formik
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';



// initialize values
const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

// component to demonstrate the form
const Invitation = () => (
  <div>
    <h1>Invite friends</h1>
    {/* like miniFormik, Formik takes initial values and onSubmit
    also takes validationSchema (activated w Yup validation lib */}
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        friends: Yup.array().of(
          Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email!')
              .required('Required'),
          })
        ),
      })}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {/* render props children
      props are destructured in parameters */}
      {({ values, isSubmitting, setFieldValue }) => (
        <Form> 

          {/* use FieldArray to perform built-in array methods
          on formik Fields */}
          <FieldArray name="friends">
            {/* extract FieldArray methods from props */}
            {({ push, remove }) =>
              <React.Fragment>
                {/* using inline conditionals to trigger Array.map() */}
                {values.friends && 
                  values.friends.length > 0 && 
                  values.friends.map((friend, index) => 
                  <div>

                    {/* now within <Field> we can use a computed array index */}
                    <Field name={`friends[${index}].name`}>
                      {/* can also extract Field w/in render props */}
                      {({ field, form }) => (
                        <input 
                          {...field} 
                          type="text" 
                          placeholder="Jane Doe" 
                        />
                      )}
                    </Field>

                    {/* ErrorMessage delivers msg prop, define what to do with it */}
                    <ErrorMessage name={`friends[${index}].name`}>
                        {msg => <div className="field-error" >
                          {msg}
                        </div> }
                    </ErrorMessage>

                    {/* simpler implementation of Field */}
                    <Field 
                      name={`friends[${index}].email`}
                      type="email" 
                      placeholder="jane@example.com" 
                    />

                    <ErrorMessage name={`friends[${index}].email`}>
                      {msg => <div className="field-error" >
                        {msg}
                      </div> }
                    </ErrorMessage>

                    {/* using FieldArray remove method */}
                    <button 
                      type="button" 
                      onClick={() => remove(index)} 
                    >
                      X
                    </button>
                  </div>
                )}

                {/* using FieldArray push method */}
                <button 
                  type="button" 
                  onClick={() => push({ name: '', email: '' })} 
                  className="secondary"
                >
                  Add Friend
                </button>
              </React.Fragment>
            }
          </FieldArray>

          {/* submission button closes the form */}
          <button type="submit" disabled={isSubmitting}>Invite</button>
        </Form>
      )}
    </Formik>
  </div>
)




class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Invitation />
        {/* <Reservation /> */}
      </div>
    );
  }
}

export default App;
