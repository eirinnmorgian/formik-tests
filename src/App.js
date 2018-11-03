import React, { Component } from 'react';
import './App.css';

// testing miniFormik
import { Reservation } from './miniFormik';

// testing Jared's Formik example
import Invitation from './InvitationExample';

// creating my own Formiks
import SignupForm from './SignupForm';


const App = () => {
  return (
    <div className="App-header">
      <SignupForm />
      {/* <Invitation /> */}
      {/* <Reservation /> */}
    </div>
  );
}


export default App;
