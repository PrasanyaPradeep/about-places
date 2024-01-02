import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PlaceList from '../PlaceList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    placesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravelPlace()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlace = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedList = fetchData.packages.map(eachItems =>
        this.renderFormattedData(eachItems),
      )
      this.setState({
        placesList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="place-list-container">
        {placesList.map(eachPlace => (
          <PlaceList key={eachPlace.id} details={eachPlace} />
        ))}
      </ul>
    )
  }

  renderViewsBasedOnApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlacesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="horizontal-line" />
        {this.renderViewsBasedOnApi()}
      </div>
    )
  }
}

export default TravelGuide
