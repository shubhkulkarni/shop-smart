import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart'
import settingsReducer from './slices/settings'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    settings: settingsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch