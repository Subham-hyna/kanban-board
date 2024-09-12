import React, { useEffect, useState } from 'react'
import './Navbar.css'
import DisplayIcon from '../../assets/Display.svg'
import DownIcon from '../../assets/down.svg'
import { groupBy } from '../../redux/actions/groupingAction';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [showDisplayBox, setShowDisplayBox] = useState(false);
    const [showGroupBy, setShowGroupBy] = useState(localStorage.getItem("groupBy") || "status");
    const [showOrderBy, setShowOrderBy] = useState(localStorage.getItem("orderBy") || "priority");
    const dispatch = useDispatch();

    const groupBychangeHandler = (e) => {
        setShowGroupBy(e.target.value);
        setShowDisplayBox(false)
    }

    const orderBychangeHandler = (e) => {
        setShowOrderBy(e.target.value);
        setShowDisplayBox(false)
    }

    useEffect(()=>{
        dispatch(groupBy(showGroupBy,showOrderBy));
      },[showGroupBy,showOrderBy,dispatch]);

  return (
    <nav className='navbar'>
        <div className='nav-display' onClick={()=>setShowDisplayBox(!showDisplayBox)}>
            <img src={DisplayIcon} alt='Displat-icon' />
            <strong>Display</strong>
            <img src={DownIcon} alt='down-icon' style={showDisplayBox ? {transform:"rotate(180deg)"} : {}} />
        </div>
        <div className='nav-display-box' style={showDisplayBox ? {display:"flex"}:{display:"none"}}>
            <span>
                <p>Grouping</p>
                <div>
                <select value={showGroupBy} onChange={(e)=>(groupBychangeHandler(e))}>
                        <option value="status" >Status</option>
                        <option value="userId" >Users</option>
                        <option value="priority" >Priority</option>
                </select>
                </div>
            </span>
            <span>
            <p>Ordering</p>
            <div>
            <select value={showOrderBy} onChange={(e)=>(orderBychangeHandler(e))}>
                        <option value="priority" >Priority</option>
                        <option value="title" >Title</option>
            </select>
            </div>
            </span>
        </div>
    </nav>
  )
}

export default Navbar