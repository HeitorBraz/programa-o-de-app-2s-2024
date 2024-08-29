import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';

function App() {
  return (
    <View>
      <Header title={'Sport Car'}/>
      <Image
      source={{uri: 'https://s2-autoesporte.glbimg.com/CnfrON0qMBG5iUA-MXpsrmk9MMI=/0x0:1980x1139/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2024/y/X/2P7T2VS1mTWBAJc37JQw/lamborghini-temerario-2025-2-.jpg'}}
      width={400}
      height={200}/>
    </View>
  );
}

export default App


function Header(title) {
  return (
    <Text>(title)</Text>
  )
}
