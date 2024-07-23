import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { TbBorderRadius } from "react-icons/tb";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Fab from "@mui/material/Fab";
import Image from "next/image";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
};

export const CreateTask = ({ setActionCall, isActionCall }: any) => {
  const [open, setOpen] = React.useState(false);
  const [isFieldData, setFieldData] = React.useState<any>({
    name: null,
    description: null,
    status: null,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Submit = async () => {
    if (!isFieldData.name || !isFieldData.description || !isFieldData.status) {
      return;
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const body = {
        name: isFieldData.name,
        description: isFieldData.description,
        status: isFieldData.status,
      };

      const response = await axios.post(
        `http://localhost:5000/task`,
        body,
        requestOptions
      );
      if (response && response.data) {
        handleClose();
        setActionCall(!isActionCall);
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      setFieldData({
        name: null,
        description: null,
        status: null,
      });
    }
  }, [open]);

  return (
    <div className={styles.main}>
      <Button
        style={{
          textTransform: "none",
          backgroundColor: "rgb(247, 243, 243)",
          color: "#6a726c",
          marginBottom: "20px",
        }}
        onClick={handleOpen}
      >
        Add Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style} component="form" className={styles.box}>
          <Card className={styles.card}>
            <Typography
              sx={{ mb: 4 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add Task
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <TextField
                // error={isFieldData.membership === null ? true : false}
                id="outlined-required"
                // id="outlined-error-helper-text"
                label="Name"
                // helperText="Incorrect entry."
                value={isFieldData.name}
                onChange={(e) =>
                  e.target.value === ""
                    ? setFieldData({ ...isFieldData, name: null })
                    : setFieldData({
                        ...isFieldData,
                        name: e.target.value,
                      })
                }
              />
              <TextField
                // error={isFieldData.vat === null ? true : false}
                id="outlined-required"
                // id="outlined-error-helper-text"
                label="Description"
                // helperText="Incorrect entry."
                value={isFieldData.description}
                onChange={(e) =>
                  e.target.value === ""
                    ? setFieldData({ ...isFieldData, description: null })
                    : setFieldData({
                        ...isFieldData,
                        description: e.target.value,
                      })
                }
              />
              <TextField
                // error={isFieldData.vat === null ? true : false}
                id="outlined-required"
                // id="outlined-error-helper-text"
                label="Status"
                // helperText="Incorrect entry."
                value={isFieldData.status}
                onChange={(e) =>
                  e.target.value === ""
                    ? setFieldData({ ...isFieldData, status: null })
                    : setFieldData({
                        ...isFieldData,
                        status: e.target.value,
                      })
                }
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button onClick={() => Submit()} className={styles.button}>
                Submit
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Modal>
    </div>
  );
};
