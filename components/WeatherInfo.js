import React from 'react'
import { View, Text,StyleSheet ,Image} from 'react-native'
import colors from './utils/index.js'

//const {PRIMARY_COLOR,SECONDARY_COLOR}=colors
export default function WeatherInfo({currentWeather}) {
    const{
        main:{temp},
        name,
        weather:[details],
      }=currentWeather
      
      const {icon,description,main}=details
      const iconUrl=`http://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.WeatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.WeatherIcon} source={{uri:iconUrl}}/>
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.WeatherDesciption}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    WeatherInfo:{
        alignItems:'center',
    },
    WeatherDesciption:{
        textTransform:'capitalize',
    },
    WeatherIcon: {
      width:100,
      height:100
    },
    textPrimary:{
        fontSize:40,
        color:'#ff304f',
    },
    textSecondary:{
        fontSize:40,
        color:'#dbdbdb',
    },
  });
