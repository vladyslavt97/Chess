import React, { DragEventHandler, DragEvent, useEffect, useRef, useState } from 'react'
import './cell.css'
interface C{
    square: string,
    type: string,
    color: string
}

interface CellProps{
    cell: C,
    rowIndex: number,
    columnLetter: string,
    moveTo: string
}

export default function Cell(props: CellProps) {
    const [moveFrom, setMoveFrom] = useState('');
    // const [moveTo, setMoveTo] = useState('');
    // convert object into figures

    // whenever there is a change in state, makes a post request and dispatches
    //post request will do the chess.move({from: to:}) with the parameter which is the square where it was moved to
    //and therefore make changes to FEN 

    const value = props.cell?.square;
    const handleDragStart = () => {
        console.log('handleDragStart');
        console.log('handleDragStart value: ', value);
        // props.theMoveIsFrom(value)
        setMoveFrom(value);
    }

    console.log('11: ', moveFrom);
    console.log('22: ', props.moveTo);
    // setMoveTo(props.moveTo);

    const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
        console.log('handleDragEnd');
        // setMoveTo(props.moveTo)
        console.log('1: ', moveFrom);
        console.log('2: ', props.moveTo);
        
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({to: props.moveTo, from: moveFrom}),
        })
        .then(response => {
            console.log('log the response: ', moveFrom);
            
            response.json()
        })
        .then(data => {
            console.log('data handledrop movepiece row.tsx: ', data);
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }

            
    return <div >
            <div id='cell'
            data-col={`${props.columnLetter}${props.rowIndex + 1}`}
            >{props.cell && 
                    <img 
                        src={`${props.cell?.type}${props.cell?.color}.png`} 
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        alt="some" 
                        id="piece"
                        draggable={true}
                    />}
            </div>
        </div>
}
