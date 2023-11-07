import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {BiLogIn} from 'react-icons/bi'
import './index.css'

const HeaderNav = props => {
  const logMeOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navcontainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="headerlogopx"
        />
      </Link>
      <ul className="smcontainernavigation">
        <Link to="/">
          <li>
            <button type="button" className="logoutbutton">
              <AiFillHome className="smiconsty" />
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <button type="button" className="logoutbutton">
              <GiSuitcase className="smiconsty" />
            </button>
          </li>
        </Link>

        <li>
          {' '}
          <button type="button" className="logoutbutton">
            <BiLogIn className="smiconsty" onClick={logMeOut} />
          </button>
        </li>
      </ul>

      <ul className="ullistcontainer">
        <Link to="/">
          <li className="liststy">
            <p className="headernavpara">Home</p>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <p className="headernavpara">Jobs</p>
          </li>
        </Link>
      </ul>

      <button type="button" className="loginbutton" onClick={logMeOut}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(HeaderNav)
