import React, { Component } from "react"
import {Link,withRouter} from "react-router-dom";
import './Login.css'
const {REACT_APP_APIBASE_URL,}=process.env
class  Login extends Component {
  constructor(props){
    super(props)
    this.state ={
      username:'',
      password:'',
      isLogined:'false'
    }
   this.handleLogin= this.handleLogin.bind(this)
  }
  handleInputChange=(event)=>{
   this.setState({
     [event.target.name]:event.target.value
  })
}

async handleLogin(event){

    var requestOptions = {
      method: 'POST',
      body: new URLSearchParams({
        "email": this.state.username,
        "password":this.state.password
      }),
      redirect: 'follow'
    };
    var data
    await fetch(`${REACT_APP_APIBASE_URL}/api/auth/login`, requestOptions)
      .then(response => response.text())
      .then(result => {
        data=JSON.parse(result);
        if(data.token!==undefined){
        localStorage.setItem('token',data.token)
        this.setState({
          isLogined: true
        })
          if(data.valid==='admin'){
              // window.location.href=environment.adminUrl+"/dashboard/?token="+this.bg.token;
              console.log("need admin redirect: "+data.token)
          }
        }
        }
      )
      .catch(error =>console.log('error', error));

      requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };


    if(!data.token===undefined){
     await fetch(`${REACT_APP_APIBASE_URL}/api/user/id/?token=${data.token}`,requestOptions)   
      .then(response => response.text())
      .then(result => {
       var id=JSON.parse(result)
        localStorage.setItem('id',id.id)
        this.props.history.push('/program-catalog')
      }
      ).catch(error => console.log('error', error));
    }
    else{
      document.getElementById('login-error').innerHTML='check email or Password'
    }
  }
// validateForm() {

//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;

//     console.log("Username",fields["username"])

//     if (!fields["username"]) {
//       formIsValid = false;
//       errors["username"] = "*Enter your email-ID.";
//     }

//     if (typeof fields["username"] !== "undefined") {
//       console.log("user",fields["username"]);
//       //regular expression for email validation
//       var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//       if (!pattern.test(fields["username"])) {
//         formIsValid = false;
//         errors["username"] = "*Enter valid email-ID.";
//       }
//     }

//     if (!fields["password"]) {
//       formIsValid = false;
//       errors["password"] = "*Enter your password.";
//     }

//     if (typeof fields["password"] !== "undefined") {
//       if (!fields["password"].match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
//         formIsValid = false;
//         errors["password"] = "*Enter correct password.";
//       }
//     }

//     this.setState({
//       errors: errors
//     });
//     return formIsValid;
  render() {
    if(localStorage.getItem('token')===null){
var login=
            <div className  = "d-flex justify-content-center h-100" >
            <div className  = "user_card" >
            <div className  = "d-flex justify-content-center" >
            <div className  = "brand_logo_container" >
            <img src = "/image.jpg"
            width = "400"
            height = "400"
            className  = "brand_logo"
            alt = ""/>
            </div>
            </div>
            <div className  = "d-flex justify-content-center form_container" >
            <form>
            <div className  = "input-group mb-3" >
            <div className  = "input-group-append" >
            <span className  = "input-group-text" > < i className  = "fas fa-user" > </i></span >
            </div>
            <input type = "text"
            name = "username"
            className  = "form-control input_user"
            value = {this.state.username}
            placeholder = "username"
            onChange={this.handleInputChange}
            />

            </div>
            <div className  = "input-group mb-2" >
            < div className  = "input-group-append" >
            <span className  = "input-group-text" > < i className  = "fas fa-key" > </i> </span>
            </div>
            <input type = "password"
            name = "password"
            className  = "form-control input_pass"
            value = {this.state.password}
            placeholder = "password"
            onChange={this.handleInputChange}
            />

            </div>
            <div className  = "mt-4" >
            <div className  = "d-flex justify-content-center links" >
            <Link to = "#" > Forgot your password ? </Link>
            </div>
            </div>
            <div className  = "d-flex justify-content-center mt-3 login_container" >
            <button type = "button"
            name = "button"
            className  = "btn login_btn"  onClick={this.handleLogin}> Login </button>
            </div>
            <div className  = "mt-4 mb-2" >
            <span id='login-error'/>
            </div>
            </form>
            </div>
            </div>
            </div>
 }
    return (
      <div className  = "container h-100 loginFix" >
      {login}
      </div>
      );
}
}
export default withRouter(Login);
