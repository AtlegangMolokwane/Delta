import React from 'react';
// import { useParams } from 'react-router-dom'
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class DealInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dealInfoRes: [],
        storeRes: [],
        gameRes: []
      };
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    
    dealInfoUrl = () => {
        const { dealID } =this.props.match.params;
        const config = {
          method: "get",
          url: `https://www.cheapshark.com/api/1.0/deals?id=${ dealID }`,
        };
        axios(config)
          .then(function (response) {
            var res = JSON.stringify(response.data);
            var res1 = JSON.parse(res);
            return (res1 = [res1].flat());
          })
          .then((res) => {
            console.log("the deal results:", res);
            if (res) {
              this.setState({
                dealInfoRes: [...this.state.dealInfoRes, ...res],
              });
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
            console.log("the Store results:", res);
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
            // let deal = this.state.dealInfoRes[0] && this.state.dealInfoRes[0].gameInfo;
            // if (deal == !undefined){
                const { gameID } =this.props.location.state;
                const config = {
                  method: "get",
                //   url: `https://www.cheapshark.com/api/1.0/games?id={ gameID }`
                  url: 'https://www.cheapshark.com/api/1.0/games?id=186651', // This url is to see how will I dispaly data in the meantime I figure out how to pass props in the url in line 77
                };
                axios(config)
                  .then(function (response) {
                    var res = JSON.stringify(response.data);
                    var res1 = JSON.parse(res);
                    return (res1 = [res1].flat());
                  })
                  .then((res) => {
                    console.log("the game results:", res);
                    if (res) {
                      this.setState({
                        gameRes: [...this.state.gameRes, ...res],
                      });
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                // } 
                };
                
        
      componentDidMount() {
        this.dealInfoUrl();
        this.storeUrl();
        this.gameUrl()
      }
    render() {
        // console.log("DealLookUp.....",this.state.dealInfoRes[0] && this.state.dealInfoRes[0].gameInfo)
        
      return (
      <div>
          <div>
          {this.state.dealInfoRes[0]  ?
           this.state.storeRes ? this.state.storeRes.filter((data) =>{
            if (data.storeID === this.state.dealInfoRes[0].gameInfo.storeID){
              return data
            }else 
              return null
            
          }).map((data) => {
              let deal = this.state.dealInfoRes[0].gameInfo
              let save = deal.retailPrice - deal.salePrice
            return (
              
                  <div className="" key={data.storeID}>
                    <div className="">{deal.name}</div>
                    <div className="">
                      <div className="">
                        ${deal.retailPrice}
                      </div>
                      <div className="">
                        ${deal.salePrice}
                      </div>
                      <div className="">
                        You save ${save}
                      </div>
                    </div>
                    <div className="">
                        {data.storeName}
                    </div>
                    <img className="" src={deal.thumb} alt="image" />
                  </div>
            );
          }) : null
           : (
          <p>Loading ... </p>
        )}
        </div>
        <div>
        <div>Other deals for this games</div>
        {
                  this.state.gameRes[0] ?
                  this.state.storeRes ? this.state.storeRes.filter((data) =>{
                      for(let i = 0; i < 15; i++){
                        for(let j = 0; j < 32; j++){
                    if (this.state.gameRes[0].deals[i].storeID == this.state.storeRes.storeID){
                      return this.state.storeRes
                    }else 
                      return null
                    
                  }}}).map((data) => {
            let game = this.state.gameRes[0].deals
            return (
                    game.map((game) => {
                        return (
                  <div className="" key={game.storeID}>
                    <div className="">{data.storeName}</div>
                    <div className="">
                      <div className="">
                        ${game.retailPrice}
                      </div>
                      <div className="">
                        ${game.price}
                      </div>
                    </div>
                    <button className="">
                        View More
                    </button>
                  </div>);}
            ));
          })
          : (
            <p>Loading ... </p>
          )
                : (
          <p>Loading ... </p>
        )}
        </div>
      </div>
      );
    }
  }
export default withRouter(DealInfo);