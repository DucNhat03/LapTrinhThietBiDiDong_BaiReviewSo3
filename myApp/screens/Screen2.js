import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function Screen2({ navigation }) {
    const [smartphones, setSmartphones] = useState([]);
    const [ipads, setIpads] = useState([]);
    const [macbooks, setMacBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Smartphones');
    const [selectedTab, setSelectedTab] = useState('bestSales');
    const [seeAll, setSeeAll] = useState(false);
    const [cart, setCart] = useState([]);

    // Hàm gọi API cho Smartphones
    const fetchSmartphones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Smartphones');
            setSmartphones(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu smartphone:', error);
        }
    };

    // Hàm gọi API cho iPads
    const fetchIpads = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Ipads');
            setIpads(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu iPads:', error);
        }
    };

    // Hàm gọi API cho MacBooks
    const fetchMacBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/MacBooks');
            setMacBooks(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu MacBooks:', error);
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchSmartphones();
        fetchIpads();
        fetchMacBooks();
    }, []);

    // Cập nhật cách lấy sản phẩm dựa trên selectedCategory và selectedTab
    const getProducts = () => {
        if (selectedCategory === 'Smartphones') {
            return smartphones[selectedTab] || [];
        } else if (selectedCategory === 'Ipads') {
            return ipads[selectedTab] || [];
        } else {
            return macbooks[selectedTab] || [];
        }
    };

    const products = getProducts();
    const displayedProducts = seeAll ? products : products.slice(0, 4);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/Data/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Electronics</Text>
                <TouchableOpacity style={styles.cartButton} 
                    onPress={() => navigation.navigate('CartScreen', { cartItems: cart })}>
                    <Image source={require('../assets/Data/carticon.png')} style={styles.cartIcon} />
                </TouchableOpacity>
                <Image source={require('../assets/Data/logodog.jpg')} style={styles.avatar} />
            </View>

            <View style={styles.searchContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                    <TextInput 
                        style={{ width: '90%', height: 35, paddingLeft: 40, backgroundColor: '#DCDCDC', borderRadius: 2 }} 
                        placeholder='Search' 
                    />
                    <TouchableOpacity style={{ position: 'absolute', left: 10 }}>
                        <Image source={require('../assets/Data/searchicon.png')} style={{ width: 18, height: 18, opacity: 0.7, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#DCDCDC', width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                    <Image source={require('../assets/Data/filtericon.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.categories}>
                    <Text style={styles.categoryTitle}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See all</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoryIcons}>
                    <TouchableOpacity onPress={() => { setSelectedCategory('Smartphones'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/smart.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedCategory('Ipads'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/ipad.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedCategory('MacBooks'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/macbook.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => { setSelectedTab('bestSales'); setSeeAll(false); }}>
                        <Text style={selectedTab === 'bestSales' ? styles.tabSelected : styles.tab}>Best Sales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedTab('bestMatched'); setSeeAll(false); }}>
                        <Text style={selectedTab === 'bestMatched' ? styles.tabSelected : styles.tab}>Best Matched</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedTab('popular'); setSeeAll(false); }}>
                        <Text style={selectedTab === 'popular' ? styles.tabSelected : styles.tab}>Popular</Text>
                    </TouchableOpacity>
                </View>

                {displayedProducts.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <TouchableOpacity onPress={() => addToCart(product)}>
                                <Image source={require('../assets/Data/addicon.png')} style={styles.addIcon} />
                            </TouchableOpacity>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </View>
                    </View>
                ))}

                <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
                    <Text style={{ color: 'dodgerblue', textAlign: 'center', padding: 10 }}>
                        {seeAll ? 'See less' : 'See all'}
                    </Text>
                </TouchableOpacity>

                <Image source={require('../assets/Data/banner.png')} style={styles.banner} />
            </ScrollView>

            <View style={styles.navBar}>
                <Image source={require('../assets/Data/homeicon.png')} style={styles.iconNavBar} />
                <Image source={require('../assets/Data/searchicon.png')} style={styles.iconNavBar} />
                <View>
                    <Image source={require('../assets/Data/favourite.png')} style={styles.iconNavBar} />
                </View>
                <Image source={require('../assets/Data/chat.png')} style={styles.iconNavBar} />
                <Image source={require('../assets/Data/usericon.png')} style={styles.iconNavBar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'contain',
        marginLeft: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAll: {
        color: 'dodgerblue',
    },
    categoryIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,

    },
    categoryIcon: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#B0C4DE',
        backgroundColor: '#B0C4DE',
        borderRadius: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tabSelected: {
        color: 'dodgerblue',
        fontWeight: 'bold',
        backgroundColor: '#ADD8E6',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 5,
    },
    tab: {
        color: 'gray',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    productImage: {
        width: 50,
        height: 50,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontWeight: 'bold',
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginTop: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    backIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    cartIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    cartButton: {
        width: 25,
        height: 25,
        marginLeft: '37%'
    },
    backButton: {
        width: 25,
        height: 25,
    },
    iconNavBar: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        tintColor: 'dodgerblue'
    }
});
