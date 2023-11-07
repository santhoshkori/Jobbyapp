import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {Username: '', Password: '', errorMsg: ''}

  getusername = event => {
    this.setState({Username: event.target.value})
  }

  getpassword = event => {
    this.setState({Password: event.target.value})
  }

  getjwttoken = async event => {
    event.preventDefault()
    console.log('hi')
    const {Username, Password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userdetails = {username: Username, password: Password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    }

    if (response.status === 400) {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginmaincontainer">
        <div className="logincardcontainer">
          <div className="logoimgpx">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <form className="formcontainer" onSubmit={this.getjwttoken}>
            <div className="labelinputcontainer">
              <label className="labelsty" htmlFor="name">
                USERNAME
              </label>
              <br />
              <input
                id="name"
                className="passinputsty"
                type="text"
                placeholder="Username"
                onChange={this.getusername}
              />
            </div>
            <div className="labelinputcontainer">
              <label className="labelsty" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                id="password"
                className="passinputsty"
                type="password"
                placeholder="Password"
                onChange={this.getpassword}
              />
            </div>
            <button className="loginbuttonpage" type="submit">
              Login
            </button>
            <p className="labelstyerror">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
