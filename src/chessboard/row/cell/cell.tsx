import React from 'react'
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

    
    // let rows = [];
    // for (let i = 0; i < 8; i++) {
    //     let row = [];
    //     for (let j = 0; j < 8; j++) {
    //     row.push(<div key={i + '-' + j} className={i % 2 === j % 2 ? 'cell-white' : 'cell-black'}></div>);
    //     }
    //     rows.push(<div key={i} className="row">{row}</div>);
    // }


    console.log('what is here?', props.cell);
    return <div>
        <div id='cell'>{props.cell?.type}</div>
        {/* <div id="all-cells">{rows}</div> */}
        {/* {props.map(index=>(
                    console.log(index)
                    )
                )} */}
        {/* <div className={i % 2 === j % 2 ? 'cell-white' : 'cell-black'}>{props.cell?.type}</div> */}
        {/* <div className={props.cell?.color === 'w' ? 'cell-white' : 'cell-black'}>{props.cell?.type}</div> */}
        </div>
}
