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


    return <div id='rows'>
            {props.row.map((cell, index) => (
                //ondragover and ondrop 
                        <div key={index} className={index % 2 === props.ind % 2 ? 'cell-white' : 'cell-black'}>
                            <Cell cell={cell}/>

                            

                        </div>
                    )
                )}
    </div>
}
