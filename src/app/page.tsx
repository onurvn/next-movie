"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchMovies } from "@/utils/api";
import { Movie } from "@/types/movie";
import Search from "@/app/components/Search";
import { ModeToggle } from '@/components/theme-toggle';

const Home = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError(null);
        console.log("Arama Sorgusu:", query);
        try {
            const moviesData = await fetchMovies(query);
            console.log("Gelen Filmler:", moviesData);
            setMovies(moviesData);
        } catch (error) {
            console.error("Error:", error);
            setError("Filmler yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getMovies = async () => {
            setLoading(true);
            try {
                const moviesData = await fetchMovies("batman");
                setMovies(moviesData);
            } catch (error) {
                console.error("Error:", error);
                setError("Filmler yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

       
        getMovies();
    }, []);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container mx-auto mt-5 mb-10'>
            <h1 className="text-2xl font-bold">Popüler Filmler</h1>
            <div className='flex justify-end mb-4'>
                <ModeToggle />
            </div>
            <Search onSearch={handleSearch} />
            {movies.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <li key={movie.imdbID} className="relative">
                            <Link href={`/movies/${movie.imdbID}`}>
                                <Image
                                    src={movie.Poster !== "N/A" ? movie.Poster : "/path/to/placeholder-image.jpg"} 
                                    alt={movie.Title}
                                    width={200}
                                    height={300}
                                    className="object-cover rounded-md"
                                />
                                <span>{movie.Title} ({movie.Year})</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Film bulunamadı.</p>
            )}
        </div>
    );
};

export default Home;
