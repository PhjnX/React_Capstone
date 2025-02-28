import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from './slice';
import Movie from './movie';

export default function Quanliphim() {
  const state = useSelector((state)=> state.movieListReducer);  
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovieList())
  }, [dispatch]);
    console.log(state);
  const renderListMovie = () =>{
    const {data} = state;
    return data?.map((movie)=> <Movie key={movie.maPhim} movie={movie}/>)
  };
  if(state.loading) return <p>Loading...</p>;
  if (state.error) return <p className="text-red-500">Error: {state.error}</p>;

  
  return (
    <div>
      <h1 className='text-center mb-5'>List Movie</h1>
      <div>
        {renderListMovie()}
      </div>
    </div>
    
  );
}
