import {Component} from 'react'
import {IoMdStar} from 'react-icons/io'
import {ImLocation} from 'react-icons/im'
import {GiSuitcase} from 'react-icons/gi'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import HeaderNav from '../HeaderNav'
import SkillsItem from '../SkillsItem'
import LifeAtCompany from '../LifeAtCompany'
import Similajobscards from '../SimilarjobsItem'
import './index.css'

const ApiConstants = {
  initital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobcardDetails extends Component {
  state = {
    Jobdetails: {},
    Similarjobs: [],
    jobdetailsskills: [],
    Lifeatcompany: {},
    apistatuse: ApiConstants.initital,
  }

  componentDidMount() {
    this.getjobCardDeatails()
  }

  getjobCardDeatails = async () => {
    this.setState({apistatuse: ApiConstants.initital})
    const acctx = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${acctx}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatajobdetails = {
        companylogourl: data.job_details.company_logo_url,
        companywebsiteurl: data.job_details.company_website_url,
        employmenttype: data.job_details.employment_type,
        id: data.job_details.id,
        jobdescription: data.job_details.job_description,
        location: data.job_details.location,
        packageperannum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const updatedSimilarjobs = data.similar_jobs.map(eachsimijob => ({
        companylogourl: eachsimijob.company_logo_url,
        employmenttype: eachsimijob.employment_type,
        id: eachsimijob.id,
        jobdescription: eachsimijob.job_description,
        location: eachsimijob.location,
        rating: eachsimijob.rating,
        title: eachsimijob.title,
      }))

      this.setState({
        jobdetailsskills: data.job_details.skills,
        Similarjobs: updatedSimilarjobs,
        Lifeatcompany: data.job_details.life_at_company,
        Jobdetails: updatajobdetails,
        apistatuse: ApiConstants.success,
      })
    } else {
      this.setState({apistatuse: ApiConstants.failure})
    }
  }

  retryjcdetails = () => {
    this.getjobCardDeatails()
  }

  getSkills = () => {
    const {jobdetailsskills} = this.state
    return jobdetailsskills.map(eachskill => (
      <SkillsItem eachskill={eachskill} key={eachskill.name} />
    ))
  }

  Lifeatcompany = () => {
    const {Lifeatcompany} = this.state
    return <LifeAtCompany Lifeatcompany={Lifeatcompany} />
  }

  getJobdetcard = () => {
    const {Jobdetails} = this.state
    const {
      companylogourl,
      companywebsiteurl,
      employmenttype,
      jobdescription,
      location,
      packageperannum,
      rating,
      title,
    } = Jobdetails
    return (
      <>
        <div className="comlogoratingcont">
          <img
            src={companylogourl}
            alt="job details company logo"
            className="jobdetcomlogoimgsty"
          />
          <div className="titlestarcont">
            <h1>{title}</h1>
            <div className="starratingcont">
              <IoMdStar />
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className="iconscontainer">
          <div className="locemtycont">
            <div className="locationcont">
              <ImLocation className="reacticons" />
              <p>{location}</p>
            </div>
            <div className="locationcont">
              <GiSuitcase className="reacticons" />
              <p>{employmenttype}</p>
            </div>
          </div>
          <p className="headingstyjcd">{packageperannum}</p>
        </div>
        <hr />
        <div className="descriptioncomplinkcont">
          <h1>Description</h1>
          <div className="externallinkcont">
            <FiExternalLink />
            <a className="achorele" href={companywebsiteurl}>
              Visit
            </a>
          </div>
        </div>
        <p>{jobdescription}</p>
        <h1>Skills</h1>
        <ul className="skillscontainer">{this.getSkills()}</ul>
        <h1>Life at Company</h1>

        <div>{this.Lifeatcompany()}</div>
      </>
    )
  }

  getsimilarjobs = () => {
    const {Similarjobs} = this.state

    return Similarjobs.map(eachsijobitem => (
      <Similajobscards eachsijobitem={eachsijobitem} key={eachsijobitem.id} />
    ))
  }

  renderLoderPage = () => (
    <div className="loader-container jobdetailscontainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessPage = () => (
    <>
      <HeaderNav />
      <div className="jobdetailscontainer">
        <div className="jobdetcard">{this.getJobdetcard()}</div>
        <h1 className="simihedingsty">Similar Jobs</h1>
        <ul className="similarjobcont">{this.getsimilarjobs()}</ul>
      </div>
    </>
  )

  renderFailurePage = () => (
    <>
      <HeaderNav />
      <div className="jobdetailscontainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jdapifilureimgpx"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="retrybutton"
          onClick={this.retryjcdetails}
        >
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {apistatuse} = this.state
    switch (apistatuse) {
      case ApiConstants.initital:
        return this.renderLoderPage()
      case ApiConstants.success:
        return this.renderSuccessPage()
      case ApiConstants.failure:
        return this.renderFailurePage()

      default:
        return null
    }
  }
}

export default JobcardDetails
