import React, { useState } from "react";
import styles from "./index.module.css";
import Avatar from "@mui/material/Avatar";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export const ProfileModal = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className={styles.main}>
      <Avatar
        sx={{
          width: "30px",
          height: "30px",
        }}
        onClick={(event) => handleClick(event)}
        src="/broken-image.jpg"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className={styles.popover}
      >
        <Typography sx={{ p: 2 }}>
          <div className={styles.text}>Logout</div>
        </Typography>
      </Popover>
    </div>
  );
};
