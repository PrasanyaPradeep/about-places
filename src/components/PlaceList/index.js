import './index.css'

const PlaceList = props => {
  const {details} = props
  const {name, description, imageUrl} = details

  return (
    <li className="card-list">
      <img src={imageUrl} className="image" alt={name} />
      <h1 className="place-heading">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default PlaceList
