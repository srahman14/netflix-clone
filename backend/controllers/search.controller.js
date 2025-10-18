import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error searching person:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "Movie",
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error searching movie:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchTv(req, res) {
    const { query } = req.params;

    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {    
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "TV",
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error searching TV show:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, history: req.user.searchHistory });
    } catch (error) {
        console.error("Error fetching search history:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteSearchHistoryItem(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });
        res.status(200).json({ success: true, message: "Search history item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting search history item:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}