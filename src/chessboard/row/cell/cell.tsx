import React, { useEffect } from 'react'
import './cell.css'
interface C{
    square: string,
    type: string,
    color: string
}

interface CellProps{
    cell: C
}

export default function Cell(props: CellProps) {
    // convert object into figures

    // whenever there is a change in state, makes a post request and dispatches
    //post request will do the chess.move with the parameter which is the square where it was moved to
    //and therefore make changes to FEN 
    useEffect(()=>{
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({textarea: bio }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('data: ', data);
        })
        .catch(err => {
                console.log('er: ', err);
            }); 
    }, [])


    console.log('what is here?', props.cell);
    return <div>
            <div id='cell'>{props.cell && <img src={`${props.cell?.type}${props.cell?.color}.png`} alt="some" id="piece"/>}</div>
        </div>
}
