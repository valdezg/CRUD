import React, { Component } from 'react';
//import Login from './Login'

//import CommentDetail from './CommentDetail';
import './App.css';




class App extends Component {
  constructor() {
    super();
    this.state = {
      title:'Clinical Trials Database',
      patient: [],
    }
}

componentDidMount() {
  console.log('COMPONENT HAS MOUNTED')
}

addPatient(event) {
  var that = this;
  event.preventDefault();
  let patient_data = {
    initials: this.refs.initials.value,
    age: this.refs.age.value,
    id: this.refs.id.value
  };
  var request = new Request('http://localhost:3000/api/new-country', {
    method : 'POST',
    headers: new Headers({ 'Content-Type': 'application/json'}),
    body: JSON.stringify(patient_data)
  });


  fetch(request)
  .then(function(response) {
    let patient = that.state.patient;
    patient.push(patient_data);
    that.setState({
      patient: patient
    })
    response.json()
    .then(function(data){
      })
  })
  .catch(function(err){
    console.log(err)
  })
}




render() {
  let title = this.state.title;
  let patient = this.state.patient;
  return (
    <div className="App">
      <h1> {title } </h1>



      <form ref="clinicalForm">
      <input type="text" ref="initials" placeholder="initials"/>
      <input type="text" ref="age" placeholder="age"/>
      <input type="text" ref="id" placeholder="id"/>

      <button onClick={this.addPatient.bind(this)}> Add Patient </button>
      <pre>{JSON.stringify(patient)}</pre>
      </form>





    </div>
  );
  }
}

export default App;
