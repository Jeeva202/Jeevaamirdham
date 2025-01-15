import React, { useState } from "react";
import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

export default function MonthNavigation({ backToAllYearPage, selectedYear, oneYearBook, redirectToMonthPage }) {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMonthClick = (month) => {
    // if (month !== "November") {
    //   setIsModalVisible(true); // Show the modal if the selected month is not November
    // } else {
      redirectToMonthPage(month); // Proceed with normal redirection if the month is November
    // }
  };

  // const closeModal = () => {
  //   setIsModalVisible(false); // Close the modal when the user clicks close
  // };

  return (
    <>
      <div className="Year-navigation">
        <a className="back" onClick={() => backToAllYearPage()}>
          E-MAGAZINE
        </a>
        <img src={ebooks.icons.RightArrowStroke} alt="" />
        <div className="year">
          {selectedYear}
        </div>
      </div>
      <div className="ebooks-one-year">
        <div className="month-wise">
          {oneYearBook.map((e) => (
            <div className="month-wrapper" key={e.month}>
              <img src={e.imgUrl} alt={e.month} />
              <ViewAll
                text={e.month_eng + " " + selectedYear}
                width="11rem"
                onClick={() => handleMonthClick(e.month_eng)} // Call the new function on month click
              />
            </div>
          ))}
        </div>
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
    </>
  );
}
