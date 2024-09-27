"use client";
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from "@/utils/api";
import Comments from "@/app/components/Comments";
import Image from 'next/image';
import { Movie } from "@/types/movie";

interface MovieDetailProps {
    params: { id: string };
}

const MovieDetail = ({ params }: MovieDetailProps) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) {
            const loadMovieDetails = async () => {
                try {
                    const movieData = await fetchMovieDetails(params.id);
                    setMovie(movieData);
                } catch (error) {
                    console.error("Error:", error);
                    setError("Film detayları yüklenirken bir hata oluştu.");
                } finally {
                    setLoading(false);
                }
            };

            loadMovieDetails();
        }
    }, [params.id]);

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Film bulunamadı.</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
            <Image
                src={movie.Poster}
                alt={movie.Title}
                width={200}
                height={300}
                className="object-cover rounded-md mb-4"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <p className="text-lg mb-4">{movie.Plot}</p>
            <p className="text-md text-blue-500">Çıkış Tarihi: {movie.Released}</p>
            <p className="text-md text-blue-500">IMDb Puanı: {movie.imdbRating}</p>
            <Comments movieId={movie.imdbID} />
        </div>
    );
};

export default MovieDetail;
