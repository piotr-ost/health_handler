import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {getRecipeInformation} from '../getRecipeInfo'
import {RecipeDetailsSpinner} from '../components/Spinners'
import {RecipeHeader} from '../components/Headers'
import Recipe from '../components/Recipe'
import common from '../common.style'

const RecipeScreen = ({navigation, route}) => {
    const {id, uri, title} = route.params
    const [data, setData] = useState(null)
    useEffect(() => {
        getRecipeInformation(id).then(r => {
            setData(r)
            console.log(r)
        }).catch(e => console.log(e))
    }, [])
    return (
        <View style={common.screen}>
            <RecipeHeader navigation={navigation} />
            {data
                ? <Recipe title={title} uri={uri} data={data}/>
                : <RecipeDetailsSpinner/>
            }
            <View />
        </View>
    )
}

// note to self:
// align is for the side axis whereas justify is for main axis,
// those will vary s.t. flex (main axis == flex direction)

export default RecipeScreen
