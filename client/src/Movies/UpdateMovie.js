import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: ['1', '2', '3']
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
        let newName = e.target.name;
        if(e.target.value.includes(0)) {
            console.log(e.target.name)
            setMovie ({
                ...movie, 
                [newName[0]]: value
            })
            console.log(e.target.name)
            console.log(movie.stars[newName])
            console.log(value)
        }
        else {
            setMovie ({
            ...movie,
            [e.target.name]: e.target.value
            })
            console.log(movie.stars)
            console.log(e.target.name)
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
                {movie.stars.map((n, index) => (
                    <input
                        key={index}
                        value={n}
                        name={`stars${index}`}
                        onChange = {e => {
                            movie.stars[index] = e.target.value;
                            setMovie ({
                                ...movie,
                            })  
                        }}
                    />
                ))}
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie