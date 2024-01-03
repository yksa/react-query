import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
  // return axios.get("http://localhost:4000/superheroes1");
};

export const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching ", data);
    if (data?.data.length === 4) {
      setRefetchInterval(false);
    }
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error ", error);
    setRefetchInterval(false);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      refetchInterval,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Refetch heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
