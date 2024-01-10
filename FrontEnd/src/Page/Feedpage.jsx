import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
// import Feed from "../Components/Feed";

const Feed = lazy(() => import("../Components/Feed") );

export default function Feedpage() {
  const storedLoginDetails = JSON.parse(localStorage.getItem("reduxState"));

  const checkTheSuccessCondition = () => {
    if (storedLoginDetails?.loginDetails?.name !== undefined) {
      return <Feed />;
    } else if (storedLoginDetails?.loginDetails?.name === undefined) {
      return <Navigate to="/" />;
    }
  };

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        {storedLoginDetails !== null ? (
          checkTheSuccessCondition()
        ) : (
          <Navigate to="/" />
        )}
      </Suspense>
    </>
  );
}
