import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



type ProviderType = 'aws' | 'huawei';

interface resourceList {
  provider: ProviderType | '';
  providerId: number;
}

const initialState: resourceList = {
  provider: '',
  providerId: 0,
};

export const resourceListSlice = createSlice({
name:'resourceListSlice',
initialState:{initialState},
reducers:({
    addResource:(state, action: PayloadAction<ProviderType>)=>{
console.log(state,action)
    }
    
})
})


export const resourceListStore = {
    reducer: resourceListSlice.reducer,
    action: resourceListSlice.actions,
  };
  