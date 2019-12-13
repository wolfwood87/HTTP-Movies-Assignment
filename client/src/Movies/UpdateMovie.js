import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: ['','','']
}
const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    

    useEffect(() => {
        const movieToEdit = props.films.find(
            movie => `${movie.id}` === props.match.params.id
        );

        if (movieToEdit) {
            setMovie(movieToEdit)
            console.log(movieToEdit) }
    }, [props.movies, props.match.params.id]);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name.includes('stars')) {
            console.log(e.target.name)
            setMovie ({
                ...movie, 
                [e.target.name]: [value]
            })
            console.log(e.target.name)
            
            console.log(value)
        }
        else {
            setMovie ({
            ...movie,
            [e.target.name]: e.target.value
            })
            console.log(e.target.value)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res.data);
                props.updateFilms(res.data);
                props.history.goBack();
            })
            .catch(err => {
                console.log(err.message);
              });
    }
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChange}
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                />
                <input
                    type="text"
                    name={`stars[${0}]`}
                    placeholder="Actors"
                    onChange={handleChange}
                    value={movie.stars[0]}
                />
                <input
                    type="text"
                    name={`stars[${1}]`}
                    number='1'
                    placeholder="Actors"
                    onChange={handleChange}
                    value={movie.stars[1]}
                />
                <input
                    type="text"
                    name={`stars[${2}]`}
                    number='2'
                    placeholder="Actors"
                    onChange={handleChange}
                    value={movie.stars[2]}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie