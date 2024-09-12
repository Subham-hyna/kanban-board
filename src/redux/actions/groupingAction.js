import { clearGroupByError, clearGroupByMessage, groupByFail, groupByRequest, groupBySuccess } from "../reducers/groupingReducer";
import { server } from "../store";
import axios from "axios";

export const groupBy = (groupBy,orderBy) => async (dispatch) => {
    try {

        dispatch(groupByRequest());

        const {data} = await axios.get(server);
            

        if(groupBy === "status"){
            const groups = {
                "Backlog": [],
                "Todo" : [],
                "In progress" : [],
                "Done": [],
                "Cancelled": []
            };
        
            const userMap = data.users.reduce((map, user) => {
                map[user.id] = { name: user.name, available: user.available };
                return map;
            }, {});
            
            data.tickets.forEach(ticket => {
                const ticketWithUser = {
                    id: ticket.id,
                    title: ticket.title,
                    tag: ticket.tag,
                    userName: userMap[ticket.userId].name,  
                    userAvailable: userMap[ticket.userId].available, 
                    priority: ticket.priority
                };
            
                groups[ticket.status].push(ticketWithUser);
            });
            
            function sortGroups(groups, orderBy) {
                Object.keys(groups).forEach(group => {
                    if (orderBy === 'priority') {
                        groups[group].sort((a, b) => b.priority - a.priority);
                    } else if (orderBy === 'title') {
                        groups[group].sort((a, b) => a.title.localeCompare(b.title));
                    }
                });
            }
            sortGroups(groups, orderBy);
        dispatch(groupBySuccess({groups,groupBy,orderBy}))
        localStorage.setItem("groupBy",groupBy);
        localStorage.setItem("orderBy",orderBy);  
        }
        else if(groupBy === "userId"){
            
            const userGroups = data.users.reduce((groups, user) => {
                groups[user.id] = {
                    userName: user.name,
                    userAvailable: user.available,
                    tickets: [] 
                };
                return groups;
            }, {});
            
            data.tickets.forEach(ticket => {
                userGroups[ticket.userId].tickets.push({
                    id: ticket.id,
                    title: ticket.title,
                    tag: ticket.tag,
                    status: ticket.status,
                    priority: ticket.priority
                });
            });
            
            function sortUserGroups(groups, orderBy) {
                Object.keys(groups).forEach(userId => {
                    if (orderBy === 'priority') {
                        groups[userId].tickets.sort((a, b) => b.priority - a.priority);
                    } else if (orderBy === 'title') {
                        groups[userId].tickets.sort((a, b) => a.title.localeCompare(b.title));
                    }
                });
            }
            
            sortUserGroups(userGroups, orderBy);
            
        dispatch(groupBySuccess({groups:userGroups,groupBy,orderBy}))
        localStorage.setItem("groupBy",groupBy);
        localStorage.setItem("orderBy",orderBy);  
        }
        else if( groupBy === "priority"){
            
            const userMap = data.users.reduce((map, user) => {
                map[user.id] = { name: user.name, available: user.available };
                return map;
            }, {});
            
            const priorityGroups = {
                "No priority": [],     
                "Urgent": [],         
                "High": [],           
                "Medium": [],         
                "Low": []         
            };
            
            data.tickets.forEach(ticket => {
                const ticketWithUser = {
                    id: ticket.id,
                    title: ticket.title,
                    tag: ticket.tag,
                    status: ticket.status,
                    priority: ticket.priority,
                    userName: userMap[ticket.userId].name,
                    userAvailable: userMap[ticket.userId].available
                };
            // eslint-disable-next-line
                switch (ticket.priority) {
                    case 4:
                        priorityGroups["Urgent"].push(ticketWithUser);
                        break;
                    case 3:
                        priorityGroups["High"].push(ticketWithUser);
                        break;
                    case 2:
                        priorityGroups["Medium"].push(ticketWithUser);
                        break;
                    case 1:
                        priorityGroups["Low"].push(ticketWithUser);
                        break;
                    case 0:
                        priorityGroups["No priority"].push(ticketWithUser);
                        break;
                }
            });
            
            function sortPriorityGroups(groups, orderBy) {
                Object.keys(groups).forEach(group => {
                    if (orderBy === 'priority') {
                        groups[group].sort((a, b) => b.priority - a.priority);
                    } else if (orderBy === 'title') {
                        groups[group].sort((a, b) => a.title.localeCompare(b.title));
                    }
                });
            }

            sortPriorityGroups(priorityGroups, orderBy);
            
        dispatch(groupBySuccess({groups:priorityGroups,groupBy,orderBy}))
        localStorage.setItem("groupBy",groupBy);
        localStorage.setItem("orderBy",orderBy);  
        }
    } catch (error) {
      dispatch(groupByFail(error.response.data.message));
    }
};

export const clearGroupByErrors = () => async (dispatch) => {
    dispatch(clearGroupByError());
};

export const clearGroupByMessages = () => async (dispatch) => {
    dispatch(clearGroupByMessage());
};
