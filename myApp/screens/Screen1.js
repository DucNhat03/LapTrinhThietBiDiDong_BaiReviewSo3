import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Screen1({ navigation }) {
    const users = [
        { email: "user1@example.com", password: "password1" },
        { email: "user2@example.com", password: "password2" },
        { email: "user3@example.com", password: "password3" },
        { email: "user4@example.com", password: "password4" },
        { email: "user5@example.com", password: "password5" },
    ];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        const user = users.find(
            (user) => user.email === email && user.password === password
        );
        if (user) {
            Alert.alert("Đăng nhập thành công!");
            navigation.navigate("Screen2");
        } else {
            setErrorMessage('Thông tin đăng nhập không chính xác!');
        }
    };

    return (
        <View style={styles.container}>
            {/* Icon back */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image 
                    source={require('../assets/Data/back.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            {/* Logo */}
            <Image
                source={require('../assets/Data/icon.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.subtitle}>Login into your account</Text>

            {/* Input Email*/}
            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/Data/emailicon.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Input Password */}
            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/Data/lock.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                {/* Show password toggle */}
                <TouchableOpacity onPress={() => setPassword(password === ''? 'password' : '')}>
                    <Image
                        source={require('../assets/Data/hide.png')}
                        style={styles.icon}
                    />
                    
                </TouchableOpacity>
            </View>
            {/* Forgot password */}
            <TouchableOpacity onPress={() => Alert.alert('Forgot Password clicked')} style={styles.forgotPasswordContainer}>
                <Text style={{ color:'#008B8B'}}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Error show */}
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            {/* Continue button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.lineContainer}>
                <Image
                    source={require('../assets/Data/minus.png')}
                    style={styles.line}
                />
                <Text style={{paddingLeft: 25, paddingRight: 25, opacity: 0.8, fontSize: 16}}>or</Text>
                <Image
                    source={require('../assets/Data/minus.png')}
                    style={styles.line}
                />
            </View>
            

            <View style={styles.iconRow}>
                <Image source={require('../assets/Data/google.png')} style={styles.socialIcon} />
                <Image source={require('../assets/Data/face.png')} style={styles.socialIcon} />
                <Image source={require('../assets/Data/apple.png')} style={styles.socialIcon} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logo: {
        width: '100%',
        height: 80,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 30,
        fontWeight: 'bold',
        opacity: 0.5
    },
    inputContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        opacity: 0.2,
        fontWeight: '700'
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#008B8B',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    forgotPasswordContainer: {
        width: '100%',
        alignItems: 'flex-end', 
        marginBottom: 20, 
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    socialIcon: {
        marginHorizontal: 10,
        resizeMode: 'contain',
    },
    backIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    line: {
        width: '40%',
        height: 2,
        backgroundColor: '#ccc',
        marginVertical: 20,
        opacity: 0.2,
        fontWeight: '800'
    },
    lineContainer: {
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 30
    }

});
