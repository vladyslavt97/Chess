import React, { DragEvent, useEffect, useRef, useState } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    

    // let to = event.currentTarget.getAttribute("data-col")+'';
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    const handleOnclick = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('the cell was clicked and its value is', data);
        //make the fetch to to see the legal moves
        //chess.moves in the server side
        fetch('/api/legalmoves', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({possibleMoves: data}),
        })
        .then(response => {
            console.log('log the response: ', data);
            return response.json()
        })
        .then(data => {
            console.log('legal moves: ', data);
        })
        .catch(err => {
                console.log('er: ', err);
            });
        
    }

    return <div id='rows'>
            {props.row.map((cell, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onClick={handleOnclick}
                            >
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} rowIndex={props.rowIndex} />
                        </div>
                    )
                )}
    </div>
}
