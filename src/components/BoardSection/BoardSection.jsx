import React from 'react'
import './BoardSection.css'
import { useSelector } from 'react-redux'
import { backgroundColors, icons } from './icons'
import BoardCard from '../BoardCard/BoardCard'

const BoardSection = ({groupBy, orderBy, group}) => {
  const { groups } = useSelector(state=>state.group);
  console.log(groups[group])

  const getInitials = (fullName) => {
    const [firstName, lastName = ""] = fullName.split(" ");
    return `${firstName[0]}${lastName[0] || ""}`.toUpperCase();
  };

const backgroundColor = backgroundColors[Math.floor(Math.random() * 4)]

  return (
    <div className='board-section'>
      <div className='board-section-header'>
        <span>
          {groupBy !== "userId" ? <img src={icons[group]} alt='icon' /> : <div className='profile-icon-box' style={{backgroundColor}}>{getInitials(groups[group].userName)}<span style={groups[group].userAvailable?{backgroundColor:"#0caf49"}:{backgroundColor:"#dee0e3"}}></span></div>}
          {groupBy !== "userId" ? <h3><pre>{group}</pre></h3> : <h3><pre>{groups[group].userName}</pre></h3>}
          {groupBy !== "userId" ? <p>{groups && groups[group].length}</p> : <p>{groups && groups[group].tickets.length}</p>}
        </span>
        <span>
          <img src={icons["AddIcon"]} alt='add-icon' />
          <img src={icons["ThreeDot"]} alt='three-dot' />

        </span>
      </div>
      <div className='board-section-boxes'>
        {groupBy !== "userId" 
        ?
        <>
        {groups && groups[group]?.map((g)=>
          <BoardCard g={g} groupBy={groupBy} />
        )}
        </>
        :
        <>
        {groups && groups[group]?.tickets?.map((g)=>
          <BoardCard g={g} groupBy={groupBy} />
        )}
        </>
        }
      </div>
    </div>
  )
}

export default BoardSection