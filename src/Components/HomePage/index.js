import {Link} from 'react-router-dom'
import HeaderPage from '../HeaderNav'
import './index.css'

const HomePage = () => (
  <>
    <HeaderPage />
    <div className="homemaincontainer">
      <div className="homeheadinparacontainer">
        <h1 className="homeheading">Find The Job That Fits Your Life</h1>
        <p className="homepara">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
      </div>
      <Link to="/jobs">
        <button type="button" className="findjobsbutton">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default HomePage
