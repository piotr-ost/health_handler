import { StyleSheet, Dimensions } from 'react-native'


export default StyleSheet.create({
    screen: {
      display: 'flex',
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      paddingVertical: 10,
      paddingHorizontal: 27,
      justifyContent: 'space-between'
    },
    header: {
      height: 45,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
      margin: 10,
      marginTop: 30
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    column: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    headingMain: {
      fontFamily: 'PoppinsRegular',
      fontSize: 25,
      lineHeight: 37,
      color: '#212121',
      marginTop: 30
    },
    text: {
      fontFamily: 'PoppinsLight',
      fontSize: 18,
      lineHeight: 27,
      color: '#212121'
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
})

export const GREEN = '#6FBF44'
