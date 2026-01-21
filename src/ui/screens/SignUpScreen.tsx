import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { styles } from '../styles/signUpStyles'
import { useSignUpViewModel } from '../viewModels/useSignUpViewModel'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUpScreen = ({ navigation }: Props) => {
  
  // navigate to HomeScreen if sign up is successfull
  const vm = useSignUpViewModel(() => navigation.navigate('Home'))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputColumn}>
        <View style={styles.inputRow}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            style={styles.input}
            value={vm.email}
            keyboardType='email-address'
            onChangeText={vm.setEmail}
            placeholder='your email'
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.text}>Nickname:</Text>
          <TextInput
            style={styles.input}
            value={vm.nickname}
            onChangeText={(text) => {
              vm.setNickname(text)
            }}
            onEndEditing={vm.checkNickname}
            placeholder='your name'
          />
        </View>

        {vm.nickname.length > 0 && (
          <Text style={[
            styles.nicknameText,
            vm.isNickAvailable ? styles.available : styles.unavailable
          ]}>
            {vm.isNickAvailable ? 'Nickname on vapaa' : 'Nickname on varattu'}
          </Text>
        )}


        <TouchableOpacity
          style={[
            styles.primaryButton,
            !vm.isNickAvailable && styles.disabledButton]}
          onPress={vm.submit}
          disabled={!vm.isNickAvailable}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen