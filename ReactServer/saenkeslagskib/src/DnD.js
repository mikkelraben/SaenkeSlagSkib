import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import Square from './Square'


function Boat(){ //Definere hvilken opjekt vi er i gang med at bevæge.
const [{ isDragging }, drag] = useDrag(()=>  ({

    type : ItemTypes.Boat,
    collect: moniter => ({    
        isDragging: !!moniter.isDragging(),
    }),
}))

return (
    <div  
        ref={drag}
        style={{
            //opacity: isDragging ? 0.5 : 1, // Hvis vi vil have at båden bliver gennemsigtigt mens den bliver rykket på.
            fontSize: 10,
            fontWeight: 'bold',
            cursor: 'move',

        }} 
    >

    </div>
    

)
    }
