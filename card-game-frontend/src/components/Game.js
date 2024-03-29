import React from 'react'
import "./Game.css";
import { useSelector } from 'react-redux';
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { generateRandomCards , updateLeaderboard, setUser} from "../redux/cardSlice";
import Card from './Card';
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import axios from "axios";
import { useHistory } from 'react-router-dom';
const socket = io("http://localhost:3001");

socket.on("connect",()=>{
    console.log('connected to server with socket'+socket.id);
  })


export default function Game() {
    const cardValues = useSelector(state => state.cards.cardValues);
    const defuseCardCount = useSelector(state=> state.cards.defuseCardCount);
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [looseModalIsOpen, setLooseModalIsOpen] = useState(false);
    const gameStatus = useSelector(state=> state.cards.gameStatus);
    const leaderBoard = useSelector(state => state.cards.leaderBoard);
    const userId = localStorage.getItem("user");
    const dispatch = useDispatch();
    const history = useHistory();
    // const location = useLocation();
    const displayModal = ()=>{
        setLooseModalIsOpen(true);
    }
    const updateGame = (result)=>{
        if(result==="WON")
        {
            socket.emit("update-points",userId);
        }
    }

    const startNewGame = ()=>{
        history.push("/");
    }

    useEffect(()=>{
        // console.log(location.pathname);
        // const pathArray = location.pathname.split('/');
        // const gameId = pathArray[pathArray.length-1];
        // const user = gameId.split('-')[0];
        const fetchData = async()=>{
            const result = await axios.get('http://localhost:3001/get_leaderboard');
            // console.log(result.data.data);
            const finalData = result.data.data.map(record=>{
                let parsedRecord = JSON.parse(record)
                delete parsedRecord.games;
                return parsedRecord;
            });
            dispatch(updateLeaderboard({finalData:finalData}))
        }
        fetchData();
        dispatch(setUser({
            user:userId
          }))
        dispatch(generateRandomCards());
        socket.emit("set-user",userId);
    },[])

    socket.on("update-leaderboard",(userData)=>{
        // console.log("update-leaderboard",userData);
        delete userData.games;
        const leaderBoardCopy = JSON.parse(JSON.stringify(leaderBoard));
        
        let found = false;
        // console.log("yes 75");
        for(let i=0;i<leaderBoardCopy.length;i++)
        {
            if(leaderBoardCopy[i].userId===userData.userId)
            {
                leaderBoardCopy[i] = userData;
                found=true;
            }
        }
        if(!found)
        {
            leaderBoardCopy.push(userData);
        }
        
        dispatch(updateLeaderboard({finalData:leaderBoardCopy}));
    })
    return (
        <div>
            <Modal isOpen={looseModalIsOpen} onRequestClose={() => setLooseModalIsOpen(false)}>
                <form onSubmit={startNewGame}>

                    <p>You Loose</p>
                    <input className="btn" type="submit" value="Restart" />
                </form>
            </Modal>
            <Modal isOpen={cardValues.length===0?true:false} onAfterOpen={()=>updateGame("WON")} >
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
                
                    <ul>{leaderBoard.map(user=>(
                        <p>{user.userId} &nbsp;&nbsp;&nbsp;&nbsp; {user.points}</p>
                    ))}
                    </ul>
                    {/* fetch leaderboard from backend */}
            </div>
            <div className="gameStatusDisplay">
                    {gameStatus}
            </div>
        </div>
    )
}
