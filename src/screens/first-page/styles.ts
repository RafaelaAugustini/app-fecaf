import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
    },
    indicator: {
        backgroundColor: '#1a73e8', // azul como na imagem
        height: 3,
    },
    tabLabel: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContainer: {
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '48%',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderColor: '#00000044',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardContent: {
        padding: 10,
        borderTopColor: "#00000044",
        borderTopWidth: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
    },
    description: {
        fontSize: 13,
        color: '#555',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    priceOld: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 8,
    },
});