import './CellComputer.css'

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

export default function CellComputer(props: CellProps) {
    console.log('prop: ', props.cell);
    
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
