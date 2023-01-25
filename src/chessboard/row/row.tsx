import React from 'react'
import Cell from './cell/cell'



interface RowProps{
    row: []
}

export default function Row(props: RowProps) {
    //gets arrays and maps through them to pass to cell
    return <div>
        <div>Row</div>
            {/* map */}
            {props.row.map((cell, index) => (
                        <div key={index} >
                            <Cell cell={cell}/>
                        </div>
                    )
                )}
    </div>
}
