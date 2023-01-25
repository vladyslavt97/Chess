import React from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    ind: number,
    // result: []
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    const handleDragOver = (e: any)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log('event over: ');
    }
    const handleDrop = (event: any)=>{
        console.log('handleDrop');
        //the fen should get updated here?
        //post to update DB? and dispatch
        event.dataTransfer.getData("drag-item") 
    }

    return <div id='rows'>
            {props.row.map((cell, index) => (
                //ondragover and ondrop 
                        <div key={index} 
                            className={index % 2 === props.ind % 2 ? 'cell-white' : 'cell-black'}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            >
                            <Cell cell={cell}/>

                            

                        </div>
                    )
                )}
    </div>
}
