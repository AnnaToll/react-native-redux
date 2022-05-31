import { createAction, createReducer } from '@reduxjs/toolkit'

const moveCharacter = createAction('MOVE_CHARACTER');
const addAllCharacters = createAction('ADD_ALL_CHARACTERS');

const initState = {
    allCharacters: [],
    likedCharacters: [],
    costumeMade: []
};

const characterListsReducer = createReducer(initState, (builder) => {
    
    builder
        .addCase(addAllCharacters, (state, action) => {
            state.allCharacters = action.payload;
        })
        .addCase(moveCharacter, (state, action) => {
            const { newStatus, id } = action.payload;

            let index = -1;

            for (let list in state) {
                index = state[list].findIndex(element => element.id === id);
                if (index !== -1) {
                    const prevStatus = state[list][index].status;
                    state[list][index].status = newStatus;
                    const chosenItem = state[list][index].splice(index, 1);

                    if (prevStatus === newStatus)
                        state.allCharacters.unshift(chosenItem);
                    else if (newStatus === 'liked')
                        state.likedCharacters.unshift(chosenItem);
                    else if (newStatus === 'costume made')
                        state.costumeMade.unshift(chosenItem);
                    break;
                }
            }
            
        })

})

export default characterListsReducer;