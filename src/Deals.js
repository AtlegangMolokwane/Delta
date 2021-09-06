import React from "react";
import "./Deals.css";
import axios from "axios";
import { Link } from 'react-router-dom';

class Deals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealRes: [],
      search: "",
      onsale: "",
    };
  }

  searchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  selectChange = (event) =>{
    this.setState({ onsale: event.target.value });
};


  dealUrl = () => {
    const config = {
      method: "get",
      url: "https://www.cheapshark.com/api/1.0/deals?",
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        console.log("the results:", res[0].title);
        if (res) {
          this.setState({
            dealRes: [...this.state.dealRes, ...res],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    this.dealUrl();
  }
  render() {
    console.log("the api results:", typeof this.state.dealRes);
    
    return (
      <div className = "deal-div">
        <div className="flex-deal">
          <p className="deals-deal"> Deals </p>
          <input className="search-deal" placeholder="Search deals by name" type="text" value={this.state.search} onChange = {this.searchChange}/>
        </div>
      
      <select id = "select" onChange = {this.selectChange} className = "filter-deal">
        <option value="">All</option>
        <option value="1">On Sale</option>
        <option value="0">Not On Sale</option>
      </select>
      <div className = "div-deal"/>

        <div className="container-deal">
        {this.state.dealRes ? (
          this.state.dealRes.filter((data) =>{
            if (this.state.search === ""){
              return data
            }else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){
              return data
            }
          }).filter((data) =>{
            var e = document.getElementById("select");
            var selected = e.value;
            if (selected === ""){
              return data
            }else if(data.isOnSale === selected){
              return data
            }
          }).map((data) => {
            return (
              
                  <div className="box-deal" key={data.dealID}>
                    <div className="title-deal">{data.title}</div>
                    <div className="flex-deal">
                      <div className="original-price-deal">
                        ${data.normalPrice}
                      </div>
                      <div className="sale-price-deal">${data.salePrice}</div>
                    </div>
                    <button className="button-deal">
                    <Link to={`/Deals/${data.dealID}`
                    } className = "text">View More</Link>
                    </button>
                  </div>
            );
          })
        ) : (
          <p>Loading ... </p>
        )}
        </div>
      </div>
    );
  }
}
export default Deals;
