import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}
const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    

    useEffect(() => {
        const movieToEdit = props.films.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) setMovie(movieToEdit) 
    }, [props.movies, props.match.params.id]);


    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name="stars[0]"
                    placeholder="Actors"
                    value={movie.stars[0]}
                />
                <input
                    type="text"
                    name="stars[1]"
                    placeholder="Actors"
                    value={movie.stars[1]}
                />
                <input
                    type="text"
                    name="stars[2]"
                    placeholder="Actors"
                    value={movie.stars[2]}
                />
            </form>
        </div>
    )
}

export default UpdateMovie