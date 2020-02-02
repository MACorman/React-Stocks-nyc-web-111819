import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div className="porfolio-container">
        <h2>My Portfolio</h2>
          {
            this.props.portfolioStocks.map(stock => <Stock key={stock.id} {...stock} sellStock={this.props.sellStock} />)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
