import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name:"cards",
    initialState:{
        cardValues:[
            {
                type:"Cat",
                isOpen:false
            },
            {
                type:"Shuffle",
                isOpen:false
            },
            {
                type:"Cat",
                isOpen:false
            },
            {
                type:"ExplodingK",
                isOpen:false
            },
            {
                type:"Defuse",
                isOpen:false
            }
        ],
        availableCardValues:["Cat","Shuffle","ExplodingK","Defuse"],
        user:null,
        defuseCardCount:0,
        gameStatus:"NS",//"NS,W,L"
    },
    reducers:{
        showCard: (state,action)=>{
            const type = action.payload.type;
            for(let i=0;i<state.cardValues.length;i++)
            {
                const card = state.cardValues[i];
                if(card.type===type && !card.isOpen)
                {
                    state.cardValues[i].isOpen = true;
                }
            }
        },
        removeCard:(state,action)=>{

        },
        generateRandomCards:(state,action)=>{

        },
        incrementDefuseCount:(state,action)=>{

        },
        decrementDefuseCount:(state,action)=>{

        },
        setUser:(state,action)=>{
            state.user = action.payload.user;
        },
        setGameStatus:(state,action)=>{

        },
    }
})

export const { showCard, removeCard, generateRandomCards , incrementDefuseCount , decrementDefuseCount, setUser, setGameStatus} = cardSlice.actions;
export default cardSlice.reducer;