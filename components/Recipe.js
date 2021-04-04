import React from "react"
import {SafeAreaView, ScrollView} from "react-native"
import RecipeDetails from './RecipeDetails'
import RecipeIngredients from './RecipeIngredients'
import Score from './Score'
import RenderHtml from "react-native-render-html"

 export default ({title, uri, data}) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <RecipeDetails
                    title={title}
                    uri={uri}
                    vegetarian={data.vegetarian}
                    vegan={data.vegan}
                    glutenFree={data.glutenFree}
                    dairyFree={data.dairyFree}
                />
                <RecipeIngredients
                    extendedIngredients={data.extendedIngredients} />
                <Score healthScore={data.healthScore}/>
                <RenderHtml source={{html: data.summary}} />
            </ScrollView>
        </SafeAreaView>
    )
}
