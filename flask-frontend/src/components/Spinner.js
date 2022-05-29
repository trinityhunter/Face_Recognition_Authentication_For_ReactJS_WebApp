import React from 'react'
import Rhombus from './Rhombus.gif';

const Spinner = () => {
        return (
            <div className="text-center">
                <img className="my-3" src={Rhombus} alt="Loading..." />
            </div>
        )
    
}

export default Spinner
