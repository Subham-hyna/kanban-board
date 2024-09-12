import React from 'react'
import './KanbanBoard.css'
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import BoardSection from '../../components/BoardSection/BoardSection';

const KanbanBoard = () => {

  const { groups, groupBy, orderBy,groupLoading } = useSelector(state=>state.group);

  return (
    <main className='kanban-board'>
            <Navbar />
            {groupLoading ?
            <h1>Loading</h1>
            :
            <div className='kanban-board-content'>

            {groups && Object.keys(groups).map((group)=>(
              <BoardSection group={group} groupBy={groupBy} orderBy={orderBy} />
            ))}

            </div>}
    </main>
  )
}


export default KanbanBoard