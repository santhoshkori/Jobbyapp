import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearchAlt2} from 'react-icons/bi'

import HeaderNav from '../HeaderNav'
import JobCard from '../JobsCard'

import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const ApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
}

class JobsPage extends Component {
  state = {
    userdetails: '',
    getEmployeetype: [],
    getSalaryRange: '',
    getSearchInputValue: '',
    jobcardList: [],
    Profileinitial: ApiConstants.initial,
    Getjobinitial: ApiConstants.initial,
  }

  componentDidMount() {
    this.getProfiledetails()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({Getjobinitial: ApiConstants.initial})
    const {getEmployeetype, getSalaryRange, getSearchInputValue} = this.state
    const spillted = getEmployeetype.join(',')
    console.log(spillted)

    const myacctk = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${spillted}&minimum_package=${getSalaryRange}&search=${getSearchInputValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${myacctk}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data

      const updatedJobs = jobs.map(eachupjob => ({
        id: eachupjob.id,
        companylogourl: eachupjob.company_logo_url,
        employmenttype: eachupjob.employment_type,
        jobdescription: eachupjob.job_description,
        location: eachupjob.location,
        packageperannum: eachupjob.package_per_annum,
        rating: eachupjob.rating,
        title: eachupjob.title,
      }))

      this.setState({
        Getjobinitial: ApiConstants.success,
        jobcardList: updatedJobs,
      })
    } else {
      this.setState({Getjobinitial: ApiConstants.failure})
    }
    console.log(response)
  }

  renderloder = () => (
    <div className="loader-container retrybuttoncont" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfiledetails = async () => {
    this.setState({Profileinitial: ApiConstants.initial})
    const profileDetails = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${profileDetails}`},
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      this.setState({
        Profileinitial: ApiConstants.success,
        userdetails: data.profile_details,
      })
    } else {
      this.setState({Profileinitial: ApiConstants.failure})
    }
  }

  setEmploymentType = event => {
    const {getEmployeetype} = this.state
    const valueip = event.target.checked

    if (valueip === true) {
      const valueinput = event.target.value
      this.setState(
        prevState => ({
          getEmployeetype: [...prevState.getEmployeetype, valueinput],
        }),
        this.getJobs,
      )
    } else {
      const valueinput = event.target.value
      const isvaluetrue = getEmployeetype.includes(valueinput)

      if (isvaluetrue === true) {
        const newlistjob = getEmployeetype.filter(eachemty => {
          if (eachemty !== valueinput) {
            return eachemty
          }
          return null
        })
        this.setState({getEmployeetype: newlistjob}, this.getJobs)
      }
    }
  }

  jobfailureretry = () => {
    this.getJobs()
  }

  getjobfailurepage = () => (
    <div className="nojobscontainerfailure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="nojobsimagepx"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div className="retrybuttoncont">
        <button
          className="retrybutton"
          type="button"
          onClick={this.jobfailureretry}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getnojobscontainer = () => (
    <div className="nojobscontainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="nojobsimagepx"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  getjobsCard = () => {
    const {jobcardList, Getjobinitial} = this.state

    switch (Getjobinitial) {
      case ApiConstants.initial:
        return this.renderloder()
      case ApiConstants.success:
        if (jobcardList.length === 0) {
          return this.getnojobscontainer()
        }
        return jobcardList.map(eachlist => (
          <JobCard eachlist={eachlist} key={eachlist.id} />
        ))

      case ApiConstants.failure:
        return this.getjobfailurepage()

      default:
        return null
    }
  }

  setSalaryRange = event => {
    this.setState({getSalaryRange: event.target.value}, this.getJobs)
  }

  setSearchInputVslue = event => {
    this.setState({getSearchInputValue: event.target.value})
  }

  searchbasedontext = () => {
    this.getJobs()
  }

  getfailureprofile = () => {
    this.getProfiledetails()
  }

  displayprofiledetails = () => {
    const {Profileinitial, userdetails} = this.state
    const updateduserdetails = {
      profileImageUrl: userdetails.profile_image_url,
      shortBio: userdetails.short_bio,
      personname: userdetails.name,
    }
    switch (Profileinitial) {
      case ApiConstants.initial:
        return this.renderloder()
      case ApiConstants.success:
        return (
          <>
            <img
              src={updateduserdetails.profileImageUrl}
              className="profileimg"
              alt="profile_image_url"
            />
            <h1 className="jobprsondetsilheadingsty">
              {updateduserdetails.personname}
            </h1>
            <p>{updateduserdetails.shortBio}</p>
          </>
        )
      case ApiConstants.failure:
        return (
          <div className="retrybuttoncont">
            <button
              className="retrybutton"
              type="button"
              onClick={this.getfailureprofile}
            >
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  SearchInput = () => {
    const {getSearchInputValue} = this.state
    return (
      <div className="inputjobcontainer">
        <input
          type="search"
          className="inputelejob"
          onChange={this.setSearchInputVslue}
          value={getSearchInputValue}
        />
        <BiSearchAlt2
          className="jobsearchicon"
          onClick={this.searchbasedontext}
        />
      </div>
    )
  }

  SearchInputsm = () => {
    const {getSearchInputValue} = this.state
    return (
      <div className="inputjobcontainersm">
        <input
          type="search"
          className="inputelejob"
          onChange={this.setSearchInputVslue}
          value={getSearchInputValue}
        />
        <button
          data-testid="searchButton"
          type="button"
          className="searchiconsmlg"
        >
          <BiSearchAlt2
            className="jobsearchicon"
            onClick={this.searchbasedontext}
          />
        </button>
      </div>
    )
  }

  SalaryRange = () => (
    <ul className="typeemplyulsty">
      <h1 className="typeemplyulstyheading">Salary Range</h1>
      {salaryRangesList.map(eachsalary => {
        const {salaryRangeId, label} = eachsalary
        return (
          <li key={salaryRangeId} className="listemployeetype">
            <input
              type="radio"
              id={salaryRangeId}
              name="salarypage"
              value={salaryRangeId}
              onClick={this.setSalaryRange}
            />
            <label htmlFor={salaryRangeId}>{label}</label>
          </li>
        )
      })}
    </ul>
  )

  typeOfEmploymentcont = () => (
    <ul className="typeemplyulsty">
      <h1 className="typeemplyulstyheading">Type Of Employment</h1>
      {employmentTypesList.map(eachemployee => {
        const {employmentTypeId, label} = eachemployee

        return (
          <li key={label} className="listemployeetype">
            <input
              type="checkbox"
              value={employmentTypeId}
              name={label}
              onClick={this.setEmploymentType}
              id={employmentTypeId}
            />
            <label htmlFor="employmentTypeId">{label}</label>
          </li>
        )
      })}
    </ul>
  )

  render() {
    const {getSalaryRange} = this.state
    console.log(getSalaryRange)
    return (
      <>
        <HeaderNav />

        <div className="jobspagemaincontainer">
          {this.SearchInputsm()}
          <div className="Profilecontainer">
            <div className="profileimgcontainer">
              {this.displayprofiledetails()}
            </div>
            <hr />
            {this.typeOfEmploymentcont()}
            <hr />
            {this.SalaryRange()}
          </div>

          <ul className="jobslistcontainerdisplay">
            {this.SearchInput()}
            {this.getjobsCard()}
          </ul>
        </div>
      </>
    )
  }
}

export default JobsPage
