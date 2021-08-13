import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
    name:"cards",
    initialState:{
        cardValues:[
            {
                id:"1",
                type:"Cat",
                isOpen:false
            },
            {
                id:"2",
                type:"Shuffle",
                isOpen:false
            },
            {
                id:"3",
                type:"Cat",
                isOpen:false
            },
            {
                id:"4",
                type:"ExplodingK",
                isOpen:false
            },
            {
                id:"5",
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
            const id = action.payload.id;
            for(let i=0;i<state.cardValues.length;i++)
            {
                const card = state.cardValues[i];
                if(card.id===id && !card.isOpen)
                {
                    state.cardValues[i].isOpen = true;
                }
            }
        },
        removeCard:(state,action)=>{
            state.cardValues = state.cardValues.filter(card=>card.id!==action.payload.id);
        },
        generateRandomCards:(state,action)=>{
            let newCards = [];
            for(let i=0;i<5;i++)
            {
                const randomIndex = Math.floor(Math.random()*state.availableCardValues.length);
                newCards.push({
                    id:i+1,
                    type:state.availableCardValues[randomIndex],
                    isOpen:false
                })
            }
            state.cardValues = newCards;
        },
        incrementDefuseCount:(state,action)=>{
            state.defuseCardCount++;
        },
        decrementDefuseCount:(state,action)=>{
            state.defuseCardCount--;
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