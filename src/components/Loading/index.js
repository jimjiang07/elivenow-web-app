import React from 'react'

const Loading = ({ text }) => {
  return (
    <div className="w-100 h-50 text-center">
      <img src='https://miro.medium.com/max/888/1*fTBgwlcT6waWOfbvoFVFgw.gif' alt='Loading'></img>
      <h4>{text}</h4>
    </div>
  )
}

export default Loading;