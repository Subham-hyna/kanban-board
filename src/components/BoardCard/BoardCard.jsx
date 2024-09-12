import React from 'react'
import './BoardCard.css'
import { backgroundColors, icons, priorityIcons } from '../BoardSection/icons'

const BoardCard = ({g, groupBy}) => {

    const getInitials = (fullName) => {
        const [firstName, lastName = ""] = fullName.split(" ");
        return `${firstName[0]}${lastName[0] || ""}`.toUpperCase();
      };
    const backgroundColor = backgroundColors[Math.floor(Math.random() * 4)]

  return (
    <div className='board-card'>
        <span className='board-card-header'>
            <h3><pre>{g?.id}</pre></h3>
            {groupBy !== "userId" && <div className='profile-icon-box' style={{backgroundColor}}>{getInitials(g?.userName)}<span style={g.userAvailable?{backgroundColor:"#0caf49"}:{backgroundColor:"#dee0e3"}}></span></div>}
        </span>
        <span className='board-card-title'>
            {groupBy !== "status" && <img src={icons[g?.status]} alt='icon' />}
            <h2>{g?.title}</h2>
        </span>
        <span className='board-card-footer'>
            {groupBy !== "priority" && <div className='board-card-footer-icon'><img src={priorityIcons[g?.priority]} alt='icon' /></div>}
            {g?.tag?.map((t)=>(
                <div className='board-card-footer-tag'>
                    <div></div>
                    <p><pre>{t}</pre></p>
                </div>
            ))}
        </span>
    </div>
  )
}

export default BoardCard