import React from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: []
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell

    return <div id='rows'>
        {/* one color here */}
            {props.row.map((cell, index) => (
                        <div key={index} className={index % 2 ? 'cell-white' : 'cell-black'}>
                            <Cell cell={cell}/>
                        </div>
                    )
                )}
    </div>
}
