import React, {Component} from 'react';

class UserInput extends Component {
    constructor() {
        super()
        this.state = {
          origin: '',
          destination: '',
          tripDetails: [],
          clicked: false,
          cost: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    ApiCall() {
      fetch('http://www.mapquestapi.com/directions/v2/routematrix?key=NPddJU7m1J9jpbxnocG66Ev94EVTZCty', {
          method: 'POST',
          body: JSON.stringify({
              "locations": [
                  this.state.origin,
                  this.state.destination
              ],
              "options": {
                  "allToAll": true
              }
          })
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          this.setState({
            tripDetails: data.distance[0][1],
            clicked: true
          })
      })
    }

    costCalc() {
      //hardcoded fuel efficiency (put all info into object)
      var mpg = 30
      //-------------------------
      
      //Fuel prices
      var minusCostOfFuel = 1.065543
      var baseCostOfFuel = 1.218457
      var plusCostOfFuel = 1.371372
      //---------------------------

      var distance = this.state.tripDetails
      console.log(distance)
      var baseCostOfTrip = (distance/mpg) * 3.777 * baseCostOfFuel

      this.setState({
        cost: baseCostOfTrip
      })
    }

    buttonClick() {
      this.ApiCall();
    }
    
    render() {
      let tripDistance = this.state.tripDetails
      let travelText = ''
      let to = ''
      let distanceText = ''
      let miles = ''
      let originText = ''
      let destinationText = ''
      let costText = ''

      if (this.state.clicked === true) {
        travelText = 'You are travelling from '
        to = 'to '
        distanceText = 'The distance of the trip will be '
        miles = 'miles.'
        originText = this.state.origin
        destinationText = this.state.destination
        costText = 'The trip will cost you $'
      }

  
      return (
        <div>
            <form>
                <input type='text' name='origin' placeholder='Type the origin...' onChange={this.handleChange} />
                <input type='text' name= 'destination' placeholder='Type the destination...' onChange={this.handleChange} />
            </form>
            <button onClick={this.buttonClick}>Calculate</button>
            <h1> {travelText} {originText} {to} {destinationText} </h1>
            <h1> {distanceText} {tripDistance} {miles} </h1>
            <h1> {costText} {this.state.cost} </h1>
        </div>

      )
    }

}

export default UserInput;
