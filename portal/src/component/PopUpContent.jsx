import React from 'react'

const PopUpContent = ({copied}) => {
  return (
    <section>
        {copied && (
            <div style={{position:'absolute' , bottom:"3rem"}}>Copied to clipboard </div>
        )}
    </section>
  )
}

export default PopUpContent