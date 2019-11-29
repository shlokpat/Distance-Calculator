import React, {Component} from 'react';

class UserInput extends Component {
    constructor() {
        super()
        this.state = {
          origin: '',
          destination: '',
          tripDetails: [],
          clicked: false,
          costDaily: 0,
          costMonthly: 0,
          costYearly: 0
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
          this.setState({
            tripDetails: data.distance[0][1],
            clicked: true
          })
          this.costCalc(data.distance[0][1])
      })
    }

    costCalc(distance) {
      //hardcoded fuel efficiency (put all info into object)
      var mpg = 30
      //-------------------------
      
      //Fuel prices
      //var minusCostOfFuel = 1.065543
      var baseCostOfFuel = 1.218457
      //var plusCostOfFuel = 1.371372
      //---------------------------

      //cost of trip
      var dailyCostOfTrip = (distance/mpg) * 3.777 * baseCostOfFuel
      var roundTripCostDaily = dailyCostOfTrip * 2
      var monthlyCostOfTrip = roundTripCostDaily * 20
      var yearlyCostOfTrip = monthlyCostOfTrip * 12 

      this.setState({
        costDaily: dailyCostOfTrip,
        costMonthly: monthlyCostOfTrip,
        costYearly: yearlyCostOfTrip
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
      let costTextDaily = ''
      let costTextMonthly = ''
      let costTextYearly = ''

      if (this.state.clicked === true) {
        travelText = 'You are travelling from '
        to = 'to '
        distanceText = 'The distance of the trip will be '
        miles = 'miles.'
        originText = this.state.origin
        destinationText = this.state.destination
        costTextDaily = 'The trip will cost you $' + this.state.costDaily.toFixed(2) + ' per day'
        costTextMonthly = 'The trip will cost you $' + this.state.costMonthly.toFixed(2) + ' per month'
        costTextYearly = 'The trip will cost you $' + this.state.costYearly.toFixed(2) + ' per year'
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
            <h1> {costTextDaily} </h1>
            <h1> {costTextMonthly} </h1>
            <h1> {costTextYearly} </h1>
        </div>

      )
    }

}

export default UserInput;
