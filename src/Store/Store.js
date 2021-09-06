import React from "react";
import "./Store.css";
import axios from "axios";

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeRes: [],
      search: "",
      onsale: "",
    };
  }

  searchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  selectChange = (event) => {
    this.setState({ onsale: event.target.value });
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
  componentDidMount() {
    this.storeUrl();
  }
  render() {
    return (
      <div className="store-div">
        <div className="flex-store">
          <p className="stores-store"> Store </p>
          <input
            className="search-store"
            placeholder="Search stores by name"
            type="text"
            value={this.state.search}
            onChange={this.searchChange}
          />
        </div>

        <div className="container-store">
          {this.state.storeRes ? (
            this.state.storeRes
              .filter((data) => {
                if (this.state.search === "") {
                  return data;
                } else if (
                  data.storeName
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => {
                return (
                  <div className="box-store" key={data.storeID}>
                    <div className="title-store">{data.storeName}</div>
                    <button className="button-store">
                      <p>View More</p>
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

export default Store;
