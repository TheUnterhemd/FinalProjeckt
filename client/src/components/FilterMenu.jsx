import { useState } from "react";
import MapTest from "./map/Map";
import SortMenu from "./SortMenu";
import { Box, Button, Typography, Slider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FilterMenu = ({ setFilter, data }) => {
  const [showFilters, setShowFilters] = useState(false);

  //filter toggle
  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  //func for slider (popup)value
  const valueText = (value) => {
    return `${value}€`;
  };
  console.log("data in filtermenü", data);
  return (
    <>
      <Button variant="outlined" onClick={toggleFilter} sx={{ m: 1 }}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      <SortMenu />
      {showFilters && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "80%",
            }}
          >
            {data && <MapTest markerOptions={data.courses} />}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={{ marginRight: 1 }}>Price:</Typography>
              <Slider
                aria-label="Price"
                defaultValue={100}
                step={10}
                max={500}
                sx={{ width: "60%" }}
                valueLabelDisplay="auto"
                valueLabelFormat={valueText}
                onChange={(e) => setFilter.setPrice(e.target.value)}
              />
              <DatePicker
                label="Start Date"
                views={["month", "day"]}
                sx={{ margin: 1 }}
                format="DD/MM/YYYY"
                onChange={(newValue) => setFilter.setDate(newValue)}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FilterMenu;
