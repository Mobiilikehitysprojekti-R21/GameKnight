import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/signUpStyles'

// Component for submit form

type SubmitFormProps = {
    header: string                        // Header for form
    email: string                         // value for email
    nickname: string                      // value for nickname
    setEmail: (text: string) => void      // function for setting email
    setNickname: (text: string) => void   // function for setting nickname
    checkNickname: () => void             // function for checking nickname availability
    showCheck: boolean                    // boolean for showing check-text
    isNickAvailable: boolean              // boolean for nickname´s availability
    submit: () => void                    // function signUp
    signIn: () => void                    // function signIn

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
                onSubmitEditing={checkNickname}
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