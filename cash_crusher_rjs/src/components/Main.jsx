import React from 'react'
import videos from'../assets/cash.mp4'

const Main = () => {
    return(
        <div className='main'>
            <video src={videos}/>
        </div>
    )
}

export default Main