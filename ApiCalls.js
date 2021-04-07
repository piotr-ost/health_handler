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

/** @returns shopping list for the next week generated by spoonacular api **/
export const generateShoppingList = (username, hash) => {
  let [currentDate, dateInAWeek] = getDates()
  const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
  const url = base + username + `/shopping-list/${currentDate}/${dateInAWeek}?hash=${hash}&${apiKey}`
  return axios.post(url)
}

export const convertShoppingList = (shoppingList) => {
    const url = 'http://13.59.62.126:8010/get_shopping_list'
    return axios.post(url, shoppingList)
}

