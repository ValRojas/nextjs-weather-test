import styles from '../styles/Home.module.css'
import {Paper, Group, Text, TextInput, Button} from '@mantine/core'
import { useState } from 'react'

const API_KEY = '0484e96652a74127120c56f31fb859cc' //from https://home.openweathermap.org/api_keys

export default function Home() {
  const [cityInput, setCityInput] = useState('') // Save actual value we pun in input. 2
  console.log(cityInput)

  const [weatherData, setWeatherData] = useState({}) // expects array with info 

  async function getWeather(){ // 4
    console.log('button pressed')

    try{
      const serverResponse = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?' + // from https://openweathermap.org/current#name
        'q=' + //q is for the main thing I link
        cityInput +
        '&appid=' +
        API_KEY+
        '&units=metric') 

        const data = await serverResponse.json(); //expected data
        console.log('DATA BELOW:')
        console.log(data);

        if(data?.cod === '400') throw data; //show data error if so
        setWeatherData(data) // access data, set weather state 

    }catch (err){
      console.log('ERROR: ' + err) //show me the error if so
    }
  }

  return (
    <div className={styles.container} 
      style={{
        position: "static",
        backgroundImage: "url('https://littlevisuals.co/images/Njoror.jpg')",
        height: '100vh',
        backgroundSize: 'cover'
        }}>

        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>

          <Paper withBorder p='lg' style={{maxWidth: '500px'}}>

            <Group position='left'>
              <Text size='xl' weight={500} style={{color: '#0a2237', marginBottom:'10px'}}>
                Enter a city and watch the weather below
              </Text>
            </Group>

            <Group position='center' style={{marginBottom:'20px'}}>
              <TextInput label='City Name' placeholder='ex. Buenos Aires'
              onChange={(event) => setCityInput(event.target.value)} //Now is the value in input. 1
              />
              <Button variant='gradient' style={{bottom: '-12px'}} 
              onClick={() => getWeather()} // 3.
              >Go!</Button>
            </Group>

            {Object.keys(weatherData).length !== 0? //if responds, has data
              <div>

                <Group position='left'>
                  <Text>
                    {weatherData.name}
                  </Text>
                </Group>

                <Group position='left'>
                  <Text>
                    Feels like {weatherData.main.feels_like} &deg;
                  </Text>
                </Group>

                <Group position='left'>
                  <Text>
                    {weatherData.main.temp_max}&deg; / {weatherData.main.temp_min}&deg;
                  </Text>
                </Group>

                <Group position='center'>
                  <img src={'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'}/>
                  <Text>
                    Currently {weatherData.main.temp} &deg;
                  </Text>
                </Group>

              </div>
              :null
            }

          </Paper>
        </div>
    </div>
  )
}
