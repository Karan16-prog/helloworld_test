import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";

const API_URL = "https://dummyjson.com/products";
const LIMIT = 6; //url limit param

function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0); //url skip param

  useEffect(() => {
    const getData = async () => {
      const url = new URL(API_URL);
      url.searchParams.set("limit", LIMIT);
      url.searchParams.set("skip", skip);
      const response = await axios(url.href);
      setProducts([...products, ...response.data.products]);
    };
    getData();
  }, [skip]);

  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={() => setSkip(products.length)} //function triggered when scrolled to bottom
        hasMore={skip !== 100 ? true : false} //stop infinite scrolling after 100 items
        loader={<h4>Loading...</h4>}
        className="list_container"
      >
        {products.length > 0 &&
          products?.map((product) => (
            <ListItem key={product.id} item={product} />
          ))}
      </InfiniteScroll>
    </>
  );
}

const ListItem = ({ item }) => {
  return (
    <div className="list_item">
      <img className="list_item_image" src={item?.images[0]} alt="item_image" />
      <h4 className="list_item_title">{item?.title}</h4>
    </div>
  );
};

export default App;
