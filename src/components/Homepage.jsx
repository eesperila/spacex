import React, { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner/Spinner";
import Flight from "./Flight";
import FormSearch from "./FormSearch";

const Homepage = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dataLength = 10; //length of the data to be displayed every scroll

  const loadMore2 = useCallback(
    async (name) => {
      if (loading) return;

      setLoading(true);
      const newItems = await new Promise((resolve) => {
        var offset = (page - 1) * dataLength;
        fetch(
          `https://api.spacexdata.com/v3/launches?limit=${dataLength}&offset=${offset}&rocket_name=${name}`
        )
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
      setLoading(false);
    },
    [page, loading]
  );

  const loadMore = async (name) => {
    if (loading) return;

    setLoading(true);
    // const newItems = await new Promise((resolve) => {
    var offset = (page - 1) * dataLength;
    fetch(
      `https://api.spacexdata.com/v3/launches?limit=${dataLength}&offset=${offset}&mission_name=${name}`
    )
      .then((res) => res.json())
      .then((newItems) => {
        //   resolve(data);
        setItems((prev) => [...prev, ...newItems]);
        setHasMore(newItems.length > 0);
        setLoading(false);
      });
    // });
  };

  // handle the scroll event
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const distanceFromBottom = fullHeight - (scrollTop + viewportHeight);

    if (distanceFromBottom < 100 && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    // adding timeout just to see the spinner, we can remove it later
    setTimeout(() => {
      loadMore("");
    }, 500);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="main__wrapper">
        <FormSearch loadMore={loadMore} setItems={setItems} />
        <div className="launch__list">
          {items.map((item) => {
            return (
              <Flight
                key={item.flight_number}
                mission_name={item.mission_name}
                details={item.details}
                status={item.launch_success}
                upcoming={item.upcoming}
                links={item.links}
                localdate={item.launch_date_local}
              />
            );
          })}
        </div>
        {loading && hasMore && <Spinner color="#e74c3c" />}
        {!hasMore && <p>No more items to load.</p>}
      </div>
    </>
  );
};

export default Homepage;
