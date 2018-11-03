import React, { Component } from 'react';


// basic structure of what is happening inside Formik

export class MiniFormik extends Component {
  // state built-ins
  state = {
    values: this.props.initialValues || {}, 
    touched: {},
    errors: {},
  }

  // methods to handle the fns we feed it at call-time
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    event.persist()
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  }

  handleBlur = event => {
    const target = event.target;
    const name = target.name;
    event.persist()
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.values)
  }

  // uses render props children 
  // all state values and fns exit as props
  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit
    })
  }
}



// component to test MiniFormik in action

export class Reservation extends Component {
  render() {
    return (

      // initialize values and onSubmit fn
      <MiniFormik 
        initialValues={{
          isGoing: true,
          numberOfGuests: 2
        }}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >

        {/* render props children
        extract props from MiniFormik */}
        {props => {
          const { 
            values, 
            errors, 
            touched, 
            handleChange, 
            handleBlur,
            handleSubmit
          } = props

          return (
            
            // create the form
            // MiniFormik handles submit
            <form onSubmit={handleSubmit}>

              {/** simple input w MiniFormik handlers */}
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                />
              </label>
              <br />

              {/** simple input w MiniFormik handlers */}
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange} />
              </label>

              {/** JSON string for debugging */}
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </form>
          )
        }}
      </MiniFormik>
    );
  }
}