import { Movie, MovieDetail, TVShow, TVShowDetail, SeasonDetail, CastMember, Video, Genre, MediaItem } from "@/types";

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    original_title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6S7GRcd566d.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 30000,
    genre_ids: [28, 80, 18],
    popularity: 95.5,
    adult: false,
  },
  {
    id: 2,
    title: "Inception",
    original_title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
    poster_path: "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 35000,
    genre_ids: [28, 878, 12],
    popularity: 92.3,
    adult: false,
  },
  {
    id: 3,
    title: "Interstellar",
    original_title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK1Dho0Xx.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 33000,
    genre_ids: [12, 18, 878],
    popularity: 88.7,
    adult: false,
  },
  {
    id: 4,
    title: "Breaking Bad: The Movie",
    original_title: "Breaking Bad: The Movie",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
    poster_path: "/ztkUQFLlC19CCMYHW773s9EYRhd.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    release_date: "2013-01-20",
    vote_average: 9.5,
    vote_count: 12000,
    genre_ids: [18, 80],
    popularity: 85.2,
    adult: false,
  },
  {
    id: 5,
    title: "The Godfather",
    original_title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    vote_average: 9.2,
    vote_count: 19000,
    genre_ids: [18, 80],
    popularity: 80.1,
    adult: false,
  },
  {
    id: 6,
    title: "Pulp Fiction",
    original_title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's wife and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 25000,
    genre_ids: [53, 80],
    popularity: 76.4,
    adult: false,
  },
  {
    id: 7,
    title: "The Matrix",
    original_title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-30",
    vote_average: 8.7,
    vote_count: 24000,
    genre_ids: [28, 878],
    popularity: 74.8,
    adult: false,
  },
  {
    id: 8,
    title: "Fight Club",
    original_title: "Fight Club",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path: "/pB8BM7pdSp6B6Ih7QI4S2t0POoT.jpg",
    backdrop_path: "/87hTDiay2N2qWyX4Ds7ybXi9h8I.jpg",
    release_date: "1999-10-15",
    vote_average: 8.8,
    vote_count: 27000,
    genre_ids: [18],
    popularity: 73.2,
    adult: false,
  },
  {
    id: 9,
    title: "The Shawshank Redemption",
    original_title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    poster_path: "/9cjIGRiQoRCgTNEMmcoAjM98CfB.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 24000,
    genre_ids: [18, 80],
    popularity: 71.5,
    adult: false,
  },
  {
    id: 10,
    title: "Gladiator",
    original_title: "Gladiator",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    poster_path: "/ty8TGRuvJLPUmAR1H1nRIsgCLaV.jpg",
    backdrop_path: "/A5gn2GN3VTLF9S5hhhtV2mGlABk.jpg",
    release_date: "2000-05-05",
    vote_average: 8.5,
    vote_count: 15000,
    genre_ids: [28, 12, 18],
    popularity: 69.3,
    adult: false,
  },
  {
    id: 11,
    title: "Dune: Part Two",
    original_title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    release_date: "2024-03-01",
    vote_average: 8.7,
    vote_count: 5000,
    genre_ids: [878, 12],
    popularity: 98.1,
    adult: false,
  },
  {
    id: 12,
    title: "Oppenheimer",
    original_title: "Oppenheimer",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    release_date: "2023-07-21",
    vote_average: 8.5,
    vote_count: 7000,
    genre_ids: [18, 36],
    popularity: 94.6,
    adult: false,
  },
  {
    id: 13,
    title: "The Batman",
    original_title: "The Batman",
    overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family.",
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyFAJlsemRH3lDf8WB.jpg",
    release_date: "2022-03-01",
    vote_average: 7.8,
    vote_count: 10000,
    genre_ids: [9648, 80, 28],
    popularity: 87.4,
    adult: false,
  },
  {
    id: 14,
    title: "Spider-Man: No Way Home",
    original_title: "Spider-Man: No Way Home",
    overview: "Peter Parker is unmasked and no longer able to separate his normal life from that of being a super-hero.",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    release_date: "2021-12-17",
    vote_average: 8.3,
    vote_count: 18000,
    genre_ids: [28, 12, 878],
    popularity: 91.0,
    adult: false,
  },
  {
    id: 15,
    title: "Everything Everywhere All at Once",
    original_title: "Everything Everywhere All at Once",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
    poster_path: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdrop_path: "/fDGS2pnGnE0DYEFYJ2U1rb7pJUq.jpg",
    release_date: "2022-03-25",
    vote_average: 8.1,
    vote_count: 12000,
    genre_ids: [28, 12, 878],
    popularity: 82.5,
    adult: false,
  },
  {
    id: 16,
    title: "Parasite",
    original_title: "기생충",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get intertwined in an unexpected incident.",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9HoIp5SBISigaSKyUtSAGaga0.jpg",
    release_date: "2019-05-30",
    vote_average: 8.6,
    vote_count: 16000,
    genre_ids: [35, 53, 18],
    popularity: 79.8,
    adult: false,
  },
  {
    id: 17,
    title: "Avengers: Endgame",
    original_title: "Avengers: Endgame",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    release_date: "2019-04-26",
    vote_average: 8.4,
    vote_count: 22000,
    genre_ids: [12, 878, 28],
    popularity: 93.2,
    adult: false,
  },
  {
    id: 18,
    title: "Joker",
    original_title: "Joker",
    overview: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop_path: "/gZWl93sf8AxavYpVT1Un6EF3oCj.jpg",
    release_date: "2019-10-04",
    vote_average: 8.4,
    vote_count: 23000,
    genre_ids: [80, 53, 18],
    popularity: 88.9,
    adult: false,
  },
  {
    id: 19,
    title: "Mad Max: Fury Road",
    original_title: "Mad Max: Fury Road",
    overview: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken.",
    poster_path: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    backdrop_path: "/nlCHUWjY9XWbuEUQauCBgnY8wdw.jpg",
    release_date: "2015-05-13",
    vote_average: 8.2,
    vote_count: 21000,
    genre_ids: [28, 12, 878],
    popularity: 77.6,
    adult: false,
  },
  {
    id: 20,
    title: "The Departed",
    original_title: "The Departed",
    overview: "To take down South Boston's Irish Mafia, the police send in one of their own to infiltrate the underworld.",
    poster_path: "/nT7SFhe1I0hGGnEV3nFS0UfPkqW.jpg",
    backdrop_path: "/mBbAqVK9Fz9p6T3Y7xaxEMD1iz4.jpg",
    release_date: "2006-10-06",
    vote_average: 8.5,
    vote_count: 12000,
    genre_ids: [18, 53, 80],
    popularity: 70.1,
    adult: false,
  },
];

