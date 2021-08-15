import './App.css';
import Modal from "react-modal";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { setUser, setGameId } from "../redux/cardSlice";
import { useHistory } from "react-router-dom";
function App() {
  const [text,setText] = useState('');
  const user = localStorage.getItem("user");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  let  history = useHistory();
  useEffect(() => {
    console.log(user);
    if (user === null) {
      setModalIsOpen(true);
    }
  }, []);
  const setUserName = (e) => {
    e.preventDefault();
    dispatch(setUser({
      user:text
    }))
    localStorage.setItem("user",text);
    setText(''); 
    setModalIsOpen(false);
  }
  const startGame = ()=>{

    const gameId = Math.floor(Math.random()*10000)+1;
    dispatch(setGameId({
      gameId:`${user}-${gameId}`
    }))
    history.push(`/game/${user}-${gameId}`)
  }
  return (
    <div className="App">
      <h1>
        WELCOME {user}
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <form onSubmit={setUserName}>

            <input placeholder="Enter UserId" className="user-box" type="text" value={text} onChange={(e) => { setText(e.target.value) }}></input>
            <input className="btn" type="submit" value="Submit" />
          </form>
        </Modal>
        <br/>
        <input className="start-btn" type="submit" value="START GAME" onClick={()=>startGame()}/>
      </h1>
    </div>
  );
}

export default App;
