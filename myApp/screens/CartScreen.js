import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CartScreen({ route, navigation }) {
    const [cartItems, setCartItems] = useState([]);

    // Lấy dữ liệu từ params và gộp sản phẩm giống nhau
    useEffect(() => {
        const items = route.params?.cartItems || [];
        const groupedItems = groupItemsByQuantity(items);
        setCartItems(groupedItems);
    }, [route.params]);

    // Gộp các sản phẩm giống nhau và tính số lượng
    const groupItemsByQuantity = (items) => {
        const grouped = {};
        items.forEach((item) => {
            if (grouped[item.name]) {
                grouped[item.name].quantity += 1;
            } else {
                grouped[item.name] = { ...item, quantity: 1 };
            }
        });
        return Object.values(grouped);
    };

    // Giảm số lượng sản phẩm hoặc xóa nếu số lượng về 0
    const removeItem = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        setCartItems(updatedCart);
    };

    // Tính tổng số tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', '')); // Chuyển giá sang số
            return total + price * item.quantity;
        }, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image 
                        source={require('../assets/Data/back.png')} 
                        style={styles.backIcon} 
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Cart</Text>
            </View>

            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyCart}>Your cart is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.price}>{item.price}</Text>
                                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.removeButton} 
                                onPress={() => removeItem(index)}
                            >
                                <Text style={styles.removeButtonText}>-</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.checkoutButton} 
                        onPress={() => navigation.navigate('SuccessScreen', { total: calculateTotal() })}
                        
                    >
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', elevation: 2 },
    backButton: { marginRight: 10 },
    backIcon: { width: 24, height: 24, resizeMode: 'contain' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyCart: { fontSize: 18, color: 'gray' },
    item: { 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        padding: 10, 
        margin: 10, 
        borderRadius: 8, 
        elevation: 2, 
        alignItems: 'center' 
    },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
    itemInfo: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    price: { fontSize: 14, color: '#888' },
    quantity: { fontSize: 14, color: 'gray' },
    removeButton: { 
        backgroundColor: 'red', 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    removeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    footer: { padding: 10, backgroundColor: '#fff', elevation: 2 },
    checkoutButton: { 
        backgroundColor: 'dodgerblue', 
        padding: 15, 
        borderRadius: 8, 
        alignItems: 'center' 
    },
    checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
