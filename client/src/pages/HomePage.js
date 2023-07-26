import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/layout";
import { Carousel } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
// import Carous from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import elc from "../images/electronics.jpg";
import book from "../images/books.jpg";
import game from "../images/game.jpg";
import beauty from "../images/beauty.jpg";
import Grid from "@mui/material/Grid";
import { getCategories } from "../utils/getCaterogies";
import Spinner from "../components/Spinner";
import { createSearchParams, useNavigate } from "react-router-dom";

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 5,
//     slidesToSlide: 4, // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 2, // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1, // optional, default to 1.
//   },
// };
export const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [categories, setcategories] = useState([]);
  const navigate = useNavigate();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    getCategories(setcategories);
  }, []);
  const handleClick = (e) => {
    navigate({
      pathname: "/products",
      search: createSearchParams({ category: e.target.value }).toString(),
    });
  };
  return (
    <>
      <Layout>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            minHeight: "87.1vh",
            flexDirection: "column",
          }}
        >
          <Carousel
            indicators={false}
            data-bs-theme="dark"
            style={{ zIndex: 0, width: "80%" }}
            interval={4000}
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <div className="pickgradient">
                <img className="d-block w-100" src={elc} alt="First slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="pickgradient">
                <img className="d-block w-100" src={book} alt="Second slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="pickgradient">
                <img className="d-block w-100" src={game} alt="Third slide" />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="pickgradient">
                <img className="d-block w-100" src={beauty} alt="First slide" />
              </div>
            </Carousel.Item>
          </Carousel>

          <Grid
            container
            style={{
              zIndex: 1,
              padding: "10px",
              width: "80%",
              marginTop: "-20%",
            }}
          >
            {categories ? (
              categories.map((cat, idx) => (
                <Grid
                  key={idx}
                  md={6}
                  lg={4}
                  style={{ padding: "10px" }}
                >
                  <Card
                    sx={{
                      padding: "20px",
                      height: "420px",
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="titleCat"
                    >
                      {cat?.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="300"
                      image={
                        process.env.REACT_APP_API +
                          `/categoryimages/${cat?.image}` || elc
                      }
                    />
                    <CardActions
                      className="textAction"
                      style={{ marginLeft: "-10px" }}
                    >
                      <Button
                        value={cat.name}
                        onClick={handleClick}
                        size="small"
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                        }}
                      >
                        See more
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Spinner />
            )}
            {/* <Grid
              lg={12}
              style={{
                backgroundColor: "white",
                padding: "20px 0px",
                marginBottom: "2%",
              }}
            >
              <Typography
                style={{ paddingLeft: "10px" }}
                gutterBottom
                variant="h5"
                component="div"
                className="titleCat"
              >
                New Trending
              </Typography>
              <Carous
                responsive={responsive}
                ssr={true}
                infinite={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType="dekstop"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Card
                    sx={{
                      maxWidth: 340,
                      padding: "10px",
                      border: "none",
                      height: "320px",
                    }}
                  >
                    <CardMedia
                      style={{ backgroundColor: "#F7F7F7" }}
                      component="img"
                      alt="green iguana"
                      height="250"
                      image={""}
                    />
                    <Typography
                      variant="body2"
                      align="left"
                      color="text.secondary"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </Card>
                ))}
              </Carous>
            </Grid> */}
          </Grid>
        </div>
      </Layout>
    </>
  );
};
