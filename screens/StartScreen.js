import common from '../common.style'

const StartScreen = ({ navigation }) => {
  return (
    <View>
      <SmallLogo />
      <Text style={common.headingMain}>
        Let's get started!
      </Text>
      <Text style={[common.text, {marginTop: 5}]}>
        Select your preferred supermarket
      </Text>
      <Sainsburys navigation={navigation} />
    </View>
  )
}

export default StartScreen
