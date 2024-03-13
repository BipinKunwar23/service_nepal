import React from 'react'

const Button = ({name,bg_color,text_color}) => {
  return (
        <button className={`bg-${bg_color} rounded-full  p-1  px-10  text-${text_color}`}>
        {name}
    </button>
  )
}

export default Button