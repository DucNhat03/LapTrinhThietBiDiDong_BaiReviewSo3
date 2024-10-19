import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function UsersScreen() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://671236b74eca2acdb5f79eeb.mockapi.io/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    return (
        <ScrollView>
            {users.map(user => (
                <View key={user.id} style={{ marginBottom: 20 }}>
                    <Text>Username: {user.username}</Text>
                    <Text>Password: {user.password}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
