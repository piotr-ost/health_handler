import React from 'react'
import { View, Image }  from 'react-native'

const IngredientTile = ({ ingredient }) => {
  return (
    <View style={styles.container} >
      <Image source={{uri: ingredient.img_url}} />
    </View>
  )
}

export default IngredientTile
