import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    [HYDRATE]: (state: any, action) => ({ ...state, ...action.payload })
  }
})

const nodeEnv = process.env.NODE_ENV

export const wrapper = createWrapper(
  () => store,
  { debug: (nodeEnv === 'development' || nodeEnv === 'test') }
)

export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch']
