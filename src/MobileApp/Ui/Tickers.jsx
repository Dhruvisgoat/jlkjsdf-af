import React from 'react'
import Ticker from "react-ticker";



function Tickers() {

  const style =
  {
    fontSize: '1rem',
    color: 'white',
    margin: '0rem 1rem 0rem 1rem'
  }

  return (
    <div style={{ position: "absolute", bottom: "0px", width: "100%", zIndex: "5" }}>
      <Ticker >
        {({ index }) => (
          <>
            <span style={style}>
              Only the Curosity to create makes u excel.
            </span>
            <span style={style}>
              Follow your dreams , or let the dreams haunt you forever.
            </span>
          </>
        )}
      </Ticker>
    </div>
  )

}

export default Tickers