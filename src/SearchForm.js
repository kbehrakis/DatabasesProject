import React, {Component} from 'react';
import axios from 'axios';

class ContactForm extends Component{
  constructor() {
    super();
    this.state = { name: {},
                   info:{}
                  };

    this.onSubmit = this.handleSubmit.bind(this);
  }


    handleChange = event => {
      this.setState({ product: event.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      var input = document.getElementById("name").value;

      axios({
                  method: "POST",
                  url:"http://localhost:3002/info",
                  data: {
                      name: input
                  }
              }).then((response)=>{
                  const dbInfo = response.data;

                  // Resets the form
                  document.getElementById("form1").reset();


                  // cONVERTING JSON TO A READABLE TABLE
                  // https://travishorn.com/building-json2table-turn-json-into-an-html-table-a57cf642b84a
                  var cols = Object.keys(dbInfo[0]);

                  var headerRow = '';
                  var bodyRows = '';
                  var classes = 'table';

                  classes = classes || '';

                  cols.map(function(col) {
                    headerRow += '<th>' + col + '</th>';
                  });

                  dbInfo.map(function(row) {
                    bodyRows += '<tr>';

                    cols.map(function(colName) {
                      bodyRows += '<td>' + row[colName] + '</td>';
                    })

                    bodyRows += '</tr>';
                  });

                  var finalTable =  '<table class="' +
                                     classes +
                                     '"><thead><tr>' +
                                     headerRow +
                                     '</tr></thead><tbody>' +
                                     bodyRows +
                                     '</tbody></table>';


                  // Inserts the table into the HTML
                  document.getElementById("displayTable").innerHTML = finalTable
              })
    }


    handleSubmitNewUser = (e) => {
      e.preventDefault();
      var name = document.getElementById("nameToSubmit").value;
      var email = document.getElementById("emailToSubmit").value;
      var password = document.getElementById("passwordToSubmit").value;
      var address = document.getElementById("addressToSubmit").value;
      var favoriteColor = document.getElementById("favoriteColorToSubmit").value;


      axios({
                  method: "POST",
                  url:"http://localhost:3002/addUser",
                  data: {
                      name: name,
                      email: email,
                      password: password,
                      address: address,
                      favoriteColor: favoriteColor
                  }
              }).then((response)=>{
                  const dbInfo = response.data;

                  // Resets the form
                  document.getElementById("form2").reset();

                  // Inserts the table into the HTML
                  document.getElementById("confirmation").innerHTML = "Added!"
              })
    }

    render(){
        return(
        <div>
            <form id="form1" onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <br></br>
                  <input type="text" name="name" id="name" onChange={this.handleChange} />
                  <br></br>
                </label>
                <button type="submit">Search</button>
            </form>
            <br></br>
            <div id="displayTable"></div>
            <br></br>
            <br></br>
            <form id="form2" onSubmit={this.handleSubmitNewUser}>
                <label>
                  Add a new user:
                  <br></br>
                  <br></br>
                  Name: <input type="text" name="nameToSubmit" id="nameToSubmit"/>
                  <br></br>
                  <br></br>
                  Email: <input type="text" name="emailToSubmit" id="emailToSubmit"/>
                  <br></br>
                  <br></br>
                  Password: <input type="text" name="passwordToSubmit" id="passwordToSubmit"/>
                  <br></br>
                  <br></br>
                  Address: <input type="text" name="addressToSubmit" id="addressToSubmit"/>
                  <br></br>
                  <br></br>
                  Favorite Color: <input type="text" name="favoriteColorToSubmit" id="favoriteColorToSubmit"/>
                  <br></br>
                  <br></br>
                </label>
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <div id="confirmation"></div>
            <br></br>
            <br></br>
        </div>

        )
    }
}

export default ContactForm;
