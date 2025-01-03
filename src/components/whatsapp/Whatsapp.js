import React from "react";
import Fab from "@mui/material/Fab";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = ({ phoneNumber }) => {
    const handleClick = () => {
        const message = encodeURIComponent(
          "Hi Jeevaamirdham, I would like to know more about your services."
        );
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        window.open(url, "_blank");
      };
  
  return (
    <Fab
      color="success"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366", // WhatsApp Green
        color: "white",
        "&:hover": {
          backgroundColor: "#1DA851", // Darker Green on hover
        },
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;
