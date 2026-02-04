import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/signUpStyles'

type SubmitFormProps = {
    header: string
    email: string
    nickname: string
    setEmail: (text: string) => void
    setNickname: (text: string) => void
    checkNickname: () => void
    showCheck: boolean
    isNickAvailable: boolean
    submit: () => void
    signIn: () => void

}

const SubmitForm = ({header, email, nickname, setEmail, setNickname, checkNickname, showCheck, isNickAvailable, submit, signIn}: SubmitFormProps) => {
  return (
    <View>
          <Text style={styles.title}>{header}</Text>
          <View style={styles.inputColumn}>
            <View style={styles.inputRow}>
              <Text style={styles.text}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                placeholder='your email'
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.text}>Nickname:</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={(text) => {
                  setNickname(text)
                }}
                onEndEditing={checkNickname}
                placeholder='your name'
              />
            </View>
    
            {showCheck && (
              <Text style={[
                styles.nicknameText,
                isNickAvailable ? styles.available : styles.unavailable
              ]}>
                {isNickAvailable ? 'Nickname on vapaa' : 'Nickname on varattu'}
              </Text>
            )}
    
    
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !isNickAvailable && styles.disabledButton]}
              onPress={submit}
              disabled={!isNickAvailable}
            >
              <Text style={styles.buttonText}>Rekisteröidy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                isNickAvailable && styles.disabledButton]}
              onPress={signIn}
              disabled={isNickAvailable}
            >
              <Text style={styles.buttonText}>Kirjaudu sisään</Text>
            </TouchableOpacity>
          </View>
          </View>
  )
}

export default SubmitForm