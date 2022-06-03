import { Character } from "../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface CharactersReduxState {
    isInitDataFetched: boolean,
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
        ratio: number,
    },
    photoPicker: {
        isActive: boolean,
        characterId: number | null,
        photoUri: string,
    }
    savedCharactersBtn: string,
}

const initState: CharactersReduxState = {
    isInitDataFetched: false,
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
        ratio: 1,
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
            state.isInitDataFetched = true;
        },
        moveCharacter(state, action) {
            const { clickedIcon, id } = action.payload;
            let index = -1

            for (let [, list] of Object.entries(state.lists)) {
                index = list.findIndex(element => element.id === id)
                if (index !== -1) {
                    const character = list[index]
                    const prevStatus = character.status
                    
                    if (prevStatus === clickedIcon) {
                        state.lists.allCharacters.unshift(character)
                        character.status = 'not saved'
                    } else if (clickedIcon === 'liked') {
                        state.lists.likedCharacters.unshift(character)
                        state.savedCharactersBtn = 'liked'
                        character.status = action.payload.clickedIcon
                    } else if (clickedIcon === 'costume made') {
                        state.lists.costumeMade.unshift(character)
                        state.savedCharactersBtn = 'costume'
                        character.status = action.payload.clickedIcon
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
                const newArr = [... state.lists.costumeMade, ...state.lists.likedCharacters, ...state.lists.allCharacters] 
                const filteredCharacters: Character[] = newArr.filter(character => character.name.toLowerCase().includes(action.payload.toLowerCase()));
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
        deletePhoto(state, action) {
            const index = state.lists.costumeMade.findIndex(element => element.id === action.payload.id)
            const newCostumeImageArr = state.lists.costumeMade[index].costumeImages.filter(images => images.uri !== action.payload.uri)
            state.lists.costumeMade[index].costumeImages = newCostumeImageArr
        },
        editCameraData(state, action) {
            state.cameraData = {...state.cameraData, ...action.payload}
        },
        editSelectedCharactersBtn(state, action) {
            state.savedCharactersBtn = action.payload.btn
        },
        addImgRatio(state, action) {
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
    deletePhoto,
} = charactersListsSlice.actions;

export default charactersListsSlice.reducer;
