import axios from 'axios'
// const apiKey = '?apiKey=556d5c003785468ab5aa696a128a3d3a'
const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
const base = 'https://api.spoonacular.com/mealplanner/'

export const connectUser = async () => {
  const res = await axios.post(
    `https://api.spoonacular.com/users/connect?${apiKey}`, {})
  const data = await res.data
  const {username, hash} = data
  return [username, hash]
}

export const getUserPlan = (username, hash) => {
  let [date, ] = getDates()
  const url = base + `${username}/week/${date}?hash=${hash}&${apiKey}`
  return axios.get(url)
}

export const addToUserPlan = async (username, hash) => {
  const mealPlanTemplateId = 604
  const base = 'https://api.spoonacular.com/mealplanner/'
  const startDate = Math.round(new Date().getTime() / 1000 + 100)
  return await axios.post(
    base + `${username}/items?${apiKey}&hash=${hash}`,
    {"mealPlanTemplateId": mealPlanTemplateId, "startDate": startDate}
  )
}

export const getUserMealPlanTemplates = (username, hash) => {
  const url = `https://api.spoonacular.com/mealplanner/${username}/templates?hash=${hash}&${apiKey}`
  axios.get(url)
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

export const getPublicTemplates = () => {
  const url = `https://api.spoonacular.com/mealplanner/public-templates?${apiKey}`
  axios.get(url)
    .then((res) => {console.log(res.data); return res.data})
    .catch((err) => console.log(err))
    .then(() => console.log(url))
}

export const getDates = () => {
  let currentTime = new Date()
  let currentMonth
  currentTime.getMonth() + 1 < 9 ?
  currentMonth = `0${currentTime.getMonth() + 1}`
  : currentMonth = currentTime.getMonth() + 1
  let currentDate = `${currentTime.getFullYear()}-${currentMonth}-${currentTime.getDate()}`
  let dateInAWeek = `${currentTime.getFullYear()}-${currentMonth}-${currentTime.getDate() + 7}`
  return [currentDate, dateInAWeek]
}

/** @returns shopping list for the next week generated by spoonacular api **/
export const generateShoppingList = (username, hash) => {
  let [currentDate, dateInAWeek] = getDates()
  const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
  const url = base + username + `/shopping-list/${currentDate}/${dateInAWeek}?hash=${hash}&${apiKey}`
  axios.post(url).then(r => {console.log(r.data); r.data}).catch(e => console.log(e))
}
