import React, { useState } from "react";
import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function YearNavigation({ redirectToYearPage, books }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleYearClick = (year) => {
    if (year !== 2024) {
      setIsModalVisible(true); // Show the modal if the selected year is not 2024
    } else {
      redirectToYearPage(year); // Proceed with normal redirection if the year is 2024
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal when the user clicks close
  };

  return (
    <div className="ebook">
      <div className="title">
        <div className="emagazine">
          E-Magazine
        </div> 
        <div className="hdivider">
          <img src={ebooks.icons.HorizontalDivider} alt="" />
        </div>
      </div>
      <div className="year-wise">
        {books.map((e) => (
          <div className="year-wrapper" key={e.year}>
            <img src={e.img} alt={e.year} />
            <ViewAll
              text={e.year}
              width="10rem"
              padding="0.4rem 2rem"
              onClick={() => handleYearClick(e.year)} // Call the new function on year click
            />
          </div>
        ))}
      </div>

      {/* MUI Modal */}
      <Modal
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
      </Modal>
    </div>
  );
}
