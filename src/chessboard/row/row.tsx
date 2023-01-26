import React, { DragEvent, useEffect, useRef, useState } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    // const [moveFrom, setMoveFrom] = useState<string>('');
    const [moveTo, setMoveTo] = useState<string>('');
    //gets arrays and maps through them to pass to cell
    const handleDragOver = (e: any)=>{
        console.log("handleDropOver");
        e.preventDefault();
        e.stopPropagation();
        //settimeout to check every 500ms is the move is legal??
    }

    // const theMoveIsFrom = (data: string) => {
    //     console.log('theMoveIsFrom: ', data);
    //     setMoveFrom(data);
    // }
    
    // useEffect(() => {
    //     // console.log('mf 1: ', moveFrom);
    //     if(moveFrom){
    //         console.log('mf 2: ', moveFrom);
    //     }
    // }, [moveFrom])


    const handleDrop = (event: DragEvent<HTMLDivElement>)=>{
        let to = event.currentTarget.getAttribute("data-col")+'';
        console.log('handleDrop to: ', to);
        setMoveTo(to);
        // console.log('handleDrop from: ', moveFrom);

        //the fen should get updated here?
        //post to update DB? and dispatch
        // fetch('/api/movepiece', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({to: to, from: moveFrom}),
        // })
        // .then(response => {
        //     console.log('log the response: ', moveFrom);
            
        //     response.json()
        // })
        // .then(data => {
        //     console.log('data handledrop movepiece row.tsx: ', data);
        // })
        // .catch(err => {
        //         console.log('er: ', err);
        //     });
    }
    console.log('moveTo: ', moveTo);
    
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    return <div id='rows'>
            {props.row.map((cell, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            onDrop={handleDrop}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onDragOver={handleDragOver}
                            >
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} rowIndex={props.rowIndex} moveTo={moveTo}/>
                        </div>
                    )
                )}
    </div>
}
