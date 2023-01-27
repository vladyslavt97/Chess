import React, { DragEventHandler, DragEvent, useEffect, useRef, useState } from 'react'
import { moveFromState } from '../../../redux/moveFromSlice';
import { isPieceSelected } from '../../../redux/moveFromSlice';
import './cell.css'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../redux/store';

interface CellType{
    square?: string,
    type?: string,
    color?: string
}

interface CellProps{
    cell?: CellType,
    rowIndex: number,
    columnLetter: string,
}

export default function Cell(props: CellProps) {
    return <div >
                    <div 
                    data-col={`${props.columnLetter}${props.rowIndex + 1}`}
                    >{props.cell &&
                            <img 
                                src={`${props.cell?.type}${props.cell?.color}.png`} 
                                alt={props.cell.square}
                                id="piece"
                            />}
                    </div>
        </div>
}
