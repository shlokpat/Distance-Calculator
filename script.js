document.getElementById('getText').addEventListener('click', calculateDistance)
var distanceDiv = document.getElementById('distanceVal')


function calculateDistance() {
    let origin = document.getElementById('origin').value
    let destination = document.getElementById('destination').value
    //testing
    console.log(origin)
    console.log(destination)

    fetch('http://www.mapquestapi.com/directions/v2/routematrix?key=NPddJU7m1J9jpbxnocG66Ev94EVTZCty', {
        method: 'POST',
        body: JSON.stringify({
                "locations": [
                origin,
                destination
            ],
            "options": {
                "allToAll": true
            }
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.distance[0][1])
        //prints the total distance and cost of the trip to the screen
        //need to implement dynamic mpg and cost of fuel
        var mpg = 30
        var costOfFuel = 1.20
        var distance = data.distance[0][1]
        var costOfTrip = (distance/30) * 3.777 * costOfFuel
        distanceVal = document.createElement('h2')
        distanceVal.innerHTML = 'The total distance you will travel is ' + distance + ' miles and you will spend approximately $' + costOfTrip.toFixed(2)
        distanceDiv.appendChild(distanceVal)

    })
    
}


