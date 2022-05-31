import { useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { moveCharacter } from '../redux/reducers/charactersListsSlice'

interface Props {
    id: number,
    status: string,
    size?: number,
    color?: string,
}

const IconLike: React.FC<Props> = ({ id, status, size, color }) => {

    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={() => dispatch(moveCharacter({ id, clickedIcon: 'liked' }))}>
            <MaterialIcons 
                name={status === 'liked' ? 'favorite' : 'favorite-outline'}
                size={size || 25} 
                color={color || "black"} />
        </TouchableWithoutFeedback>
    )
}

export default IconLike;