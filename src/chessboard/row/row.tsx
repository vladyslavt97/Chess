import React, { DragEvent, useEffect, useRef, useState } from 'react'
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: [],
    rowIndex: number,
}

export default function Row(props: RowProps) {
    const [legalmoves, setLegalMoves] = useState([]);
    const [moveFrom, setMoveFrom] = useState('');
    const [moveTo, setMoveTo] = useState('');
    //gets arrays and maps through them to pass to cell
    
    const [counter, setCounter] = useState(-1);

    // let to = event.currentTarget.getAttribute("data-col")+'';
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }
    
    const handleOnclick = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('the cell was clicked and its value is', data);

        setCounter(counter+1)
        if (counter % 2 === 0) {
        // code to run when counter is even (second time)
            setMoveFrom(data)
            console.log('Second time code');
        } else {
            setMoveTo(data)
        // code to run when counter is odd (first time)
            console.log('First time code');

        }

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
            // console.log('legal moves: ', data.legalmoves);
            setLegalMoves(data.legalmoves);
        })
        .catch(err => {
                console.log('er: ', err);
            });
        
    }



    // const ref = useRef<any>(null);
    // // console.log('legalmoves::: ', legalmoves);
    // if(legalmoves.length !== 0){
    //         for (const l of legalmoves) {
    //         console.log('l: ', l);
    //         console.log('l23: ', ref.current.getAttribute("data-col"));
    //             if(ref.current.getAttribute("data-col") === l){
    //                 console.log('match');
                    
    //             }else{
    //                 console.log('no match');
                    
    //             }
    //         }
    // }


    // const highlightLegalMoves = (event: any) => {
    //     let data = event.currentTarget.getAttribute("data-col");
    //     for (const l of legalmoves) {
    //         console.log('l: ', l);
    //         if(l === data){

    //         }
            
    //     }
    // }
    // highlightLegalMoves();
    console.log('moveFrom: ', moveFrom);
    console.log('moveTo: ', moveTo);
    // if(moveFrom !== ''){
    console.log('-------------------------------');
    
    // }
    
    return <div id='rows' >
            {props.row.map((cell, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            // ref={ref}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onClick={handleOnclick}
                            >
                            
                            <Cell cell={cell} columnLetter={getLetterFromIndex(columnIndex)} rowIndex={props.rowIndex} legalmoves={legalmoves}/>
                        </div>
                    )
                )}
    </div>
}
