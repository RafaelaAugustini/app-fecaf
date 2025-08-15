import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { styles } from './styles';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  thumbnail: string;
  discountedPrice?: number;
}

export default function Product() {
  const { productId } = useLocalSearchParams();

  const [productData, setProductData] = useState<IProduct>();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, [productId]);

  const discountedPrice = productData?.discountPercentage
    ? productData?.price * (1 - productData?.discountPercentage / 100)
    : null;

  return (
    <View>
      <Image
        source={{ uri: productData?.thumbnail }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{productData?.title}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            R${' '}
            {discountedPrice
              ? discountedPrice.toFixed(2).replace('.', ',')
              : productData?.price.toFixed(2).replace('.', ',')}
          </Text>
          {discountedPrice && (
            <Text style={styles.priceOld}>
              R$ {productData?.price.toFixed(2).replace('.', ',')}
            </Text>
          )}
        </View>
        <Text style={styles.description}>{productData?.description}</Text>
      </View>
    </View>
  );
}
