import { useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { moveCharacter } from '../redux/reducers/charactersListsSlice'

interface Props {
    id: number,
    status: string,
    size?: number,
    color?: string,
}

const IconCostumeMade: React.FC<Props> = ({ id, status, size, color }) => {

    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={() => dispatch(moveCharacter({ id, clickedIcon: 'liked' }))}>
            <AntDesign  
                name={status === 'costume made' ? 'android1' : 'android'}
                size={size || 22} 
                color={color || "black"} />
        </TouchableWithoutFeedback>
    )
}

export default IconCostumeMade;