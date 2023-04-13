import { type ActionReducerMapBuilder } from '@reduxjs/toolkit'

export type TReducerWBuilder<T> = (builder: ActionReducerMapBuilder<T>) => void
