import React, { DragEvent, useEffect } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    const handleDragOver = (e: any)=>{
        e.preventDefault();
        e.stopPropagation();
        //settimeout to check every 500ms is the move is legal??
    }

    const handleDrop = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('handleDrop', data);
        //the fen should get updated here?
        //post to update DB? and dispatch
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data handledrop movepiece row.tsx: ', data);
        })
        .catch(err => {
                console.log('er: ', err);
            }); 
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    return <div id='rows'>
            {props.row.map((cell, columnIndex) => (
                //ondragover and ondrop 
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            onDrop={handleDrop}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}

                            onDragOver={handleDragOver}
                            >
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} rowIndex={props.rowIndex}/>

                            

                        </div>
                    )
                )}
    </div>
}
