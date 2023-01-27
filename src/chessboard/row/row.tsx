import React, { DragEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTheBoardState } from '../../redux/boardSlice';
// import { legalMovesState } from '../../redux/legalmovesSlice';
import { isPieceSelected, moveFromState, clearTheMoveFrom } from '../../redux/moveFromSlice';
import { RootState } from '../../redux/store';
import Cell from './cell/cell'
import './row.css'


interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function Row(props: RowProps) {
    // const movefromState = useSelector((state: RootState) =>state.moveFrom.value);
    const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);
    console.log('isPieceSelectedState: ', isPieceSelectedState);
    
    const [wrongMove, setWrongMove] = useState('');

    const [legalMove, setLegalMove] = useState<string[]>([]);

    const [moveTo, setMoveTo] = useState('');
    console.log('moveTo: ', moveTo);
    
    const state = useSelector((state: RootState) =>state.moveFrom.value);
    console.log('state moveFrom: ', state);
    
    const dispatch = useDispatch();

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    const getImagePositionFROM = (cell: any)=>{
        if(cell){
            // if the black is selected
            const value = cell.square;
            console.log('image clicked log', value);
            dispatch(moveFromState(value!))
            dispatch(isPieceSelected(true))

            fetch('/api/legalmoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({possibleMoves: value}),
            })
            .then(response => {
                console.log('log the response: ', value);
                return response.json()
            })
            .then(data => {
                console.log('data of lm: ', data);
                if (data.legalmoves.length === 0){
                    dispatch(clearTheMoveFrom(''))
                    dispatch(isPieceSelected(false))
                    console.log('its not your turn :(');
                    
                } else {
                    // dispatch(legalMovesState(data.legalmoves))
                    setLegalMove(data.legalmoves);
                }
            })
            .catch(err => {
                    console.log('er: ', err);
                });

        } else {
            return;
        }
    } 


    const getTheCellTOMove = (event: any)=>{
        let data = event.currentTarget.getAttribute("data-col");
        console.log('eventually, moveFrom: ', state, 'moveTo: ', data);
        // setMoveTo(data)
        dispatch(isPieceSelected(false))

        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: state, to: data}),
        })
        .then(response => {
            if(response.status === 200){
                console.log("SUCCESSS")
                return response.json();     
            }else {
                console.log("SOMETHING WENT WRONG")
                setWrongMove("SOMETHING WENT WRONG");
            }
        })
        .then(data => {
            
            dispatch(updateTheBoardState(data.moved))
        })
        .then(()=>{
            dispatch(clearTheMoveFrom(''))
            setMoveTo('')
        })
        .catch(err => {
                console.log('error unfortunately: ', err);
            });
        
    }
    const handleClick = (cell: any, event: any) => { 
        if(isPieceSelectedState){
            getTheCellTOMove(event);
            console.log('getTheCellTOMove');
            
        } else {
            getImagePositionFROM(cell)
            console.log('getImagePositionFROM');

        }
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
    // console.log('moveFrom: ', moveFrom);
    // console.log('moveTo: ', moveTo);
    // if(moveFrom !== ''){
    
    // }


    console.log('legalMove: ', legalMove);

    // if (legalMove.length !== 0){
    //     const mapped = legalMove.map(el => {
    //         return el.
    //     })
    //     console.log('mapped: ', mapped);
        

    //match
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);//match method on a string
        if (matches){
            // console.log('matches: ', matches[0]);
            let div = document.querySelectorAll(`[data-col=${matches[0]}]`)
            console.log('the div: ', div[0]); 
            (div[0] as HTMLElement).style.backgroundColor = 'white';
        }
        
    }
    // querySelectorAll(`[data-col=${el}]`) to get all rows and compare the attributes
    //.join = > to pass the query selector all to then change the style of those divs
    return <div id='rows' >
            {props.row.map((cell, columnIndex) => (
                        <div key={columnIndex} 
                            className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                            data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                            onClick={(event) => handleClick(cell, event)}
                            >
                            <Cell cell={cell} 
                                columnLetter={getLetterFromIndex(columnIndex)} 
                                rowIndex={props.rowIndex} 
                            />
                        </div>
                    )
                )}
    </div>

}

