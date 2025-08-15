import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 260,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 6,
    textOverflow: 'auto',
  },
  description: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#e00',
  },
  priceOld: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
});
