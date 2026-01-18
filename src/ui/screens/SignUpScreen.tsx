import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { styles } from '../styles/signUpStyles'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUpScreen = ({route, navigation}: Props) => {
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputRow}>
        <TextInput
            style={styles.input}
            value={email}
            onChange={() => setEmail}
            placeholder='your email'
        />
        <TextInput
            style={styles.input}
            value={password}
            onChange={() => setPassword}
            placeholder='your password'
        />
        <TextInput
            style={styles.input}
            value={nickname}
            onChange={() => setNickname}
            placeholder='your name'
        />
        <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen