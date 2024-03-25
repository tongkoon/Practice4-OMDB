import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Movie } from "../model/Movie";

function ShowMovie({movie}:{movie:Movie[]}){
    return(
        <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'10px'}>
        {movie.map((item, i) => {
          return (
            <Grid item xs={2} key={i}>
              <Card sx={{ maxWidth: 200 ,}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // height="200"
                    src={item.Poster}
                    alt="green iguana"
                  />
                  
                </CardActionArea>
              </Card>
              {/* <h3>{item.Title}</h3> */}
            </Grid>
          );
        })}
      </Box>
    )
}

export default ShowMovie;