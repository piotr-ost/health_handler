import React, { useEffect, useState } from 'react'
import { 
  View, 
  StyleSheet, 
  Text,
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native'
import common from '../common.style'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

const MealScreen = ({ route, navigation }) => {
  const [ingredients, setIngredients] = useState([])
  const { meal } = route.params
  const productsUrl = 'https://handler.health/products/'
  useEffect(() => {
    if (meal.meal_id) {
      let productsList = meal.products.split(',')
      productsList.forEach(product =>
        fetch(productsUrl + product)
          .then(r => r.json())
          .then(r => setIngredients(
            ingredients => [...ingredients, r])
          )
      )
    }
  }, [])
  return (
    <View>
    { meal.meal_id ?
      <View>
        <Image source={{uri: meal.img}} style={styles.image} />
        <TouchableOpacity 
          style={{
            position: 'absolute', 
            left: '10.77%',
            right: '84.04%',
            top: '13.3%',
            bottom: '91.87%'
          }}
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('../assets/return.png')} 
          />
        </TouchableOpacity>
        <View style={styles.infoCard}> 
          <Text style={styles.headingText}>
            {meal.name}
          </Text>
          <ScrollView style={{height: '25%', marginTop: 10}}>
            <Text style={styles.descriptionText}>
              {meal.description}
            </Text>
          </ScrollView>
          <Text style={styles.headingText}>Ingredients</Text>
          <View style={{
            height: 245,
            width: '100%', 
          }}>
            <ScrollView 
              style={{flex: 1, flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {
                ingredients.map((product, index) => 
                  <View 
                    style={index === 0 
                      ? {marginLeft: 10}
                      : {marginLeft: 25}
                    }
                    key={index}
                  >
                    <Ingredient product={product} />
                  </View>
                )
              }
            </ScrollView>
          </View>
        </View>
      </View>
      :
    <View>
      <Image source={{uri: meal.img_url}} style={styles.image} />
      <TouchableOpacity 
        style={{
          position: 'absolute', 
          left: '10.77%',
          right: '84.04%',
          top: '13.3%',
          bottom: '91.87%'
        }}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../assets/return.png')} 
        />
      </TouchableOpacity>
      <View style={styles.infoCard}> 
        <Text style={styles.headingText}>
          {meal.name}
        </Text>
        <MaskedView maskElement={
          <Text style={styles.headingText}>
            <Text style={styles.text}>Cost: </Text>
            <Text>
              {' '} {meal.price} {meal.currency}
            </Text>
          </Text>
        }>
          <LinearGradient colors={['#5AD710', '#22E4CD']}>
            <Text style={styles.headingText}>
              Cost: 
              <Text style={{opacity: 0}}>
                {' '} {meal.price} {meal.currency}
              </Text>
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </View>
    }
  </View>
  )
}

const Ingredient = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image 
        style={{width: 130, height: 150, borderRadius: 10}} 
        source={{uri: product.img_url}} 
      />
      <View style={styles.blank} />
    </View>
  )
}

const styles = StyleSheet.create({
  subText: {
    ...common.text,
    fontSize: 14,
    lineHeight: 16,
    color: '#858585'
  },
  headingText: {
    ...common.headingMain,
    fontSize: 21,
    lineHeight: 29,
    marginTop: 9,
    marginBottom: 0
  },
  descriptionText: {
    ...common.text,
    fontSize: 12,
    lineHeight: 17,
  },
  image: {
    width: '100%',
    height: 450,
  },
  infoCard: {
    width: '100%',
    height: 500,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FDFDFF',
    paddingVertical: 36,
    paddingHorizontal: 37,
    position: 'absolute',
    top: '80%',
    left: 0
  },
  container: {
    marginTop: 25,
    borderRadius: 10,
    width: 140,
    height: 160,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5
  }
})

export default MealScreen
