import React, { Component } from 'react';


export class MiniFormik extends Component {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {},
  }

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
    // validate
    // continue w submission if no errors
    this.props.onSubmit(this.state.values)
  }

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit
    })
  }
}


//////

export class Reservation extends Component {
  render() {
    return (
      <MiniFormik 
        initialValues={{
          isGoing: true,
          numberOfGuests: 2
        }}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >
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
            <form onSubmit={handleSubmit}>
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
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange} />
              </label>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </form>
          )
        }}
      </MiniFormik>
    );
  }
}