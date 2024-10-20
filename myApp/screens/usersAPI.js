import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UsersScreen() {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get('http://localhost:5000/Userss')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    return (
        <View style={styles.container}>
            <Button 
                title="Quay lại" 
                onPress={() => navigation.goBack()} 
                style={styles.backButton} 
            />
            <ScrollView style={styles.table}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerCell}>Email</Text>
                    <Text style={styles.headerCell}>Password</Text>
                </View>
                {users.map(user => (
                    <View key={user.id} style={styles.row}>
                        <Text style={styles.cell}>{user.email}</Text>
                        <Text style={styles.cell}>{user.password}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    backButton: {
        marginBottom: 16,
    },
    table: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 3,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});
