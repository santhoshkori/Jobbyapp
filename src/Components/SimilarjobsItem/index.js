import {IoMdStar} from 'react-icons/io'
import {ImLocation} from 'react-icons/im'
import {GiSuitcase} from 'react-icons/gi'
import './index.css'

const Similajobscards = props => {
  const {eachsijobitem} = props
  const {
    companylogourl,
    employmenttype,

    jobdescription,
    location,
    rating,
    title,
  } = eachsijobitem

  return (
    <li className="simijocont">
      <div className="comlogoratingcont">
        <img
          src={companylogourl}
          alt="similar job company logo"
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
      <h1>Description</h1>
      <p>{jobdescription}</p>

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
      </div>
    </li>
  )
}

export default Similajobscards
