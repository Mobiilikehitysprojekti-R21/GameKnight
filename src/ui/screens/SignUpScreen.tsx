import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { styles } from '../styles/signUpStyles'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUpScreen = ({ route, navigation }: Props) => {
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")

  // Function to check inputs
  const signUpCheck = () => {

    // every input needs to be filled
    if (!email || !password || !nickname) {
      throw new Error('Email, password and nickname are required')
    }

    // email check
    if (!email.includes('@')) {
      throw new Error('Email needs to be in form: example@example.com')
    }

    // password check
    /* Must contain:
        - minimum 8 characters
        - a lowercase letter
        - a uppercase letter
        - a number
    */
    if (password.length < 8 || password.search(/[a-z]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
      throw new Error('Password must contain at least 8 characters, including an uppercase letter, a lowercase letter and a number')
    }
  }

  const handleSubmit = async () => {
    try {
      // check inputs
      signUpCheck()

      // tallennetaan arvot tietokantaan
      // tsekataan löytyykö käyttäjää/nickiä, tietokannassa unique? virhekoodi...
      // tähän oikea API-kutsulla
      console.log('Saving user:', { email, nickname, password: '***hashed***' })

      // empty input fields
      setEmail('')
      setNickname('')
      setPassword('')

      // navigate to HomeScreen
      navigation.navigate('Home')
    } catch (error) {
      
      // alert user of an error in input fields
      alert(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputColumn}>
        <View style={styles.inputRow}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            keyboardType='email-address'
            onChangeText={setEmail}
            placeholder='your email'
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            keyboardType='visible-password'
            onChangeText={setPassword}
            placeholder='your password'
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.text}>Nickname:</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder='your name'
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen