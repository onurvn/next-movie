"use client";
import { useState } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
        if (!query.trim()) {
            setError("Lütfen bir arama terimi girin.");
            return;
        }

        setError(null); 
        onSearch(query);
        setQuery(""); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Film arayın..."
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 rounded text-white">
                    Ara
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>} 
        </div>
    );
};

export default Search;
