const axios = require('axios')
// const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a'
const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
const urlBase = 'https://api.spoonacular.com'

const user = {
  "username":"api-52495-piotrostr",
  "hash":"c7d551c6e13e41681b05852ffcfa6ebbb20fbf09"
}

export const johny = {
  username: 'yoniaibi',
  hash: 'e4a10a305427619e90290391d8fc38370ffca93d'
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

/*
 the swiping functionality could be added using `https://api.spoonacular.com/recipes/{id}/similar`
 we could get 5 similar recipes for each of the meals generated
 and let the user choose the set of products for the meal

 // todo swap the duplicate meals?
 alright, so backend is:
 1) generate meal plan, use ready templates, make sure data of input screen is included
 2) once the user approves, take id's of the meals
 3) add each of the id's to the meal plan, here the dates have to be automatically determined
 4) then make another screen, current meal plan - this will retrieve the given meal plan for a user;
  the meal plan cant be generated every time, there is also a limit of one meal plan per user
  (can go around that np tho)
*/

const addMealToUserPlan = (user, date, slot, position) => {
  const url = `${urlBase}/mealplanner/${user.username}/items?hash=${user.hash}&${apiKey}`
  axios.post(url, { "date": date, "slot": slot, "position": position,
    "type": "INGREDIENTS", "value": { "ingredients": [{"name": "1 banana"}]}})
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

let currentTime = new Date()
let currentDate = `${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate() + 1}`
const date = new Date(currentDate).getTime() / 1000

// console.log(addMealToUserPlan(user, date, 1, 3))
// console.log(getUserPlan())

export const getUserMealPlanTemplates = (username, hash) => {
  const url = `https://api.spoonacular.com/mealplanner/${username}/templates?hash=${hash}&${apiKey}`
  axios.get(url)
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

const getPublicTemplates = () => {
  const url = `https://api.spoonacular.com/mealplanner/public-templates?${apiKey}`
  axios.get(url)
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

getUserMealPlanTemplates(johny.username, johny.hash)
// getPublicTemplates()
// getUserMealPlanTemplates(user.username, user.hash)