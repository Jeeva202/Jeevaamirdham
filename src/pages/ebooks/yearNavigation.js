import React, { useState, useEffect } from "react";
import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
import { Loader } from "../../components/loader/loader";
import { useQuery } from "react-query";

import axios from "axios";
export default function YearNavigation({ redirectToYearPage }) {

  const fetchMagazines = async () => {
    const response = await axios.get(process.env.REACT_APP_URL + '/emagazine-page/magazine-yearwise');
    return response.data.reverse(); // Reverse the data here to match your original behavior
  };

  const { data: magazines, isLoading, isError, error } = useQuery(
    ['magazines', 'yearwise'],  
    fetchMagazines, 
    {
      staleTime: 60000, // Optional: cache the data for 1 minute (60000ms) before refetching
      cacheTime: 300000, // Optional: keep the data cached for 5 minutes (300000ms) after it's unused
    }
  );
  const handleYearClick = (year) => {

      redirectToYearPage(year); // Proceed with normal redirection if the year is 2024

  };


  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="ebook">
      <div className="title">
        <div className="emagazine">
          E-Magazine by Years
        </div> 
        {/* <div className="hdivider">
          <img src={ebooks.icons.HorizontalDivider} alt="" />
        </div> */}
      </div>
      <div className="year-wise">
        {magazines.map((e) => (
          <div onClick={() => handleYearClick(e.year)} className="year-wrapper" key={e.year} data-year={e.year}>
            <img src={e.imgUrl} alt={e.year} />
            {/* <ViewAll
              // text={e.year}
              width="10rem"
              padding="0.4rem 2rem"
               // Call the new function on year click
            /> */}
          </div>
        ))}
      </div>

      {/* MUI Modal */}
      {/* <Modal
        open={isModalVisible}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}>
          <h2 id="modal-title">Updating Soon...</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={closeModal}
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal> */}
    </div>
  );
}
