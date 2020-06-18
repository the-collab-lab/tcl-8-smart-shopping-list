import React, { useContext } from "react";
import UserContext from '../context/context'

const Room = () => {
  const {getTheList} = useContext(UserContext)

  return (
    <div> 
    <button onClick={getTheList} > Update </button>
    </div>
  )
}

export default Room;
 

