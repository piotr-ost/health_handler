const axios = require('axios')
// const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a'
const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
const base = 'https://api.spoonacular.com/mealplanner/'

const user = {
  hash: "5d167effe1db769409a724351bbde7e0bc44971a",
  username: "api-52495-d58fb6a6-ff41-4b71-b6d9-e2165095aa7b",
}

const connectUser = async () => {
  const res = await axios.post(
    `https://api.spoonacular.com/users/connect?${apiKey}`, {})
  const data = await res.data
  const {username, hash} = data
  return [username, hash]
}

const getUserPlan = (username, hash) => {
  let [date, ] = getDates()
  const url = base + `${username}/week/${date}?hash=${hash}&${apiKey}`
  return axios.get(url)
}

const addToUserPlan = async (username, hash) => {
  const mealPlanTemplateId = 604
  const base = 'https://api.spoonacular.com/mealplanner/'
  const startDate = Math.round(new Date().getTime() / 1000 + 100)
  return await axios.post(
    base + `${username}/items?${apiKey}&hash=${hash}`,
    {"mealPlanTemplateId": mealPlanTemplateId, "startDate": startDate}
  )
}

const getDates = () => {
  let currentTime = new Date()
  const currentMonth = currentTime.getMonth() + 1 < 10 ?
    `0${currentTime.getMonth() + 1}` : currentTime.getMonth() + 1
  let currentDay = currentTime.getDate() < 10 ?
    `0${currentTime.getDate()}` : currentTime.getDate()
  let dayInAWeek = currentTime.getDate() + 7 < 10 ?
    `0${currentTime.getDate() + 7}` : currentTime.getDate() + 7
  let currentDate = `${currentTime.getFullYear()}-${currentMonth}-${currentDay}`
  let dateInAWeek = `${currentTime.getFullYear()}-${currentMonth}-${dayInAWeek}`
  return [currentDate, dateInAWeek]
}


module.exports = {
  user: user,
  connect: connectUser,
  getPlan: getUserPlan,
  addToPlan: addToUserPlan
}

