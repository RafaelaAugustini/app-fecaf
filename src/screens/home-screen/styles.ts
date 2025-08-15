import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        height: '50%',
        zIndex: -2,
        backgroundColor: '#2567E8'
    },
    containerLogin: {
        backgroundColor: '#fff',
        width: 334,
        height: 306,
        position: 'fixed',
        top: '50%',
        bottom: '50%',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
    redPassword: {
        color: 'red',
        marginTop: 4,
        textAlign: 'left'
    },
    redLogin: {
        color: 'red', fontSize: 16, marginBottom: 10, textAlign: 'center'
    },
    icon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        top: 40,
        zIndex: 2
    },
    textInput: {
        position: 'relative',
        height: 37,
        width: 286,
        paddingRight: 40,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 3,
        padding: 12,
        zIndex: 1
    },
    titleInput: {
        textAlign: 'left',
        width: '85%',
        marginBottom: 3,
        marginTop: 12,
        zIndex: 1
    }
})