import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { styles } from '../styles/signUpStyles'
import { useSignUpViewModel } from '../viewModels/useSignUpViewModel'
import SubmitForm from '../components/SubmitForm'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUpScreen = ({ navigation }: Props) => {
  
  // navigate to HomeScreen if sign up is successfull
  const vm = useSignUpViewModel(() => navigation.navigate('Home'))

  return (
    <View style={styles.container}>
      <View>
        <SubmitForm
        header='Luo tili'
        email={vm.email}
        nickname={vm.nickname}
        setEmail={vm.setEmail}
        setNickname={vm.setNickname}
        checkNickname={vm.checkNickname}
        showCheck={vm.showCheck}
        isNickAvailable={vm.isNickAvailable}
        submit={vm.submit}
        />
      </View>
      <View>
        <SubmitForm
        header='Kirjaudu sisään'
        email={vm.email}
        nickname={vm.nickname}
        setEmail={vm.setEmail}
        setNickname={vm.setNickname}
        checkNickname={vm.checkNickname}
        showCheck={vm.showCheck}
        isNickAvailable={vm.isNickAvailable}
        submit={vm.signIn}
        />
      </View>
      
    </View>
  )
}

export default SignUpScreen