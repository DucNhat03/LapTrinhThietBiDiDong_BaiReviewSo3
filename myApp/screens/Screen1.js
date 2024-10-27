import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';

export default function Screen1({ navigation }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('https://671236b74eca2acdb5f79eeb.mockapi.io/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    
    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
    
        const user = users.find(
            (user) => user.email === email && user.password === password
        );
    
        if (user) {
            navigation.navigate('Screen2');
        } else {
            Alert.alert('Thông tin đăng nhập không chính xác!');
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ScreenUser')}>
                <Image 
                    source={require('../assets/Data/codicon_account.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <Image
                source={require('../assets/Data/icon.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Hello Again!</Text>
            <Text style={styles.subtitle}>Login into your account</Text>

            {/* Input Email */}
            <View
                style={[
                    styles.inputContainer,
                    focusedInput === 'email' && styles.inputFocused,
                ]}
            >
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
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#999" // Màu của placeholder
                />
            </View>

            {/* Input Password */}
            <View
                style={[
                    styles.inputContainer,
                    focusedInput === 'password' && styles.inputFocused,
                ]}
            >
                <Image
                    source={require('../assets/Data/lock.png')}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#999"
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Image
                        source={isPasswordVisible 
                            ? require('../assets/Data/show.png') 
                            : require('../assets/Data/hide.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => Alert.alert('Forgot Password clicked')} style={styles.forgotPasswordContainer}>
                <Text style={{ color: '#008B8B' }}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.lineContainer}>
                <Image
                    source={require('../assets/Data/minus.png')}
                    style={styles.line}
                />
                <Text style={{ paddingLeft: 25, paddingRight: 25, opacity: 0.8, fontSize: 16 }}>or</Text>
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
        borderRadius: 20,
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
        opacity: 0.5,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    inputFocused: {
        borderColor: '#008B8B',
        borderWidth: 2,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
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
        width: 30,
        height: 30,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    line: {
        width: '40%',
        height: 2,
        backgroundColor: '#ccc',
        marginVertical: 20,
        opacity: 0.2,
    },
    lineContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
});
