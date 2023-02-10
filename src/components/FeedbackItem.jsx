import React, { useState } from 'react'

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('This is an example feedback item')

  // const handleClick = () => {
  //   setRating((prevState) => {
  //     return prevState + 1
  //   })
  // }

  return (
    <div className='card'>
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
      {/* <button onClick={handleClick}>Click Here</button> */}
    </div>
  )
}

export default FeedbackItem