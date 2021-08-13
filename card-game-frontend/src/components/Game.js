import React from 'react'
import "./Game.css";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { setUser } from "../redux/cardSlice";
import Card from './Card';
export default function Game() {
    const cardValues = useSelector(state => state.cards.cardValues);
    const defuseCardCount = useSelector(state=> state.cards.defuseCardCount);
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Welcome To The Card Game
            </h1>
            <div class="row">

                {cardValues.map(card=>(
                    <Card type={card.type} isOpen={card.isOpen} id={card.id} defuseCardCount={defuseCardCount} />
                ))}
                
            </div>
        </div>
    )
}
