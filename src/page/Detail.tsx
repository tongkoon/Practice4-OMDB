import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button, Grid, IconButton, Rating, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
// import detail from "../../Detail.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../constanst";
import { Detail } from "../model/Detail";

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setdetail] = useState<Detail>();

  useEffect(() => {
    const url = URL + "&i=" + params.id;
    console.log(url);

    axios.get(url).then((res) => {
      console.log(res);
      setdetail(res.data);
    });
  }, []);
  return (
    <>
      <Container maxWidth={"md"} sx={{ color: "whitesmoke", pt: 4 }}>
        {detail && (
          <Box
            // mt={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "90vh",
              backgroundImage: "linear-gradient(to right, black 0%, gray 150%)",
              borderRadius: "10px",
            }}
          >
            <Box width={"100%"} pt={3}>
              <Grid container spacing={2} pl={1}>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="back"
                    sx={{ width: 32, height: 32 }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <ArrowBackIcon sx={{ color: "white" }} />
                  </IconButton>
                </Grid>
                <Grid item xs={11} display={"flex"} alignItems={"center"}>
                  <Typography fontWeight={700}>{detail.Title}</Typography>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={11}>
                  <Typography sx={{ fontSize: 10 }}>
                    {detail.Runtime} | {detail.Genre} | {detail.Year}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {detail.Title}
                  </Typography>
                  <Rating
                    size="small"
                    name="text-feedback"
                    value={+detail.imdbRating / 2}
                    readOnly
                    precision={0.5}
                    sx={{
                      borderRadius: "5px",
                      "& .MuiRating-iconFilled": {
                        color: "orangered", // กำหนดสีของ icon ที่มีค่าที่เต็ม
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "orangered",
                      },
                    }}
                  />
                  <Typography>{detail.Plot}</Typography>

                  <Box display={"flex"} mt={2} columnGap={1}>
                    <Typography color={"rgb(255,255,255,0.7)"}>
                      Director :
                    </Typography>
                    <Typography fontWeight={600}>{detail.Director}</Typography>
                  </Box>

                  <Box display={"flex"} mt={2} columnGap={1}>
                    <Typography color={"rgb(255,255,255,0.7)"}>
                      Writer :
                    </Typography>
                    <Typography fontWeight={600}>{detail.Writer}</Typography>
                  </Box>

                  <Box display={"flex"} mt={2} columnGap={1}>
                    <Typography color={"rgb(255,255,255,0.7)"}>
                      Actors :
                    </Typography>
                    <Typography fontWeight={600}>{detail.Actors}</Typography>
                  </Box>
                  <Box mt={5} display={"flex"} columnGap={3}>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<PlayArrowIcon />}
                    >
                      Watch Now
                    </Button>
                    <Button color="primary" startIcon={<AddIcon />}>
                      Add to List
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  minWidth: "300px",
                  height: "85vh",
                  backgroundImage: `url(${detail.Poster})`,
                  backgroundSize: "cover",
                  marginRight: 2,
                  marginLeft: 2,
                  borderRadius: "15px",
                }}
              ></Box>
            </Box>
          </Box>
        )}
      </Container>
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.5,
        }}
      ></Box> */}
    </>
  );
}

export default DetailPage;
