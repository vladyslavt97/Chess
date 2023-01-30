import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTheBoardState } from '../../redux/boardSlice';
import { checkMateState } from '../../redux/checkmateSlice';
import { isPieceSelected, moveFromState, clearTheMoveFrom } from '../../redux/moveFromSlice';
import { RootState } from '../../redux/store';
import Cell from './cell/cell'
import './row.css'
import { socket } from '../../socket/socket';

interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function Row(props: RowProps) {
    const isPieceSelectedState = useSelector((state: RootState) =>state.moveFrom.valueSelected);
    const stateMoveFrom = useSelector((state: RootState) =>state.moveFrom.value);

    const [wrongMove, setWrongMove] = useState('');// generate the error!
    const [legalMove, setLegalMove] = useState<string[]>([]);
    const [moveTo, setMoveTo] = useState('');//not used??
    const dispatch = useDispatch();

    //set legal moves, moveFrom and isPieceSelected
    const getImagePositionFROM = (cell: any)=>{
        if(cell){
            const value = cell.square;
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
                return response.json()
            })
            .then(data => {
                if (data.legalmoves.length === 0){
                    dispatch(clearTheMoveFrom(''))
                    dispatch(isPieceSelected(false))
                    console.log('its not your turn :(');
                } else {
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

    const getTheCellTOMove = (event: any, cell: any)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        dispatch(isPieceSelected(false))
        fetch('/api/movepiece', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from: stateMoveFrom, to: dataa}),
        })
        .then(response => {
            if(response.status === 200){
                // console.log("SUCCESSS")
                return response.json();     
            }else {
                console.log("SOMETHING WENT WRONG")
                setWrongMove("SOMETHING WENT WRONG");
            }
        })
        .then(data => {
            // console.log('data: ', data.checkMate);//true
            dispatch(checkMateState(data.checkMate))
            console.log('data.moved: ', data.moved);
            
            dispatch(updateTheBoardState(data.moved))
            socket.emit("theBoard", {moveToEmit: data.moved});
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
            getTheCellTOMove(event, cell);
            // console.log('getTheCellTOMove');
        } else {
            getImagePositionFROM(cell);
            // console.log('getImagePositionFROM');
        }
        
    }

    //loop through legal moves to setAttribute
    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);

    //loop through legal moves to removeAttribute
    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }
    
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

