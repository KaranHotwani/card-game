import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Game.css';
import { decrementDefuseCount, incrementDefuseCount, removeCard, showCard, generateRandomCards, setGameStatus } from "../redux/cardSlice";
import { useDispatch } from 'react-redux';
export default function Card(props) {
    const dispatch = useDispatch();
    const openCard = ()=>{
        dispatch(showCard({
            id:props.id
        }))
        //display state on screen and then perform card action
        setTimeout(()=>{
            if(props.type==="Cat")
            {
                dispatch(removeCard({
                    id:props.id
                }));
                dispatch(setGameStatus({
                    gameStatus:"Cat Card. Removed."
                }));
            }
            else if(props.type==="Defuse")
            {
                dispatch(incrementDefuseCount());
                dispatch(removeCard({
                    id:props.id
                }));
                dispatch(setGameStatus({
                    gameStatus:"Defuse Card. Count Incremented."
                }));
            }
            else if(props.type==="ExplodingK")
            {
                if(props.defuseCardCount>=1)
                {
                    dispatch(decrementDefuseCount());
                    dispatch(removeCard({
                        id:props.id
                    }));
                    dispatch(setGameStatus({
                        gameStatus:"ExplodingK Card. Bomb Defused."
                    }));
                }
                else
                {
                    props.displayModal();
                }
            }
            else if(props.type==="Shuffle")
            {
                dispatch(generateRandomCards());
                dispatch(setGameStatus({
                    gameStatus:"Shuffle Card. Game Restarted."
                }));
            }

        },1000)
        
    }
    return (
        <div className="column">
            <ReactCardFlip isFlipped={props.isOpen} flipDirection="horizontal">

                <div className="card" onClick={()=>openCard()}>CLICK TO OPEN</div>
                <div className="card">
                    {props.type}
                </div>
            
            </ReactCardFlip>
        </div>
    )
}
