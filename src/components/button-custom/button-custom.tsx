import { FC } from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

{/* FC (Function Component) quer dizer que a função retorna um componente e as props são as propriedades de um touchableopacity */ }
export const ButtonCustom: FC<TouchableOpacityProps> = (props) => {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.titleButton}>Entrar</Text>
        </TouchableOpacity>
    )
}
