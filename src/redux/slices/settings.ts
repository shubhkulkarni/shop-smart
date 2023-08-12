import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Themes } from '../../constants/constants'



export interface ISettingsState{
   theme: Themes.light | Themes.dark;

}
const initialState: ISettingsState = {
    theme: Themes.light
}

const settingsReducers = {
    toggleTheme: (state) => {
        state.theme = state.theme === Themes.light ? Themes.dark : Themes.light;
    },
}

export const settingsSlice = createSlice({
    initialState,
    name:'settings',
    reducers: settingsReducers
})

export const {toggleTheme} = settingsSlice.actions
const settingsReducer = settingsSlice.reducer
export default settingsReducer