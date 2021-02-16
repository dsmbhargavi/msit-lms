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
      isLogined:'false',
      errors:{}
    }
   this.handleLogin= this.handleLogin.bind(this)
  }
  handleInputChange=(event)=>{
   this.setState({
     [event.target.name]:event.target.value
  })
}

async handleLogin(event){
  if(this.validateForm()){
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
        }
      )
      .catch(error =>document.getElementById('login-error').innerHTML=error)
      if(data!==undefined)
      if( data.token!==undefined){
        localStorage.setItem('token',data.token)
        localStorage.setItem('username',this.state.username.split('@')[0])
        this.setState({
          isLogined: true
        })
          if(data.valid==='admin'){
              // window.location.href=environment.adminUrl+"/dashboard/?token="+this.bg.token;
              console.log("need admin redirect: ")
          }
          requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
     await fetch(`${REACT_APP_APIBASE_URL}/api/user/id/?token=${data.token}`,requestOptions)
      .then(response => response.text())
      .then(result => {
       var id=JSON.parse(result)
        localStorage.setItem('id',id.id)
        localStorage.setItem('mail',this.state.username)
        // this.props.history.push('/program-catalog')
        this.props.history.push({
  pathname: '/program-catalog',
  state: { view: 'programs'}
    })
      }
      ).catch(error => console.log('error', error));
    }
    else
      document.getElementById('login-error').innerHTML=`Wrong Email or Password`
    
  }
  }
  validateForm() {
    let errors = {};
    let valid = true;
       // console.log(this.state.username);
      if (this.state.username === null) {
        errors["username"] = "*Enter your email-ID.";
        valid=false;
      }
  
      if (typeof this.state.username !== "undefined") {
        //console.log("user",fields["username"]);
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.username)) {
          errors["username"] = "*Enter valid email-ID.";
          valid=false;
        }
      }
  
      if (this.state.password === null) {
        errors["password"] = "*Enter your password.";
        valid=false;
      }
  
      if (typeof this.state.password !== "undefined") {
        // if (!this.state.password.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {
        if (!this.state.password.match(/^.*(?=.{6,}).*$/)) {
          errors["password"] = "*Enter correct password.";
          valid=false;
        }
      }
  
      this.setState({
        errors: errors
      });
      return valid;
   }
  render() {
    if(localStorage.getItem('token')===null){
<<<<<<< HEAD
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
            <span className  = "input-group-text" > < i className  = "bi bi-person-fill" > </i></span >
            </div>
            <input type = "text"
            name = "username"
            className  = "form-control input_user"
            value = {this.state.username}
            placeholder = "username"
            onChange={this.handleInputChange}
            />

            </div>
            <div className="errorMsg">{this.state.errors.username}</div>
            <div className  = "input-group mb-2" >
            < div className  = "input-group-append" >
            <span className  = "input-group-text" > < i className  = "bi bi-key-fill" > </i> </span>
            </div>
            <input type = "password"
            name = "password"
            className  = "form-control input_pass"
            value = {this.state.password}
            placeholder = "password"
            onChange={this.handleInputChange}
            />
            </div>
            <div className="errorMsg">{this.state.errors.password}</div>
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
=======
var login = (<div className="d-flex justify-content-center h-100">
  <div className="user_card">
    <div className="d-flex justify-content-center">
      <div className="brand_logo_container">
        <img src="/image.jpg" width="400" height="400" className="brand_logo" alt="" />
      </div>
    </div>
    <div className="d-flex justify-content-center form_container">
      <form>
        < div className="input-group mb-3">
          < div className="input-group-append">
            < span className="input-group-text">
              < i className="fas fa-user"> </i></span>
    </div>
    <input type="text" name="username" className="form-control input_user" value={this.state.username} placeholder="username" onChange={this.handleInputChange} />

  </div>
  <div className="input-group mb-2">
    < div className="input-group-append">
      <span className="input-group-text">
        < i className="fas fa-key"> </i>
      </span>
  </div>
  <input type="password" name="password" className="form-control input_pass" value={this.state.password} placeholder="password" onChange={this.handleInputChange} />

</div>
<div className="mt-4">
  <div className="d-flex justify-content-center links">
    <Link to="#"> Forgot your password ? </Link>
  </div>
</div>
<div className="d-flex justify-content-center mt-3 login_container">
  <button type="button" name="button" className="btn login_btn" onClick={this.handleLogin}> Login </button>
</div>
</form>
</div>
</div>
</div>);
      }

      return (
            <div className  = "container h-100 loginFix" >
            {login}
            </div>
            );

    }
>>>>>>> f61940ecd6e823eb19312224eecac12b10ff3cce
}
export default withRouter(Login);
