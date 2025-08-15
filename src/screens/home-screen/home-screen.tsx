import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Feather from '@expo/vector-icons/Feather';

import { ButtonCustom } from '@/src/components/button-custom/button-custom';
import { storeSession } from '@/features/auth/authSlice';

import { styles } from './styles';

export const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();

  function validateLogin() {
    setTouched(true);
    let valid = true;

    if (email.trim() === '') {
      setEmailError('Campo obrigatório');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Campo obrigatório');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    const usuarioCorreto = 'João da Silva';
    const senhaCorreta = '1234';

    if (email === usuarioCorreto && password === senhaCorreta) {
      setLoginError('');
      dispatch(storeSession(email));
      router.navigate('./first.page');
    } else {
      setLoginError('Username ou senha inválidos');
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.containerLogin}>
            {loginError ? (
              <Text style={styles.redLogin}>{loginError}</Text>
            ) : null}

            <Text style={styles.titleInput}>Username</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}
              placeholder='Digite o seu usuário'
              placeholderTextColor={'#D3D3D3'}
            ></TextInput>

            {touched && emailError ? (
              <Text style={styles.redPassword}>{emailError}</Text>
            ) : null}

            <View>
              <Text style={styles.titleInput}>Senha</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}
                placeholder='Digite a sua senha'
                placeholderTextColor={'#D3D3D3'}
                secureTextEntry={hidePass}
              ></TextInput>

              {touched && passwordError ? (
                <Text style={styles.redPassword}>{passwordError}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.icon}
                onPress={() => setHidePass(!hidePass)}
              >
                {hidePass ? (
                  <Feather name='eye' size={20} color='black' />
                ) : (
                  <Feather name='eye-off' size={20} color='black' />
                )}
              </TouchableOpacity>
              <ButtonCustom onPress={validateLogin}></ButtonCustom>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
