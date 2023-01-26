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
    legalmoves: string[]
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
    const getImagePosition = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('the image is at', data);
    }        

    // const ref = useRef<any>(null);
    // console.log('legalmoves::: ', legalmoves);
    // if(props.legalmoves.length !== 0){
    //         for (const l of props.legalmoves) {
    //         console.log('l: ', l);
    //         console.log('l23: ', ref.current.getAttribute("data-col"));
    //             if(ref.current.getAttribute("data-col") === l){
    //                 console.log('match');
                    
    //             }else{
    //                 console.log('no match');
                    
    //             }
    //         }
    // }

    return <div >
            {/* {props.legalmoves.length !== 0 && <div>
                {props.legalmoves.map(l => ( */}
                    <div 
                    // id={l === `${props.columnLetter}${props.rowIndex + 1}` ? 'cell' : undefined}
                    // ref={ref}
                    onClick={getImagePosition}
                    data-col={`${props.columnLetter}${props.rowIndex + 1}`}
                    >{props.cell && 
                            <img 
                                src={`${props.cell?.type}${props.cell?.color}.png`} 
                                alt="some" 
                                id="piece"
                                // onClick={getImagePosition}
                            />}
                    </div>
                {/* ))} */}
                {/* </div>} */}
        </div>
}
