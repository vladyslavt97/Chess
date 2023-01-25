import React from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: []
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    // let row;
    // for (let i = 1; i <= 8; i++) {
    //     row.push(<div>{i}</div>);
    // }
    return <div id='rows'>
         {/* <div>{row}</div> */}
            {/* map */}
            {props.row.map((cell, index) => (
                        <div key={index} >
                            <Cell cell={cell}/>
                        </div>
                    )
                )}
    </div>
}
