export function getRecommendations(movies, genre, rating) {

    let recommended = [];

    for (let movie of movies) {

        let movieRating = parseFloat(movie.imdbRating);

        let genreMatch = genre === "All" ||
                         movie.Genre.split(", ").includes(genre);

        let ratingMatch = movieRating >= rating;

        if (genreMatch && ratingMatch) {
            recommended.push(movie);
        }
    }

    return recommended;
}

