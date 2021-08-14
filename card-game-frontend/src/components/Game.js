import React from 'react'
import "./Game.css";
import { useSelector } from 'react-redux';
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { generateRandomCards } from "../redux/cardSlice";
import Card from './Card';
import { useDispatch } from 'react-redux';
export default function Game() {
    const cardValues = useSelector(state => state.cards.cardValues);
    const defuseCardCount = useSelector(state=> state.cards.defuseCardCount);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const gameStatus = useSelector(state=> state.cards.gameStatus);
    const dispatch = useDispatch();
    const displayModal = ()=>{
        setModalIsOpen(true);
    }

    const startNewGame = ()=>{
        dispatch(generateRandomCards());
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={startNewGame}>

                    <p>You Loose</p>
                    <input className="btn" type="submit" value="Restart" />
                </form>
            </Modal>
            <Modal isOpen={cardValues.length===0?true:false} onRequestClose={() => setModalIsOpen(false)}>
                <form onSubmit={startNewGame}>

                    <p>You Win</p>
                    <input className="btn" type="submit" value="Restart" />
                </form>
            </Modal>
            <h1 style={{ textAlign: "center" }}>
                Welcome To The Card Game
            </h1>
            <div className="row">

                {cardValues.map(card=>(
                    <Card type={card.type} isOpen={card.isOpen} id={card.id} defuseCardCount={defuseCardCount} displayModal={displayModal} />
                ))}
                
            </div>
            <div className = "leaderboard">
                <h3>Defuse Card Count :  {defuseCardCount}</h3>
                <h3>Leaderboard</h3>
                

                    {/* fetch leaderboard from backend */}
            </div>
            <div className="gameStatusDisplay">
                    {gameStatus}
            </div>
        </div>
    )
}
