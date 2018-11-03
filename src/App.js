import React, { Component } from 'react';
import * as Yup from 'yup';
import './App.css';

// testing miniFormik
import { MiniFormik, Reservation } from './miniFormik';

// testing real Formik
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';




const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const Invitation = () => (
  <div>
    <h1>Invite friends</h1>
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
        }, 500)
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form> 
          <FieldArray name="friends">
            {({ push, remove }) =>
              <React.Fragment>
                {values.friends && 
                  values.friends.length > 0 && 
                  values.friends.map((friend, index) => 
                  <div>
                    <Field name={`friends[${index}].name`}>
                      {({ field, form }) => (
                        <input 
                          {...field} 
                          type="text" 
                          placeholder="Jane Doe" 
                        />
                      )}
                    </Field>

                    <ErrorMessage name={`friends[${index}].name`}>
                        {msg => <div className="field-error" >
                          {msg}
                        </div> }
                    </ErrorMessage>

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

                    <button type="button" onClick={() => remove(index)} >
                      X
                    </button>
                  </div>
                )}
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
      </div>
    );
  }
}

export default App;
