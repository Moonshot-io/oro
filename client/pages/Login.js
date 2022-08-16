"use strict";
exports.__esModule = true;
var react_1 = require("react");
// import UserContext from '../context/UserContext';
var react_google_button_1 = require("react-google-button");
var Login = function () {
    var redirectToGoogle = function () {
        window.open('/auth/auth/google', '_self');
    };
    return (<div align='center'>
      <br></br>
      <h3>
   Please Login to Use Our App
      </h3>
      <form action="/auth/google">
        <react_google_button_1["default"] onClick={redirectToGoogle}/>
      </form>
    </div>);
};
exports["default"] = Login;
