import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MoreDeals.css";

class MoreDeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealInfoRes: [],
      storeRes: [],
      gameRes: [],
    };
  }
  refreshPage = () => {
    window.location.reload(false);
  };
  dealInfoUrl = () => {
    const config = {
      method: "get",
      url: `https://www.cheapshark.com/api/1.0/deals?id=${this.props.dealID}`,
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        if (res) {
          this.setState({
            dealInfoRes: [...this.state.dealInfoRes, ...res],
          });
          this.gameUrl();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  storeUrl = () => {
    const config = {
      method: "get",
      url: "https://www.cheapshark.com/api/1.0/stores",
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        if (res) {
          this.setState({
            storeRes: [...this.state.storeRes, ...res],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  gameUrl = () => {
    const gameURL = this.state.dealInfoRes[0]?.gameInfo?.gameID || "";
    const config = {
      method: "get",
      url: `https://www.cheapshark.com/api/1.0/games?id=${gameURL}`,
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        var res1 = JSON.parse(res);
        return (res1 = [res1].flat());
      })
      .then((res) => {
        if (res) {
          this.setState({
            gameRes: [...this.state.gameRes, ...res],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.dealInfoUrl();
    this.storeUrl();
  }
  render() {
    return (
      <div className="container-grid ">
        <div>
          {this.state.dealInfoRes[0] ? (
            this.state.storeRes ? (
              this.state.storeRes
                .filter((data) => {
                  if (
                    data.storeID === this.state.dealInfoRes[0].gameInfo.storeID
                  ) {
                    return data;
                  } else return null;
                })
                .map((data) => {
                  let deal = this.state.dealInfoRes[0].gameInfo;
                  let save = deal.retailPrice - deal.salePrice;
                  return (
                    <div className="container" key={data.storeID}>
                      <div className="title">{deal.name}</div>
                      <div className="flex">
                        <div className="original-price">
                          ${deal.retailPrice}
                        </div>
                        <div className="sale-price">${deal.salePrice}</div>
                        <div className="you-save">You save ${save}</div>
                      </div>
                      <div className="store">{data.storeName}</div>
                      <img className="image" src={deal.thumb} alt="image" />
                    </div>
                  );
                })
            ) : null
          ) : (
            <p>Loading ... </p>
          )}
        </div>
        <div className="container">
          <div className="other-title">Other deals for this games</div>
          {this.state.gameRes[0] &&
            this.state.gameRes[0].deals.map((deal) => {
              let storeName = "";
              if (this.state.storeRes.length) {
                for (let i = 0; i < this.state.storeRes.length; i++) {
                  if (deal.storeID === this.state.storeRes[i].storeID) {
                    storeName = this.state.storeRes[i].storeName;
                  }
                }
              }
              return (
                <div>
                  <div className="other-flex" key={deal.storeID}>
                    <div>
                      <div className="other-store">{storeName}</div>
                      <div className="other-flex-price">
                        <div className="other-price">${deal.retailPrice}</div>
                        <div className="original-sale">${deal.price}</div>
                      </div>
                    </div>
                    <button className="other-button" onClick={this.refreshPage}>
                      <Link to={`/Deals/${deal.dealID}`} className="text">
                        View More
                      </Link>
                    </button>
                  </div>
                  <div className="other-div" />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default MoreDeals;
