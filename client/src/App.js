import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [films, setFilms] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {
          return <MovieList {...props} addToSavedList={addToSavedList} films={films} updateFilms={setFilms}/>;
        }} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} films={films} updateFilms={setFilms}/>;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} films={films} updateFilms={setFilms}/>;
        }}
      />
      
    </>
  );
};

export default App;
