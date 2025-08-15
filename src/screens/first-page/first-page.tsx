import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useRouter } from 'expo-router';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { removeSession } from '@/features/auth/authSlice';
import { RootState } from '@/app/store';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  discountedPrice?: number;
}

interface ProductListProps {
  data: Product[];
}

type HomeTabProps = {
  index: number;
  routes: {
    key: string;
    title: string;
  }[];
  renderScene: (
    props: SceneRendererProps & {
      route: {
        key: string;
        title: string;
      };
    }
  ) => React.ReactNode;
  setIndex: (index: number) => void;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const handleOnPress = () => {
    router.push({ pathname: `/product`, params: { productId: product.id } });
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.card}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            R${' '}
            {discountedPrice
              ? discountedPrice.toFixed(2).replace('.', ',')
              : product.price.toFixed(2).replace('.', ',')}
          </Text>
          {discountedPrice && (
            <Text style={styles.priceOld}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => <ProductCard product={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const HomeTab: React.FC<HomeTabProps> = ({
  index,
  routes,
  renderScene,
  setIndex,
}) => {
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          activeColor='#000'
          inactiveColor='#888'
        />
      )}
    />
  );
};

const SettingsTab: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.name);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnPress = () => {
    dispatch(removeSession());
    router.navigate('/');
  };

  return (
    <View
      style={{
        margin: 20,
        padding: 12,
      }}
    >
      <Text style={{ fontSize: 16 }}>Olá, {username}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#f00',
          borderRadius: 6,
          padding: 12,
          display: 'flex',
          alignItems: 'center',
          marginTop: 22,
        }}
        onPress={handleOnPress}
      >
        <Text style={{ fontSize: 18, color: '#fff' }}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Products() {
  const [products, setProducts] = useState<{
    feminino: Product[];
    masculino: Product[];
  }>({
    feminino: [],
    masculino: [],
  });

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'masculino', title: 'Produtos Masculinos' },
    { key: 'feminino', title: 'Produtos Femininos' },
  ]);

  useEffect(() => {
    axios
      .get<{ products: Product[] }>('https://dummyjson.com/products')
      .then(response => {
        const allProducts = response.data.products;

        const masculino = allProducts
          .filter((_, i) => i % 2 === 0)
          .map(p => ({
            ...p,
            discountedPrice: p.discountPercentage
              ? p.price * (1 - p.discountPercentage / 100)
              : undefined,
          }));

        const feminino = allProducts
          .filter((_, i) => i % 2 !== 0)
          .map(p => ({
            ...p,
            discountedPrice: p.discountPercentage
              ? p.price * (1 - p.discountPercentage / 100)
              : undefined,
          }));

        setProducts({ masculino, feminino });
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const renderScene = SceneMap({
    masculino: () => <ProductList data={products.masculino} />,
    feminino: () => <ProductList data={products.feminino} />,
  });

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'code-slash';

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Configurações') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name='Início'>
        {() => (
          <HomeTab
            index={index}
            renderScene={renderScene}
            routes={routes}
            setIndex={setIndex}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name='Configurações'>{() => <SettingsTab />}</Tab.Screen>
    </Tab.Navigator>
  );
}
