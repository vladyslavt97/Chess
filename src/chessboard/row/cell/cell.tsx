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
}

export default function Cell(props: CellProps) {
    // whenever there is a change in state, makes a post request and dispatches
    //post request will do the chess.move({from: to:}) with the parameter which is the square where it was moved to
    //and therefore make changes to FEN 

    // const value = props.cell?.square;
        // fetch('/api/movepiece', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({to: props.moveTo, from: moveFrom}),
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


    //make on click of the image, not the cell    
    // const getImagePosition = (event: any)=>{
    //     let data = event.currentTarget.getAttribute("data-col");
    //     console.log('the image is at', data);
    // }        

    return <div >
            <div id='cell'
            data-col={`${props.columnLetter}${props.rowIndex + 1}`}
            >{props.cell && 
                    <img 
                        src={`${props.cell?.type}${props.cell?.color}.png`} 
                        alt="some" 
                        id="piece"
                        draggable={true}
                        // onClick={getImagePosition}
                    />}
            </div>
        </div>
}
