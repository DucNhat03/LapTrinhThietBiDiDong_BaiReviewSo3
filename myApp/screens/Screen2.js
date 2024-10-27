import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function Screen2({ navigation }) {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Smartphone');
    const [selectedTab, setSelectedTab] = useState('bestSales');
    const [seeAll, setSeeAll] = useState(false);
    const [cart, setCart] = useState([]);

    // Gọi API để lấy tất cả sản phẩm
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://671236b74eca2acdb5f79eeb.mockapi.io/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Lọc sản phẩm dựa trên loại và loại khuyến mãi
    const getFilteredProducts = () => {
        return products.filter(
            product => product.type === selectedCategory && product.typeSale === selectedTab
        );
    };

    const displayedProducts = seeAll ? getFilteredProducts() : getFilteredProducts().slice(0, 4);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/Data/back.png')} style={{width: 25, height: 25}} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Electronics</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CartScreen', { cartItems: cart })}>
                    <Image source={require('../assets/Data/carticon.png')} style={styles.cartIcon} />
                </TouchableOpacity>
                <Image source={require('../assets/Data/logodog.jpg')} style={styles.avatar} />
            </View>

            {/* Search and Filter */}
            <View style={styles.searchContainer}>
                <TextInput placeholder="Search" style={styles.searchInput} />
                <TouchableOpacity>
                    <Image source={require('../assets/Data/filtericon.png')} style={styles.filterIcon} />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <ScrollView>
            <View style={styles.categoryIcons}>
            {[
                { name: 'Smartphone', image: require('../assets/Data/smart.png') },
                { name: 'Ipad', image: require('../assets/Data/ipad.png') },
                { name: 'MacBook', image: require('../assets/Data/macbook.png') }
            ].map((category) => (
                <TouchableOpacity
                    key={category.name}
                    onPress={() => setSelectedCategory(category.name)}
                    style={[
                        styles.categoryIcon,
                        selectedCategory === category.name && styles.selectedCategoryIcon
                    ]}
                >
                    <Image source={category.image} style={styles.categoryImage} />
                </TouchableOpacity>
            ))}
                </View>
        

                <View style={styles.tabs}>
                    {['bestSales', 'bestMatched', 'popular'].map((tab) => (
                        <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
                            <Text style={selectedTab === tab ? styles.tabSelected : styles.tab}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Display Products */}
                {displayedProducts.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text>{product.price}</Text>
                        </View>
                        <TouchableOpacity onPress={() => addToCart(product)}>
                            <Image source={require('../assets/Data/addicon.png')} style={styles.addIcon} />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
                    <Text style={{ color: 'dodgerblue', textAlign: 'center', padding: 10 }}>
                        {seeAll ? 'See less' : 'See all'}
                    </Text>
                </TouchableOpacity>


                {/* Banner */}
                <Image
                source={require('../assets/Data/banner.png')}
                style={styles.banner}
                />
            </ScrollView>
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
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    cartIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    filterIcon: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    seeAll: {
        fontSize: 14,
        color: 'dodgerblue',
    },
    categoryIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    categoryIcon: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },
    tab: {
        fontSize: 16,
        color: 'gray',
    },
    tabSelected: {
        fontWeight: 'bold',
        color: 'dodgerblue',
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
    },
    addIcon: {
        width: 30,
        height: 30,
        tintColor: 'dodgerblue',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    iconNavBar: {
        width: 28,
        height: 28,
        tintColor: 'dodgerblue',
    },
    categoryIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    categoryIcon: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    selectedCategoryIcon: {
        borderWidth: 2,
        borderColor: 'dodgerblue',
    },
    categoryImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginTop: 20,
        borderRadius: 10,
    },
});

