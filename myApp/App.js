import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import ScreenUser from './screens/usersAPI';
import CartScreen from './screens/CartScreen'
import SuccessScreen from './screens/SuccessScreen'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Screen2' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Screen1' component={Screen1} />
        <Stack.Screen name='Screen2' component={Screen2} />
        <Stack.Screen name='ScreenUser' component={ScreenUser} />
        <Stack.Screen name='CartScreen' component={CartScreen} />
        <Stack.Screen name='SuccessScreen' component={SuccessScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
