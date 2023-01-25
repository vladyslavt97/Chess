import React from 'react'

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
    console.log('what is here?', props.cell?.square);
    
    return <div>
        <div>Cell</div>
        <div>{props.cell?.square}</div>
    </div>
}
