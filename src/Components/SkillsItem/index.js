import './index.css'

const SkillsItem = props => {
  const {eachskill} = props
  return (
    <li className="skillitemcontainer">
      <img
        src={eachskill.image_url}
        alt={eachskill.name}
        className="skillimgsty"
      />
      <p className="skillparacont">{eachskill.name}</p>
    </li>
  )
}

export default SkillsItem
