import { createContext, ReactNode, useContext, useState } from "react";


interface MovieContextType{
    page: number;
    setPage:(page:number) => void;
    search: string;
    setSearch:(search:string) => void;
    option: number;
    setOption:(option:number) => void;
}

const MovieContext = createContext<MovieContextType>({
    page:1,
    setPage: () => {},
    search: "",
    setSearch: () => {},
    option: 0,
    setOption: () => {}
})

export const MovieContextProvider = ({children} : {children: ReactNode }) =>{
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState('deadpool');
    const [option,setOption] = useState(0);

    const contextValues = {
        page,
        setPage,
        search,
        setSearch,
        option,
        setOption
    };

    return(
        <MovieContext.Provider value={contextValues}>
            {children}
        </MovieContext.Provider>
    )
};

export const useMovieContext = () => useContext(MovieContext);