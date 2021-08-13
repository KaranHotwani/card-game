import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Game.css';
import { decrementDefuseCount, incrementDefuseCount, removeCard, showCard, generateRandomCards } from "../redux/cardSlice";
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
                }))
            }
            else if(props.type==="Defuse")
            {
                dispatch(incrementDefuseCount());
                dispatch(removeCard({
                    id:props.id
                }));
            }
            else if(props.type==="ExplodingK")
            {
                if(props.defuseCardCount>1)
                {
                    dispatch(decrementDefuseCount());
                }
                else
                {
                    // display you loose the game in modal and give restart button
                }
            }
            else if(props.type==="Shuffle")
            {
                // restart game here
                dispatch(generateRandomCards());
            }
        },2000)
        
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
