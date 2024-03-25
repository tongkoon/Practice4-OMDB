import axios from "axios";
import { useEffect, useRef, useState } from "react";
// import movie from "../../movie.json";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardActionArea,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { URL } from "../constanst";
import { Movie } from "../model/Movie";
import { useMovieContext } from "../shared/Context";

function HomePage() {
  const [count, setCount] = useState(0);
  const input = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [movie,setMovie] = useState<Movie[]>([]);
  const { page, setPage, search, setSearch, option, setOption } = useMovieContext();
  const url = URL+'&s='+search+'&page='+page;
  useEffect(() => {
    getData();
  }, [page,search]);

  return (
    <Container maxWidth={"lg"} sx={{ color: "whitesmoke", pt: 4 }}>
      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <Box sx={{ minWidth: 120 }} mr={3}>
          <FormControl fullWidth>
            <Select
              size="small"
              value={option.toString()}
              onChange={(event: SelectChangeEvent) => {
                setOption(+event.target.value);
                isOption(+event.target.value);
              }}
            >
              <MenuItem value={0}>ค้นหาด้วยชื่อ</MenuItem>
              <MenuItem value={1}>ค้นหาด้วย ID</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          InputProps={{ sx: { borderRadius: "20px" } }}
          inputRef={input}
          id="outlined-basic"
          label="ค้นหา"
          variant="outlined"
          size="small"
          onChange={() => {
            console.log(option);
            setSearch(input.current!.value)
            isOption(option);
          }}
        />
        <Box ml={0.5}>
          <IconButton aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={"10px"}
      >
        {count != 0 ? (
          movie.map((item, i) => (
            <Grid item xs={2} key={i}>
              <Card sx={{ maxWidth: 150, height: 215 }}>
                <CardActionArea
                  onClick={() => {
                    navigate("/detail/" + movie[i].imdbID);
                  }}
                >
                  <CardMedia
                    component="img"
                    src={item.Poster}
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h5">ไม่พบข้อมูล</Typography>
        )}
      </Box>

      <Box display={"flex"} justifyContent={"center"} m={2}>
        <Pagination
          count={Math.round(count / 10)}
          page={page}
          onChange={(event, value) => {
            console.log(value);
            setPage(value);
          }}
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "orangered",
              color: "white",
            },
          }}
          shape="rounded"
        />
      </Box>
    </Container>
  );

  function isOption(option: number) {
    if (option == 0) {
      console.log(input.current?.value);
      setSearch("&s=" + input.current?.value);
    } else {
      console.log(input.current?.value);
      setSearch("&i=" + input.current?.value);
    }
  }

  function getData() {
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data.Response != "False");

      if (res.data.Response != "False") {
        const data = res.data;
        if (option == 0) {
          setMovie(data.Search);
          setCount(data.totalResults);
        } else {
          const tmpMovie: Movie = data;
          setMovie([tmpMovie]);
          setCount(2);
        }
      } else {
        setCount(0);
      }
    });
  }
}

export default HomePage;
