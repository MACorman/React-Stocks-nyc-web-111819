import React from 'react'

const Stock = (props) => {

    return(
      <div>
  
  
        <div className="card">
          <div className="card-body" onClick={() => props.addToPortfolio ? props.addToPortfolio(props.id) : props.sellStock(props.id)}>
            <h5 className="card-title">
                {props.name}
              </h5>
            <p className="card-text">
                {props.ticker + ": " + props.price}
              </p>
          </div>
        </div>
  
  
      </div>

    )

};

export default Stock

