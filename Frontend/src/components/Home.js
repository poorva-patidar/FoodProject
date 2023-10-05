import React, { useEffect } from "react";
import {
  getRestaurants,
  sortByRatings,
  sortByReviews,
  toggleVegOnly,
} from "../actions/restaurantAction";
import Restaurant from "./Restaurant";
import Loader from "../components/layouts/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import CountRestaurant from "./CountRestaurant";


const Home = () => {
  const dispatch = useDispatch();

  const {
    loading: restaurantsLoading,
    error: restaurantError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (restaurantError) {
      return alert.error(restaurantError);
    }
    dispatch(getRestaurants());
  }, [dispatch, restaurantError]);

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
      <CountRestaurant/>
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantError ? (
        <Message variant="danger">{restaurantError}</Message>
      ) : (
        <>
          <section>
            
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>
              <button className="sort_rev p-3" onClick={handleSortByReviews}>
                {" "}
                Sort By Reviews
              </button>
              <button className="sort_rate p-3" onClick={handleSortByRatings}>
                Sort By Ratings
              </button>
            </div>
            <div className="row mt-4">
              {restaurants && restaurants.restaurants ? (
                restaurants.restaurants.map((restaurant) =>
                  !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                    <Restaurant key={restaurant._id} restaurant={restaurant} />
                  ) : null
                )
              ) : (
                <Message variant="info"> No restaurants Found</Message>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
