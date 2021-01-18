import axios from 'axios'
// const axios = require('axios')
// const fs = require('fs')

// two different ways of getting data in an async manner below

/**
 * @param id number: recipe id
 * @returns Object: detailed preparation steps with utensils included
 */
export const getRecipeDetailedSteps = async (id) => {
  const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
  const base = 'https://api.spoonacular.com'
  const url = base + '/recipes/' + id + '/analyzedInstructions?' + apiKey
  try {
    const res =  await axios.get(url)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

/**
 * @param id number: recipe id
 * @returns Object recipe general information and extended ingredients
 */
export const getRecipeInformation = (id) => {
  const apiKey = 'apiKey=5bb1646af40448c4bd763b79205bc198'
  const base = 'https://api.spoonacular.com'
  const url = base + '/recipes/' + id + '/information?' + apiKey
  return axios.get(url).then(r => r.data).catch(e => console.log(e))
}


if (require.main === module) {
  const id = 2553
  getRecipeInformation(id).then(r => {
    const recipeInfo = JSON.stringify(r)
    fs.writeFileSync('recipeInfo.json', recipeInfo, () => {})
  })
}
