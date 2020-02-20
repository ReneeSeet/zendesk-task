import React, {useState} from 'react';
import Form from './Form.js';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import uuid from 'uuid/v4';

const itemsFromBackend = [
	{ id: uuid(), content:'First task'},
	{ id: uuid(), content:'Second task'}
];

const columnsFromBackend = 
	{
		[1]: { 
			name: 'To do',
			items: itemsFromBackend
		},
		[2]: { 
			name: 'In progress',
			items: []
		},
		[3]: { 
			name: 'Done',
			items: []
		},
	}
;

const onDragEnd = (result, columns, setColumns) => { 
	if( !result.destination) return; 
	const {source, destination} = result;
	if(source.droppableId!==destination.droppableId){ 
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId]; 
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items]; 
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index,0,removed); 
		setColumns({ 
			...columns, 
			[source.droppableId]:{ 
				...sourceColumn,
				items: sourceItems
			},
			[destination.droppableId]:{ 
				...destColumn,
				items: destItems
			}
		})
	}else{
		const column = columns[source.droppableId];
		const copiedItems = [...column.items]
		const [removed] = copiedItems.splice(source.index,1); 
		copiedItems.splice(destination.index, 0, removed); 
		setColumns({ 
			...columns, 
			[source.droppableId] : { 
				...column, 
				items:copiedItems
			}
		})
	}
}

const handleNewProject = (newName, columns, setColumns, itemsFromBackend) => {
		const column = columns[1];
		const newItem = {id:uuid(), content: newName};
		const copiedItems = [...column.items, newItem];
		itemsFromBackend = itemsFromBackend.push(newItem); 
        setColumns({ 
			...columns, 
			[1] : { 
				...column, 
				items:copiedItems
			}
		})
    }


function App() {
	const [columns, setColumns] = useState(columnsFromBackend);


  return (
  	<div style={{margin: 'auto', display:'flex', flexDirection:'column', width: 'fit-content'}}> 
  		<div style = {{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
  	    	<Form onAddNewProjectName={newName => handleNewProject(newName, columns, setColumns, itemsFromBackend)}/>
  	    	<div style={{display:'flex',flexDirection:'column', alignItems:'center' ,margin: '20px 20px 0px 0px'}}> TOTAL <div style={{display:'flex',flexDirection:"column", alignItems:'center',background:'white', border:'1px solid white', padding: '10px'}}><p style ={{margin:"0px"}}>{itemsFromBackend.length}</p><p style ={{margin:"0px"}}>PROJECTS</p></div></div>
  	    </div>
  	    <div style = {{display:'flex', flexDirection:"row", height:'100%', alignItems:'center'}}>
	  		<DragDropContext onDragEnd = {result=> onDragEnd(result, columns, setColumns)}>
	  			{Object.entries(columns).map(([id,column]) => { 
	  					return(
	  						<div style={{display:'flex', flexDirection:'column'}} key={id} >
	  							<div style = {{padding:16, margin: '20px 20px 0px 0px', background: '#a9a9a9',display:'flex',flexDirection:"row",justifyContent:'space-between'}}>
	  								<h2>{column.name}</h2>
	  								<div style={{display:'flex',flexDirection:"column", alignItems:'center',background:'white', border:'1px solid white', padding: '10px'}}>
	  									<p style ={{margin:"0px"}}>{column.items.length}</p><p style ={{margin:"0px"}}>PROJECTS</p>
	  								</div>
	  							</div>
	  								<div style={{margin: '0px 20px 20px 0px'}}>
					  					<Droppable droppableId={id} key={id} style={{marginRight:8}}> 
					  						{(provided, snapshot) => { 
					  							return ( 
					  								<div
					  									{...provided.droppableProps}
					  									ref={provided.innerRef}
					  									style = {{ 
					  										background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
					  										padding: 4, 
					  										width: 300, 
					  										minHeight: 500
					  									}}
					  									>
					  									{column.items.map((item,index) => { 
					  										return ( 
					  											<Draggable key = {item.id} draggableId={item.id} index={index}>
					  												{(provided,snapshot)=>{ 
					  													return(
					  														<div 
					  															ref={provided.innerRef} 
					  															{...provided.draggableProps}
					  															{...provided.dragHandleProps}
					  															style={{

					  																userSelect:'none',
					  																padding:16,
					  																margin:'0 0 10px 0',
					  																height: '30px',
					  		
					  																backgroundColor: snapshot.isDragging? '#263B4A' : '#456C86',
					  																color:'white',
					  																...provided.draggableProps.style
					  															}}>

					  															{item.content}
					  														</div>

					  													)
					  												}}
					  											</Draggable>
					  										)

					  									})}

					  									{provided.placeholder}
					  								</div>
					  							)
					  						}}
					  					</Droppable>
					  				</div>
		  					</div>
	  					)
	  				})
	  			}
	  		</DragDropContext>
  		</div>
  	</div>
    
  );

}

export default App;
