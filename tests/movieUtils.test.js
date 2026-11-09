import { test } from "node:test";
import assert from "node:assert/strict";

import { getRecommendations } from "../movieUtils.js";

test("Filter movies by genre", () => {

    let movies = [
        { Title: "Batman", Genre: "Action, Crime", imdbRating: "8.5" },
        { Title: "Joker", Genre: "Drama, Crime", imdbRating: "8.4" },
        { Title: "Avengers", Genre: "Action, Adventure", imdbRating: "8.0" }
    ];

    let result = getRecommendations(movies, "Action", 0);

    assert.equal(result.length, 2);

});

test("Filter movies by minimum rating", () => {

    let movies = [
        { Title: "Batman", Genre: "Action", imdbRating: "8.5" },
        { Title: "Movie B", Genre: "Drama", imdbRating: "6.0" }
    ];

    let result = getRecommendations(movies, "All", 8);

    assert.equal(result.length, 1);

});

test("Return empty list when no movie matches", () => {

    let movies = [
        { Title: "Batman", Genre: "Action", imdbRating: "8.5" }
    ];

    let result = getRecommendations(movies, "Comedy", 8);

    assert.equal(result.length, 0);

});
