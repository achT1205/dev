import React, { Component } from "react";

import { MDBSelect, Button } from "mdbreact";

class Select extends Component {

  state = {

    options: [

      {

        checked: true,

        disabled: false,

        icon: null,

        value: "USA"

      },

      {

        checked: false,

        disabled: false,

        icon: null,

        value: "Canada"

      },

      {

        checked: false,

        disabled: false,

        icon: null,

        value: "UK"

      },

      {

        checked: false,

        disabled: false,

        icon: null,

        value: "India"

      },

      {

        checked: false,

        disabled: false,

        icon: null,

        value: "Japan"

      }

    ]

  };

  changeToIndia = () => {

    this.setState(prevState => {

      let prevOptions = [...prevState.options];

      prevOptions[3].checked = true;

      return { options: prevOptions };

    });

  };

  render() {

    return (

      <div>

        <Button onClick={this.changeToIndia} size="sm">

          Change dynamically

        </Button>

        <MDBSelect

          color="primary"

          options={this.state.options}

          selected="Choose your option"

        />

      </div>

    );

  }

}

export default Select;