import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Game.css';
import { showCard } from "../redux/cardSlice";
import { useDispatch } from 'react-redux';
export default function Card(props) {
    const dispatch = useDispatch();
    const openCard = (id)=>{

        dispatch(showCard({
            id:id
        }))
    }
    return (
        <div className="column">
            <ReactCardFlip isFlipped={props.isOpen} flipDirection="horizontal">

                <div className="card" onClick={()=>openCard(props.id)}>CLICK TO OPEN</div>
                <div className="card">
                    {props.type}
                </div>
            
            </ReactCardFlip>
        </div>
    )
}