export const MOCK_MOVIE_DETAILS: Record<number, MovieDetail> = {
  1: {
    ...MOCK_MOVIES[0],
    tagline: "Why so serious?",
    runtime: 152,
    status: "Released",
    budget: 185000000,
    revenue: 1005000000,
    homepage: "https://www.warnerbros.com/movies/the-dark-knight",
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  2: {
    ...MOCK_MOVIES[1],
    tagline: "Your mind is the scene of the crime",
    runtime: 148,
    status: "Released",
    budget: 160000000,
    revenue: 836000000,
    homepage: "https://www.warnerbros.com/movies/inception",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  3: {
    ...MOCK_MOVIES[2],
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    runtime: 169,
    status: "Released",
    budget: 165000000,
    revenue: 701000000,
    homepage: "https://www.paramount.com/movies/interstellar",
    genres: [
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" },
    ],
    production_companies: [
      { id: 4, name: "Paramount Pictures", logo_path: null },
    ],
  },
  4: {
    ...MOCK_MOVIES[3],
    tagline: "Stay out of his territory.",
    runtime: 120,
    status: "Released",
    budget: 0,
    revenue: 0,
    homepage: null,
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" },
    ],
    production_companies: [],
  },
  5: {
    ...MOCK_MOVIES[4],
    tagline: "An offer you can't refuse.",
    runtime: 175,
    status: "Released",
    budget: 6000000,
    revenue: 245000000,
    homepage: null,
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" },
    ],
    production_companies: [
      { id: 4, name: "Paramount Pictures", logo_path: null },
    ],
  },
  6: {
    ...MOCK_MOVIES[5],
    tagline: "Just because you're invited doesn't mean you're welcome.",
    runtime: 154,
    status: "Released",
    budget: 8000000,
    revenue: 213000000,
    homepage: null,
    genres: [
      { id: 53, name: "Thriller" },
      { id: 80, name: "Crime" },
    ],
    production_companies: [],
  },
  7: {
    ...MOCK_MOVIES[6],
    tagline: "Welcome to the Real World.",
    runtime: 136,
    status: "Released",
    budget: 63000000,
    revenue: 467000000,
    homepage: null,
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  8: {
    ...MOCK_MOVIES[7],
    tagline: "Mischief. Mayhem. Soap.",
    runtime: 139,
    status: "Released",
    budget: 63000000,
    revenue: 101200000,
    homepage: null,
    genres: [{ id: 18, name: "Drama" }],
    production_companies: [],
  },
  9: {
    ...MOCK_MOVIES[8],
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    runtime: 142,
    status: "Released",
    budget: 25000000,
    revenue: 58300000,
    homepage: null,
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" },
    ],
    production_companies: [],
  },
  10: {
    ...MOCK_MOVIES[9],
    tagline: "A Hero Will Rise.",
    runtime: 155,
    status: "Released",
    budget: 103000000,
    revenue: 465000000,
    homepage: null,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  11: {
    ...MOCK_MOVIES[10],
    tagline: "Long live the fighters.",
    runtime: 166,
    status: "Released",
    budget: 190000000,
    revenue: 714000000,
    homepage: "https://www.warnerbros.com/movies/dune-part-two",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  12: {
    ...MOCK_MOVIES[11],
    tagline: "The world forever changes.",
    runtime: 180,
    status: "Released",
    budget: 100000000,
    revenue: 952000000,
    homepage: "https://www.universalpictures.com/movies/oppenheimer",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
    ],
    production_companies: [
      { id: 33, name: "Universal Pictures", logo_path: null },
    ],
  },
  13: {
    ...MOCK_MOVIES[12],
    tagline: "Unmask the truth.",
    runtime: 176,
    status: "Released",
    budget: 185000000,
    revenue: 770000000,
    homepage: null,
    genres: [
      { id: 9648, name: "Mystery" },
      { id: 80, name: "Crime" },
      { id: 28, name: "Action" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  14: {
    ...MOCK_MOVIES[13],
    tagline: "It's time to go home.",
    runtime: 148,
    status: "Released",
    budget: 200000000,
    revenue: 1921000000,
    homepage: null,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    production_companies: [],
  },
  15: {
    ...MOCK_MOVIES[14],
    tagline: "This is an indie film.",
    runtime: 139,
    status: "Released",
    budget: 25000000,
    revenue: 141000000,
    homepage: null,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    production_companies: [],
  },
  16: {
    ...MOCK_MOVIES[15],
    tagline: "Act like you own the place.",
    runtime: 132,
    status: "Released",
    budget: 11400000,
    revenue: 266000000,
    homepage: null,
    genres: [
      { id: 35, name: "Comedy" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
    ],
    production_companies: [],
  },
  17: {
    ...MOCK_MOVIES[16],
    tagline: "Part of the journey is the end.",
    runtime: 181,
    status: "Released",
    budget: 356000000,
    revenue: 2799000000,
    homepage: null,
    genres: [
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
      { id: 28, name: "Action" },
    ],
    production_companies: [],
  },
  18: {
    ...MOCK_MOVIES[17],
    tagline: "Put on a happy face.",
    runtime: 122,
    status: "Released",
    budget: 55000000,
    revenue: 1074000000,
    homepage: null,
    genres: [
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" },
      { id: 18, name: "Drama" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  19: {
    ...MOCK_MOVIES[18],
    tagline: "What a lovely day.",
    runtime: 120,
    status: "Released",
    budget: 150000000,
    revenue: 380000000,
    homepage: null,
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    production_companies: [
      { id: 174, name: "Warner Bros. Pictures", logo_path: null },
    ],
  },
  20: {
    ...MOCK_MOVIES[19],
    tagline: "Cops or criminals. When you're facing a loaded gun, what's the difference?",
    runtime: 151,
    status: "Released",
    budget: 90000000,
    revenue: 291000000,
    homepage: null,
    genres: [
      { id: 18, name: "Drama" },
      { id: 53, name: "Thriller" },
      { id: 80, name: "Crime" },
    ],
    production_companies: [],
  },
};

export const MOCK_MOVIE_CAST: Record<number, CastMember[]> = {
  1: [
    { id: 101, name: "Christian Bale", character: "Bruce Wayne / Batman", profile_path: null, order: 0 },
    { id: 102, name: "Heath Ledger", character: "Joker", profile_path: null, order: 1 },
    { id: 103, name: "Aaron Eckhart", character: "Harvey Dent", profile_path: null, order: 2 },
    { id: 104, name: "Michael Caine", character: "Alfred Pennyworth", profile_path: null, order: 3 },
    { id: 105, name: "Gary Oldman", character: "Commissioner Gordon", profile_path: null, order: 4 },
    { id: 106, name: "Morgan Freeman", character: "Lucius Fox", profile_path: null, order: 5 },
  ],
  2: [
    { id: 201, name: "Leonardo DiCaprio", character: "Cobb", profile_path: null, order: 0 },
    { id: 202, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: null, order: 1 },
    { id: 203, name: "Elliot Page", character: "Ariadne", profile_path: null, order: 2 },
    { id: 204, name: "Tom Hardy", character: "Eames", profile_path: null, order: 3 },
    { id: 205, name: "Ken Watanabe", character: "Saito", profile_path: null, order: 4 },
  ],
  3: [
    { id: 301, name: "Matthew McConaughey", character: "Cooper", profile_path: null, order: 0 },
    { id: 302, name: "Anne Hathaway", character: "Brand", profile_path: null, order: 1 },
    { id: 303, name: "Jessica Chastain", character: "Murph", profile_path: null, order: 2 },
    { id: 304, name: "Michael Caine", character: "Professor Brand", profile_path: null, order: 3 },
  ],
};

export const MOCK_MOVIE_VIDEOS: Record<number, Video[]> = {
  1: [
    { id: "v1_trailer", key: "EXeTwQWrcwY", name: "The Dark Knight Official Trailer", site: "YouTube", type: "Trailer" },
  ],
  2: [
    { id: "v2_trailer", key: "YoHD9XEInc0", name: "Inception Official Trailer", site: "YouTube", type: "Trailer" },
  ],
  3: [
    { id: "v3_trailer", key: "zSWdZVtXT7E", name: "Interstellar Official Trailer", site: "YouTube", type: "Trailer" },
  ],
};

export function getMockSimilarMovies(movieId: number): Movie[] {
  return MOCK_MOVIES.filter((m) => m.id !== movieId).slice(0, 10);
}

export function getMockMovieRecommendations(movieId: number): Movie[] {
  return MOCK_MOVIES.filter((m) => m.id !== movieId).slice(0, 6);
}

export function searchMockMovies(query: string): Movie[] {
  const lower = query.toLowerCase();
  return MOCK_MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(lower) ||
      m.overview.toLowerCase().includes(lower)
  );
}

export function discoverMockMovies(
  genreId?: number,
  sortBy: string = "popularity.desc",
  page: number = 1,
  pageSize: number = 20
): { results: Movie[]; total_pages: number; total_results: number } {
  let filtered = [...MOCK_MOVIES];

  if (genreId) {
    filtered = filtered.filter((m) => m.genre_ids.includes(genreId));
  }

  if (sortBy === "vote_average.desc") {
    filtered.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortBy === "release_date.desc") {
    filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  } else if (sortBy === "release_date.asc") {
    filtered.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
  } else {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  const start = (page - 1) * pageSize;
  const results = filtered.slice(start, start + pageSize);

  return {
    results,
    total_pages: Math.ceil(filtered.length / pageSize),
    total_results: filtered.length,
  };
}

export const MOCK_TV_SHOWS: TVShow[] = [
  { id: 101, name: "Stranger Things", original_name: "Stranger Things", overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.", poster_path: "/49WJfeN0m4y5sr2GS6FmJNdbP17.jpg", backdrop_path: "/56v2KjBlU4XaOv9DOi6kLlmMoj7.jpg", first_air_date: "2016-07-15", vote_average: 8.6, vote_count: 18000, genre_ids: [18, 9648, 10765], popularity: 95.2 },
  { id: 102, name: "Breaking Bad", original_name: "Breaking Bad", overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.", poster_path: "/ztkUQFLlC19CCMYHW773s9EYRhd.jpg", backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg", first_air_date: "2008-01-20", vote_average: 9.5, vote_count: 15000, genre_ids: [18, 80], popularity: 90.1 },
  { id: 103, name: "Game of Thrones", original_name: "Game of Thrones", overview: "Nine noble families fight for control over the lands of Westeros, while a forgotten race returns after being dormant for millennia.", poster_path: "/1XS1oqLThT6NMd0G3RqB4p3E2j.jpg", backdrop_path: "/suopoADq0kQQYZz1iTMPgOm9Vb.jpg", first_air_date: "2011-04-17", vote_average: 8.9, vote_count: 23000, genre_ids: [18, 10765, 10759], popularity: 88.5 },
  { id: 104, name: "The Crown", original_name: "The Crown", overview: "This gripping drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.", poster_path: "/1MvTtUaD1o1V7Yd3bXKxji0rN6.jpg", backdrop_path: "/kQlAysYTDKYM28V9T6XhQ2lVAF.jpg", first_air_date: "2016-11-04", vote_average: 8.7, vote_count: 8500, genre_ids: [18, 36], popularity: 82.3 },
  { id: 105, name: "The Mandalorian", original_name: "The Mandalorian", overview: "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.", poster_path: "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg", backdrop_path: "/f7umr4lMbB8U7T7utS4x7RuOTr.jpg", first_air_date: "2019-11-12", vote_average: 8.5, vote_count: 12000, genre_ids: [10759, 10765, 18], popularity: 85.7 },
  { id: 106, name: "Squid Game", original_name: "오징어 게임", overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.", poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCj1UxM.jpg", backdrop_path: "/oizU0Z5EWt2GIEBThKMlfHmOib.jpg", first_air_date: "2021-09-17", vote_average: 8.1, vote_count: 20000, genre_ids: [18, 10759, 80], popularity: 92.8 },
  { id: 107, name: "The Last of Us", original_name: "The Last of Us", overview: "Twenty years after modern civilization has been destroyed, a hardened survivor is tasked with smuggling a 14-year-old girl who may be mankind's last hope.", poster_path: "/uKvVjHNqB1VmE2s9B3E2A5A5tF.jpg", backdrop_path: "/nkD1KSsW4QHnPmhx2W0gAsISY.jpg", first_air_date: "2023-01-15", vote_average: 8.8, vote_count: 9000, genre_ids: [18, 10759, 9648], popularity: 89.4 },
  { id: 108, name: "Severance", original_name: "Severance", overview: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.", poster_path: "/1MvTtUaD1o1V7Yd3bXKxji0rN6.jpg", backdrop_path: "/kQlAysYTDKYM28V9T6XhQ2lVAF.jpg", first_air_date: "2022-02-18", vote_average: 8.7, vote_count: 6000, genre_ids: [18, 9648, 10765], popularity: 81.6 },
  { id: 109, name: "Ted Lasso", original_name: "Ted Lasso", overview: "An American football coach is hired to manage a British soccer team despite having no experience. His unwavering optimism and unorthodox methods win over the skeptical team and fans.", poster_path: "/49WJfeN0m4y5sr2GS6FmJNdbP17.jpg", backdrop_path: "/56v2KjBlU4XaOv9DOi6kLlmMoj7.jpg", first_air_date: "2020-08-14", vote_average: 8.5, vote_count: 8000, genre_ids: [35, 18], popularity: 79.8 },
  { id: 110, name: "The Office", original_name: "The Office", overview: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.", poster_path: "/qWnJ3KfqKQhY7mX5n0wKcVb9Tf.jpg", backdrop_path: "/k3IM8Rw33VqGzR4pIKMYMNzJMD.jpg", first_air_date: "2005-03-24", vote_average: 9.0, vote_count: 14000, genre_ids: [35], popularity: 78.2 },
  { id: 111, name: "Black Mirror", original_name: "Black Mirror", overview: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.", poster_path: "/49WJfeN0m4y5sr2GS6FmJNdbP17.jpg", backdrop_path: "/56v2KjBlU4XaOv9DOi6kLlmMoj7.jpg", first_air_date: "2011-12-04", vote_average: 8.4, vote_count: 10000, genre_ids: [9648, 10765, 18], popularity: 76.5 },
  { id: 112, name: "Succession", original_name: "Succession", overview: "The Roy family, owners of the biggest media and entertainment company in the world, must navigate the treacherous waters of business and family.", poster_path: "/7v9i0r5c6q0bY0fQb0m0k0d0s0.jpg", backdrop_path: "/kQlAysYTDKYM28V9T6XhQ2lVAF.jpg", first_air_date: "2018-06-03", vote_average: 8.8, vote_count: 7500, genre_ids: [18], popularity: 84.3 },
];

export const MOCK_TV_DETAILS: Record<number, TVShowDetail> = {
  101: {
    ...MOCK_TV_SHOWS[0],
    tagline: "The world is turning upside down.",
    number_of_seasons: 4,
    number_of_episodes: 34,
    status: "Returning Series",
    homepage: null,
    seasons: [
      { id: 1001, name: "Season 1", overview: "", season_number: 1, episode_count: 8, air_date: "2016-07-15", poster_path: null },
      { id: 1002, name: "Season 2", overview: "", season_number: 2, episode_count: 9, air_date: "2017-10-27", poster_path: null },
      { id: 1003, name: "Season 3", overview: "", season_number: 3, episode_count: 8, air_date: "2019-07-04", poster_path: null },
      { id: 1004, name: "Season 4", overview: "", season_number: 4, episode_count: 9, air_date: "2022-05-27", poster_path: null },
    ],
    genres: [{ id: 18, name: "Drama" }, { id: 9648, name: "Mystery" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
  },
  102: {
    ...MOCK_TV_SHOWS[1],
    tagline: "Change the equation.",
    number_of_seasons: 5,
    number_of_episodes: 62,
    status: "Ended",
    homepage: null,
    seasons: [
      { id: 2001, name: "Season 1", overview: "", season_number: 1, episode_count: 7, air_date: "2008-01-20", poster_path: null },
      { id: 2002, name: "Season 2", overview: "", season_number: 2, episode_count: 13, air_date: "2009-03-08", poster_path: null },
      { id: 2003, name: "Season 3", overview: "", season_number: 3, episode_count: 13, air_date: "2010-03-21", poster_path: null },
      { id: 2004, name: "Season 4", overview: "", season_number: 4, episode_count: 13, air_date: "2011-07-17", poster_path: null },
      { id: 2005, name: "Season 5", overview: "", season_number: 5, episode_count: 16, air_date: "2012-07-15", poster_path: null },
    ],
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
  },
  103: {
    ...MOCK_TV_SHOWS[2],
    tagline: "Winter is coming.",
    number_of_seasons: 8,
    number_of_episodes: 73,
    status: "Ended",
    homepage: null,
    seasons: [
      { id: 3001, name: "Season 1", overview: "", season_number: 1, episode_count: 10, air_date: "2011-04-17", poster_path: null },
      { id: 3002, name: "Season 2", overview: "", season_number: 2, episode_count: 10, air_date: "2012-04-01", poster_path: null },
      { id: 3003, name: "Season 3", overview: "", season_number: 3, episode_count: 10, air_date: "2013-03-31", poster_path: null },
    ],
    genres: [{ id: 18, name: "Drama" }, { id: 10765, name: "Sci-Fi & Fantasy" }, { id: 10759, name: "Action & Adventure" }],
  },
};

export const MOCK_TV_SEASONS: Record<string, SeasonDetail> = {
  "101-1": {
    id: 1001,
    name: "Season 1",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.",
    season_number: 1,
    episodes: [
      { id: 10001, name: "Chapter One: The Vanishing of Will Byers", overview: "On his way home from a friend's house, young Will sees something terrifying. The next day, he has vanished.", episode_number: 1, season_number: 1, air_date: "2016-07-15", runtime: 55, vote_average: 8.2, still_path: null },
      { id: 10002, name: "Chapter Two: The Weirdo on Maple Street", overview: "Mike, Dustin and Lucas search for Will and a mysterious girl appears.", episode_number: 2, season_number: 1, air_date: "2016-07-15", runtime: 55, vote_average: 8.1, still_path: null },
      { id: 10003, name: "Chapter Three: Holly, Jolly", overview: "An increasingly concerned Nancy looks for Barb, and Joyce is convinced Will is trying to communicate with her.", episode_number: 3, season_number: 1, air_date: "2016-07-15", runtime: 52, vote_average: 8.3, still_path: null },
      { id: 10004, name: "Chapter Four: The Body", overview: "Will's body is found in a quarry, but Joyce refuses to believe it's true.", episode_number: 4, season_number: 1, air_date: "2016-07-15", runtime: 50, vote_average: 8.5, still_path: null },
      { id: 10005, name: "Chapter Five: The Flea and the Acrobat", overview: "Hopper is brought in to investigate, and the boys learn about the Upside Down.", episode_number: 5, season_number: 1, air_date: "2016-07-15", runtime: 53, vote_average: 8.4, still_path: null },
    ],
    air_date: "2016-07-15",
    poster_path: null,
  },
  "102-1": {
    id: 2001,
    name: "Season 1",
    overview: "Chemistry teacher Walter White turns to cooking meth after a terminal cancer diagnosis.",
    season_number: 1,
    episodes: [
      { id: 20001, name: "Pilot", overview: "Walter White, a chemistry teacher, is diagnosed with terminal lung cancer and decides to start cooking meth.", episode_number: 1, season_number: 1, air_date: "2008-01-20", runtime: 58, vote_average: 8.5, still_path: null },
      { id: 20002, name: "Cat's in the Bag...", overview: "Walt and Jesse try to dispose of two bodies in the RV.", episode_number: 2, season_number: 1, air_date: "2008-01-27", runtime: 48, vote_average: 8.3, still_path: null },
      { id: 20003, name: "...And the Bag's in the River", overview: "Walt must decide whether to kill Krazy-8.", episode_number: 3, season_number: 1, air_date: "2008-02-10", runtime: 47, vote_average: 8.4, still_path: null },
    ],
    air_date: "2008-01-20",
    poster_path: null,
  },
};

export const MOCK_TV_CAST: Record<number, CastMember[]> = {
  101: [
    { id: 5001, name: "Millie Bobby Brown", character: "Eleven", profile_path: null, order: 0 },
    { id: 5002, name: "Finn Wolfhard", character: "Mike Wheeler", profile_path: null, order: 1 },
    { id: 5003, name: "David Harbour", character: "Jim Hopper", profile_path: null, order: 2 },
    { id: 5004, name: "Winona Ryder", character: "Joyce Byers", profile_path: null, order: 3 },
    { id: 5005, name: "Gaten Matarazzo", character: "Dustin Henderson", profile_path: null, order: 4 },
  ],
  102: [
    { id: 6001, name: "Bryan Cranston", character: "Walter White", profile_path: null, order: 0 },
    { id: 6002, name: "Aaron Paul", character: "Jesse Pinkman", profile_path: null, order: 1 },
    { id: 6003, name: "Anna Gunn", character: "Skyler White", profile_path: null, order: 2 },
  ],
  103: [
    { id: 7001, name: "Emilia Clarke", character: "Daenerys Targaryen", profile_path: null, order: 0 },
    { id: 7002, name: "Kit Harington", character: "Jon Snow", profile_path: null, order: 1 },
    { id: 7003, name: "Peter Dinklage", character: "Tyrion Lannister", profile_path: null, order: 2 },
  ],
};

export const MOCK_TV_VIDEOS: Record<number, Video[]> = {
  101: [{ id: "tv101_trailer", key: "b9EkMc79ZSU", name: "Stranger Things Season 1 Trailer", site: "YouTube", type: "Trailer" }],
  102: [{ id: "tv102_trailer", key: "HhesaQXLuRY", name: "Breaking Bad Trailer", site: "YouTube", type: "Trailer" }],
  103: [{ id: "tv103_trailer", key: "KPLWWI2H1Rc", name: "Game of Thrones Trailer", site: "YouTube", type: "Trailer" }],
};

export const MOVIE_GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const TV_GENRES: Genre[] = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export function getMockSimilarTV(tvId: number): TVShow[] {
  return MOCK_TV_SHOWS.filter((t) => t.id !== tvId).slice(0, 8);
}

export function searchMockMulti(query: string): MediaItem[] {
  const lower = query.toLowerCase();
  const movies = MOCK_MOVIES.filter(
    (m) => m.title.toLowerCase().includes(lower) || m.overview.toLowerCase().includes(lower)
  ).map((m) => ({ ...m, media_type: "movie" as const }));
  const tv = MOCK_TV_SHOWS.filter(
    (t) => t.name.toLowerCase().includes(lower) || t.overview.toLowerCase().includes(lower)
  ).map((t) => ({ ...t, title: t.name, release_date: t.first_air_date, media_type: "tv" as const }));
  return [...movies, ...tv] as MediaItem[];
}

export function discoverMockTV(
  genreId?: number,
  sortBy: string = "popularity.desc",
  page: number = 1,
  pageSize: number = 20
): { results: TVShow[]; total_pages: number; total_results: number } {
  let filtered = [...MOCK_TV_SHOWS];
  if (genreId) {
    filtered = filtered.filter((t) => t.genre_ids.includes(genreId));
  }
  if (sortBy === "vote_average.desc") {
    filtered.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortBy === "release_date.desc") {
    filtered.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
  } else if (sortBy === "release_date.asc") {
    filtered.sort((a, b) => new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime());
  } else {
    filtered.sort((a, b) => b.popularity - a.popularity);
  }
  const start = (page - 1) * pageSize;
  return {
    results: filtered.slice(start, start + pageSize),
    total_pages: Math.ceil(filtered.length / pageSize),
    total_results: filtered.length,
  };
}

export const TRENDING_MEDIA: MediaItem[] = [
  ...MOCK_MOVIES.slice(0, 8).map((m) => ({ ...m, media_type: "movie" as const })),
  ...MOCK_TV_SHOWS.slice(0, 4).map((t) => ({ ...t, title: t.name, release_date: t.first_air_date, media_type: "tv" as const })),
];
