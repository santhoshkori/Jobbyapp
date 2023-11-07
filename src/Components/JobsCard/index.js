import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdStar} from 'react-icons/io'
import {ImLocation} from 'react-icons/im'
import {GiSuitcase} from 'react-icons/gi'
import './index.css'

class JobCard extends Component {
  render() {
    const {eachlist} = this.props

    const {
      companylogourl,
      employmenttype,
      id,
      jobdescription,
      location,
      packageperannum,
      rating,
      title,
    } = eachlist

    return (
      <Link to={`/jobs/${id}`} className="linksty">
        <li className="jobcardcont">
          <div className="mainjobcontainer">
            <img
              src={companylogourl}
              className="jobcardimg"
              alt="job details company logo"
            />
            <div className="headingiconcont">
              <h1 className="headingjobcard">{title}</h1>
              <div className="iconcontainerrating">
                <IoMdStar className="staricon" />
                <p className="parasty">{rating}</p>
              </div>
            </div>
          </div>

          <div className="locationsalarycont">
            <div className="locationintenshipcont">
              <div className="location">
                <ImLocation className="parasty" />
                <p className="parasty">{location}</p>
              </div>
              <div className="internship">
                <GiSuitcase className="parasty" />
                <p className="parasty">{employmenttype}</p>
              </div>
            </div>
            <div>
              <h1 className="headingjobcard">{packageperannum}</h1>
            </div>
          </div>
          <hr />
          <h1 className="headingjobcard">Description</h1>
          <p className="parasty">{jobdescription}</p>
        </li>
      </Link>
    )
  }
}

export default JobCard
