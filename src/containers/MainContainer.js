import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    displayedStocks: []
  }

  componentDidMount() {
    this.fetchStocks()
  }

  fetchStocks = () => {
    fetch("http://localhost:3000/stocks")
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        stocks: data,
        displayedStocks: data
      })
    })
  }

  addToPortfolio = (stockId) => {
    let selectedStock = this.state.stocks.find(stock => stock.id === stockId)
    let stockArr = [...this.state.portfolioStocks]

    if (!stockArr.includes(selectedStock)) {
      stockArr.push(selectedStock)
      this.setState({portfolioStocks: stockArr})
    }
  }

  sellStock = (stockId) => {
    let selectedStock = this.state.stocks.find(stock => stock.id === stockId)
    let stockArr = [...this.state.portfolioStocks]
    this.setState({portfolioStocks: stockArr.filter(stock => stock !== selectedStock)})
  }

  selectHandler = (sortType) => {
    if(sortType !== "All"){
      this.setState({
        displayedStocks: this.state.stocks.filter(stock => stock.type === sortType)
      })
    } else {
      this.setState({
        displayedStocks: this.state.stocks
      })
    }
  }

  sortHandler = (option) => {
    let arr = []
    if (option === "Alphabetically") {
      arr = this.state.displayedStocks.sort((a,b) => a.name > b.name ? 1 :-1)
    } else if (option === "Price") {
      arr = this.state.displayedStocks.sort((a,b) => a.price > b.price ? 1 : -1)
    }
    this.setState({displayedStocks: arr})
  }

  render() {

    return (
      <div>
        <SearchBar selectHandler={this.selectHandler} sortHandler={this.sortHandler} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayedStocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolioStocks={this.state.portfolioStocks} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
