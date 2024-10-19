import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SuccessScreen({ route, navigation }) {
    const { total } = route.params; // Nhận tổng số tiền từ params

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Payment Successful!</Text>
            <Text style={styles.total}>Total Amount: ${total}</Text>

            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.navigate('Screen2')}
            >
                <Text style={styles.backButtonText}>Back to Products</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
    message: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    total: { fontSize: 20, marginBottom: 40 },
    backButton: { backgroundColor: 'dodgerblue', padding: 15, borderRadius: 8 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
