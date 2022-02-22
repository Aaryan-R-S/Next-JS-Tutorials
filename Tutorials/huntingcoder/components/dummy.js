import React from 'react'

export default function Dummy() {
  return (
      <>
        {/* <style jsx global> */}
        <style jsx>
            {`
                .dummy{
                    background: yellow;
                }
            `}
        </style>
        <div className='dummy'>Dummy</div>
      </>
  )
}
