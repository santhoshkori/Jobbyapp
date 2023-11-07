import './index.css'

const LifeAtCompany = props => {
  const {Lifeatcompany} = props
  return (
    <div className="Lifeatcomcontainer">
      <div className="lifedesccont">
        <p>{Lifeatcompany.description}</p>
      </div>
      <div>
        <img src={Lifeatcompany.image_url} alt="life at company" />
      </div>
    </div>
  )
}

export default LifeAtCompany
