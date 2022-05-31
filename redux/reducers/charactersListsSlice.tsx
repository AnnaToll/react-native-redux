import { Character } from "../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface CharactersReduxState {
    lists: {
        allCharacters: Character[],
        likedCharacters: Character[],
        costumeMade: Character[],
    },
    searchResult: Character[],
    cameraData: {
        isOpen: boolean,
        hasPermission: boolean,
        canAskAgain: boolean,
    },
    photoPicker: {
        isActive: boolean,
        characterId: number | null,
        photoUri: string,
    }
    savedCharactersBtn: string,
}

const initState: CharactersReduxState = {
    lists: {
        allCharacters: [],
        likedCharacters: [],
        costumeMade: [],
    },
    searchResult: [],
    cameraData: {
        isOpen: false,
        hasPermission: false,
        canAskAgain: true,
    },
    photoPicker: {
        isActive: false,
        characterId: null,
        photoUri: '',
    },
    savedCharactersBtn: 'liked',
};


const closePhotoPickerFunc = (state: CharactersReduxState) => {
    state.photoPicker.isActive = false
    state.photoPicker.characterId = null
    state.cameraData.isOpen = false
}


const charactersListsSlice = createSlice({
    name: 'characters',
    initialState: initState,
    reducers: {
        addAllCharacters(state, action) {
            state.lists.allCharacters = action.payload;
        },
        moveCharacter(state, action) {
            const { clickedIcon, id } = action.payload;
            let index = -1

            for (let [, list] of Object.entries(state.lists)) {
                index = list.findIndex(element => element.id === id)
                if (index !== -1) {
                    const character = list[index]
                    const prevStatus = character.status
                    character.status = action.payload.clickedIcon

                    if (prevStatus === clickedIcon) {
                        state.lists.allCharacters.unshift(character)
                    } else if (clickedIcon === 'liked') {
                        state.lists.likedCharacters.unshift(character)
                        state.savedCharactersBtn = 'liked'
                    } else if (clickedIcon === 'costume made') {
                        state.lists.costumeMade.unshift(character)
                        state.savedCharactersBtn = 'costume'
                    }
                    list.splice(index, 1)
                    break;
                }   
            }
        },
        searchCharacter(state, action) {
            if (action.payload.length === 0)
                state.searchResult = []
            else {
                const newArrAllLists = [...state.lists.costumeMade, ...state.lists.likedCharacters, ...state.lists.allCharacters]
                const filteredCharacters: Character[] = newArrAllLists.filter(character => character.name.toLowerCase().includes(action.payload.toLowerCase()));
                state.searchResult = filteredCharacters
            }
        },
        openPhotoPicker(state, action) {
            state.photoPicker.characterId = action.payload.id
            state.photoPicker.isActive = true

        },
        closePhotoPicker: closePhotoPickerFunc,
        savePhoto(state, action) {
            const index = state.lists.costumeMade.findIndex(element => element.id === state.photoPicker.characterId)
            state.lists.costumeMade[index].costumeImages.push({ uri: action.payload.uri, ratio: action.payload.ratio })
            closePhotoPickerFunc(state)
        },
        editCameraData(state, action) {
            state.cameraData = {...state.cameraData, ...action.payload}
        },
        editSelectedCharactersBtn(state, action) {
            state.savedCharactersBtn = action.payload.btn
        },
        addImgRatio(state, action) {
            console.log('adding ratio')
            const index = state.lists.allCharacters.findIndex(character => character.id === action.payload.id)
            state.lists.allCharacters[index].image.ratio = action.payload.ratio 
        }

    }
})

export const { 
    addAllCharacters, 
    moveCharacter, 
    searchCharacter, 
    openPhotoPicker, 
    closePhotoPicker, 
    savePhoto,
    editCameraData, 
    editSelectedCharactersBtn,
    addImgRatio,
} = charactersListsSlice.actions;

export default charactersListsSlice.reducer;
