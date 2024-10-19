import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-web';
import CartScreen from './CartScreen';

export default function Screen2({ navigation }) {
    const allProducts = {
        Smartphone: {
            bestSales: [
                { name: 'Smartphone 1', price: '$899', image: require('../assets/Data/1.png') },
                { name: 'Smartphone 2', price: '$899', image: require('../assets/Data/2.png') },
                { name: 'Smartphone 3', price: '$789', image: require('../assets/Data/3.png') },
                { name: 'Smartphone 4', price: '$999', image: require('../assets/Data/4.png') },
                { name: 'Smartphone 5', price: '$1099', image: require('../assets/Data/3.png') },
                { name: 'Smartphone 6', price: '$899', image: require('../assets/Data/2.png') },
                { name: 'Smartphone 7', price: '$599', image: require('../assets/Data/1.png') },

            ],
            bestMatched: [
                { name: 'Smartphone Matched 1', price: '$899', image: require('../assets/Data/1.png') },
                { name: 'Smartphone Matched 2', price: '$899', image: require('../assets/Data/2.png') },
                { name: 'Smartphone Matched 2', price: '$999', image: require('../assets/Data/1.png') },
                { name: 'Smartphone Matched 2', price: '$1099', image: require('../assets/Data/2.png') },
            ],
            popular: [
                { name: 'Smartphone Popular 1', price: '$899', image: require('../assets/Data/3.png') },
                { name: 'Smartphone Popular 2', price: '$899', image: require('../assets/Data/4.png') },
            ]
        },
        Ipad: {
            bestSales: [
                { name: 'Ipad 1', price: '$999', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad 2', price: '$1199', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad 3', price: '$1299', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad 4', price: '$1399', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad 5', price: '$1499', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad 6', price: '$1599', image: require('../assets/Data/ipad.png') },

                
            ],
            bestMatched: [
                { name: 'Ipad Matched 1', price: '$1099', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Matched 2', price: '$1399', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Matched 3 Pro', price: '$1399', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Matched 5 Pro', price: '$2399', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Matched 7 Pro', price: '$3599', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Matched 2 Pro', price: '$2399', image: require('../assets/Data/ipad.png') },


            ],
            popular: [
                { name: 'Ipad Popular 1', price: '$1299', image: require('../assets/Data/ipad.png') },
                { name: 'Ipad Popular 2', price: '$1599', image: require('../assets/Data/ipad.png') },

            ]
        },
        MacBook: {
            bestSales: [
                { name: 'MacBook 1', price: '$1499', image: require('../assets/Data/macbook.png') },
                { name: 'MacBook 2', price: '$1799', image: require('../assets/Data/macbook.png') },
            ],
            bestMatched: [
                { name: 'MacBook Matched 1', price: '$1599', image: require('../assets/Data/macbook.png') },
                { name: 'MacBook Matched 2', price: '$1799', image: require('../assets/Data/macbook.png') },
                { name: 'MacBook Matched 3', price: '$1999', image: require('../assets/Data/macbook.png') },

            ],
            popular: [
                { name: 'MacBook Popular 1', price: '$1999', image: require('../assets/Data/macbook.png') },
                { name: 'MacBook Popular 2', price: '$2999', image: require('../assets/Data/macbook.png') },

            ]
        }
    };
    const [selectedCategory, setSelectedCategory] = useState('Smartphone');
    const [selectedTab, setSelectedTab] = useState('bestSales');
    const [seeAll, setSeeAll] = useState(false);
    const [cart, setCart] = useState([]);

    const products = allProducts[selectedCategory][selectedTab];
    const displayedProducts = seeAll ? products : products.slice(0, 4);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image 
                        source={require('../assets/Data/back.png')}
                        style={styles.backIcon}
                        
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Electronics</Text>
                <TouchableOpacity style={styles.cartButton} 
                    onPress={() => navigation.navigate('CartScreen', { cartItems: cart })}>
                    <Image 
                        source={require('../assets/Data/carticon.png')}
                        style={styles.cartIcon}
                        
                    />
                </TouchableOpacity>
                <Image
                    source={require('../assets/Data/logodog.jpg')}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.searchContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
                    <TextInput style={{width: '90%',  height: 35, paddingLeft: 40,
                        backgroundColor: '#DCDCDC', borderRadius: 2
                    }} placeholder='Search'>
                    </TextInput>
                    <TouchableOpacity style={{position: 'absolute', left: 10, }}>
                        <Image 
                            source={require('../assets/Data/searchicon.png')}
                            style={{
                                width: 18,
                                height: 18,
                                opacity: 0.7,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                    
                </View>
                <TouchableOpacity style={{backgroundColor: '#DCDCDC', width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 2}}>
                    <Image
                        source={require('../assets/Data/filtericon.png')}
                        style={{width: 24, height: 24, resizeMode: 'contain', }}
                    />
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
                    <TouchableOpacity onPress={() => { setSelectedCategory('Smartphone'); setSelectedTab('bestSales'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/smart.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedCategory('Ipad'); setSelectedTab('bestSales'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/ipad.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setSelectedCategory('MacBook'); setSelectedTab('bestSales'); setSeeAll(false); }}>
                        <Image source={require('../assets/Data/macbook.png')} style={styles.categoryIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => setSelectedTab('bestSales')}>
                        <Text style={selectedTab === 'bestSales' ? styles.tabSelected : styles.tab}>Best Sales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab('bestMatched')}>
                        <Text style={selectedTab === 'bestMatched' ? styles.tabSelected : styles.tab}>Best Matched</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab('popular')}>
                        <Text style={selectedTab === 'popular' ? styles.tabSelected : styles.tab}>Popular</Text>
                    </TouchableOpacity>
                </View>

                {displayedProducts.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                        <Image source={product.image} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => addToCart(product)}>
                                <Image source={require('../assets/Data/addicon.png')}
                                    style={{ width: 20, height: 20, resizeMode: 'contain', top: -5, right: -15}}
                                />
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
                <Image 
                    source={require('../assets/Data/homeicon.png')}
                    style={styles.iconNavBar}
                />
                <Image 
                    source={require('../assets/Data/searchicon.png')}
                    style={styles.iconNavBar}
                />
                <View>
                    <Image 
                        source={require('../assets/Data/favourite.png')}
                        style={styles.iconNavBar}
                    />
                    
                </View>
                <Image 
                    source={require('../assets/Data/chat.png')}
                    style={styles.iconNavBar}
                />
                <Image 
                    source={require('../assets/Data/usericon.png')}
                    style={styles.iconNavBar}
                />
                
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
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    searchText: {
        fontSize: 16,
        marginLeft: 10,
        color: 'gray',
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
        borderColor: '#eee',
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
    seeAllButton: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#eee',
        marginVertical: 15,
    },
    seeAllText: {
        color: 'dodgerblue',
        fontWeight: 'bold',
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
        with: 25,
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
