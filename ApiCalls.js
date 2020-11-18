const axios = require('axios')
// const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a'
const apiKey = '&apiKey=5bb1646af40448c4bd763b79205bc198'
const urlBase = 'https://api.spoonacular.com'

const user = {
  "username":"api-52495-piotrostr",
  "hash":"c7d551c6e13e41681b05852ffcfa6ebbb20fbf09"
}

const getLastMonday = () => {
  let date = new Date()
  let day = date.getDay()
  let lastMonday = new Date()
  if (date.getDay() === 0) {
    lastMonday.setDate(date.getDate() - 7)
  } else {
    lastMonday.setDate(date.getDate() - (day-1))
  }
  return lastMonday
}

const getUserPlan = () => {
  /** @returns user plan for the most recent week assuming that its always starting on monday **/
  let date = getLastMonday()
  date = date.toISOString().split('T')[0]
  const url = `${urlBase}/mealplanner/${user.username}/week/${date}?hash=${user.hash}${apiKey}`
  axios.get(url)
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

// todo function to give date of the given starting week?
// start that

const addToUserPlan = (date, slot, position) => {
  const url = `${urlBase}/mealplanner/${user.username}/items?hash=${user.hash}${apiKey}`
  axios.post(url, { "date": date, "slot": slot, "position": position,
    "type": "INGREDIENTS", "value": { "ingredients": [{"name": "1 banana"}]}})
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

let currentTime = new Date()
let currentDate = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate() + 1}`
const date = new Date(currentDate).getTime() / 1000
// then add for every other day

console.log(addToUserPlan(date, 3, 2))
console.log(getUserPlan())
