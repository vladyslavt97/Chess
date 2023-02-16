import CellComputer from "./cellcomputer/CellComputer";
import { Chess } from 'chess.js'
import { useEffect, useState } from "react";

interface RowProps{
    row: Array<object>,
    rowIndex: number,
}

export default function RowComputer(props: RowProps) {
    const [isPieceSelectedState, isPieceSelectedStateSet] = useState(false);
    const [moveFrom, setMoveFrom] = useState('');

    const chess = new Chess();
    const getLetterFromIndex = (index: number): string => {
        return String.fromCharCode(65 + index).toLowerCase();
    }

    const [legalMove, setLegalMove] = useState<string[]>([]);

    const getImagePositionFROM = (cell: any)=>{
        isPieceSelectedStateSet(true)
        console.log('cel!', cell);
        console.log('isPieceSelectedState: ', isPieceSelectedState);
        
        setMoveFrom(cell.square)
        console.log('empty log: ', moveFrom);
        if (cell){
            let legalMoves = chess.moves({square: cell.square})
            console.log('legalMoves: ', legalMoves);
            if (legalMoves.length === 0){
                console.log('its not your turn :(');
            } else {
                // setLegalMove(data.legalmoves);
            }
        }
        isPieceSelectedStateSet(false)

    }

    const getTheCellTOMove = (event: any, cell: any)=>{
        let dataa = event.currentTarget.getAttribute("data-col");
        console.log('dataaa: ', dataa);
        
        isPieceSelectedStateSet(false)
        
        const moved = chess.move({from: moveFrom, to: dataa})
        console.log(moveFrom, dataa, moved);
            // updateTheBoardState(data.moved)

            // setMoveTo('')
    }

    console.log('isPieceSelectedState end: ', isPieceSelectedState);
    const handleClick = (cell: any, event: any) => { 
        if(isPieceSelectedState){
            getTheCellTOMove(event, cell);
        } else {
            getImagePositionFROM(cell);
        }
    }

    useEffect(()=>{
        for (let l of legalMove){
            let matches = l.match(/\w[0-9]/);
            if (matches){
                let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
                (dataAt[0] as HTMLElement).setAttribute('id', 'possible-move');
            } 
        }
    }, [legalMove]);

    for (let l of legalMove){
        let matches = l.match(/\w[0-9]/);
        if (matches && !isPieceSelectedState){
            let dataAt = document.querySelectorAll(`[data-col=${matches[0]}]`);
            (dataAt[0] as HTMLElement).removeAttribute('id');
        } 
    }

  return <div id='rows' >
        {props.row.map((cell, columnIndex) => (
                <div key={columnIndex} 
                    className={columnIndex % 2 === props.rowIndex % 2 ? 'cell-white' : 'cell-black'}
                    data-col={`${getLetterFromIndex(columnIndex)}${props.rowIndex + 1}`}
                    onClick={(event) => handleClick(cell, event)}
                    >
                    <CellComputer cell={cell} 
                        columnLetter={getLetterFromIndex(columnIndex)} 
                        rowIndex={props.rowIndex} 
                    />
                </div>
            )
        )}
    </div>
}
