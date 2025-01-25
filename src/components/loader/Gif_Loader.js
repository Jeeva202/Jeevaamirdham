import React from "react";

const Gif_Loader = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full height
        }}>
            <img 
                src="/assets/images/loader_gif.gif" // Update this path to your actual GIF file location
                alt="Loading..."
                style={{ width: "10rem", height: "13rem" }} // Adjust size as needed
            />
        </div>
    );
};

export default Gif_Loader;
