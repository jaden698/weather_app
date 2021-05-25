import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import UnitsPicker from './components/UnitsPicker';
import * as Location from 'expo-location'; 
import WeatherInfo from './components/WeatherInfo';

//const Weather_Api_Key='43c104676f0ed8d0234d20b05eeb5994';
const BASE_WEAHTER_URL='https://api.openweathermap.org/data/2.5/weather?';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');
  useEffect(() => {
    load();
  }, [unitsSystem])

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location is needed!')
        return
      }
      const location=await Location.getCurrentPositionAsync();
      const {longitude,latitude}=location.coords
      const weatherUrl=`${BASE_WEAHTER_URL}lat=${latitude}&units=${unitsSystem}&lon=${longitude}&appid=43c104676f0ed8d0234d20b05eeb5994`
      const response=await fetch(weatherUrl)
      const result=await response.json()
      if(response.ok){
        setCurrentWeather(result)
      }
      else{
        setErrorMessage(result.message)
      }
    }
    catch(error){
      setErrorMessage(error.message)
    }
  }
  if(currentWeather){
    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          
          <WeatherInfo currentWeather={currentWeather}/>
          
        </View>
      </View>
    );
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else{
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color='#ff304f'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
