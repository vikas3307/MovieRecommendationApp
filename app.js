import { getRecommendations } from "./movieUtils.js";

let allMovies = [];

document.getElementById("searchButton").addEventListener("click", searchMovies);

async function searchMovies() {

    let apiKey = document.getElementById("apiKey").value.trim();
    let movieName = document.getElementById("searchInput").value.trim();

    let container = document.getElementById("movieContainer");
    let message = document.getElementById("message");

    if (apiKey === "" || movieName === "") {
        message.innerText = "Please enter API key and movie name";
        return;
    }

    container.innerHTML = "";
    message.innerText = "Searching movies...";

    try {

        let url = "https://www.omdbapi.com/?apikey=" + encodeURIComponent(apiKey) + "&s=" + encodeURIComponent(movieName);

        let response = await fetch(url);
        let data = await response.json();

        if (data.Response === "False") {
            message.innerText = data.Error;
            return;
        }

        let details = await Promise.all(
            data.Search.map(async (movie) => {

                let detailUrl = "https://www.omdbapi.com/?apikey=" +
                    encodeURIComponent(apiKey) + "&i=" + movie.imdbID;

                let detailResponse = await fetch(detailUrl);
                return await detailResponse.json();

            })
        );

        allMovies = details.filter(movie => movie.Response === "True");

        showRecommendations();

    } catch (error) {

        message.innerText = "Something went wrong. Please try again.";

    }
}

function showRecommendations() {

    let genre = document.getElementById("genre").value;
    let rating = Number(document.getElementById("rating").value);

    let container = document.getElementById("movieContainer");
    let message = document.getElementById("message");

    let recommended = getRecommendations(allMovies, genre, rating);

    container.innerHTML = "";

    if (recommended.length === 0) {
        message.innerText = "No matching movies found.";
        return;
    }

    message.innerText = "Recommended Movies: " + recommended.length;

    for (let movie of recommended) {

        let poster = movie.Poster;

        if (poster === "N/A") {
            poster = "https://placehold.co/200x280?text=No+Poster";
        }

        container.innerHTML += `
            <div class="movie-card">
                <img src="${poster}" alt="Movie Poster">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Genre: ${movie.Genre}</p>
                <p>IMDb Rating: ${movie.imdbRating}</p>
            </div>
        `;
    }
}

document.getElementById("genre").addEventListener("change", showRecommendations);
document.getElementById("rating").addEventListener("change", showRecommendations);
