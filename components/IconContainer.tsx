import { useDispatch } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native';
import { moveCharacter } from '../redux/reducers/charactersListsSlice'

interface Props {
    id: number,
    clickedIcon: string,
}

const IconContainerTouchable: React.FC<Props> = ({ id, clickedIcon, children }) => {

    const dispatch = useDispatch();

    return (
        <TouchableWithoutFeedback onPress={() => dispatch(moveCharacter({ id, clickedIcon }))}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export default IconContainerTouchable;