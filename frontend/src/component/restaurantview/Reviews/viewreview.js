import axios from "axios";
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Navbar from "../rNavbar";
import { paginate, pages } from '../../../helperFunctions/paginate'


// import Modal from 'react-modal';
class ViewReview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      review: [],
      filteredReview: []
    };
  }

  componentDidMount() {
    const self = this;
    const restaurant_id = localStorage.getItem("restaurant_id");
    const data = { restaurant_id };
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post("/viewreview", data)
    .then(response => {
      if (response.status === 200) {
       // console.log("Printing response",response)
        console.log("Printing Menu",response.data[0].review)
          this.setState({
            review: response.data,
            filteredReview : paginate(response.data[0].review,1,10),
            pages: pages(response.data, 10)

          })
          console.log(pages);
      } else {
          console.log("error");
      }
  });
}
  //   axios.post("/viewreview",data)
  //   // fetch("/viewreview", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify(data),
  //   // })
  //     .then((response) => {
  //       if (response.status >= 400) {
  //         throw new Error("Bad response from server");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       self.setState({ review: data });
  //     })
  //     .catch((err) => {
  //       console.log("caught it!", err);
  //     });
  // }


  paginatinon = (e) => {
    this.setState({
        filteredReview: paginate(this.state.review,e, 10)
    })
}



  render() {

    let links = [];
    if (this.state.pages > 0) {
        console.log(this.state.pages);
        for (let i = 1; i <= this.state.pages; i++) {
            links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                {i}
            </a></li>
            )
        }
    }

    let review = this.state.filteredReview.map(food => {
      return (
        <tr>
          <td>
            <img
              src={food.path}
              width={150}
              height={120}
              mode="fit"
            />
          </td>
          <td>
            {food.email}
            {' '}
          </td>
          <td>{food.review_desc}</td>
          <td>{food.rating}</td>
        </tr>
      )
    })

    return (
      <div>
        <div>
          <div>

            <Navbar />
            <div className="container">
              <div className="main-div-menu">
                <div className="panel" />
                <div>
                  <h1 className="heading-menu">Reviews</h1>
                  <div className="container">
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Picture</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Rating</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                        {review}
                            <ul className="pagination">
                            {links}
                            </ul>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewReview;
