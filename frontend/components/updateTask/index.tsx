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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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

export const UpdateTask = ({
  isUpdateModal,
  setUpdateModal,
  isRow,
  setActionCall,
  isActionCall,
}: any) => {
  const [isFieldData, setFieldData] = React.useState<any>({
    name: null,
    description: null,
    status: null,
  });
  const handleClose = () => setUpdateModal(false);

  useEffect(() => {
    setFieldData({
      name: isRow.name,
      description: isRow.description,
      status: isRow.status,
    });
  }, [isRow]);

  const Update = async () => {
    if (!isFieldData.name || !isFieldData.description || !isFieldData.status) {
      return;
    }

    try {
      const requestOptions = {
        method: "PUT",
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

      const response = await axios.put(
        `http://localhost:5000/task/${isRow.id}`,
        body,
        requestOptions
      );
      if (response && response.data) {
        handleClose();
        setActionCall(!isActionCall);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const Delete = async () => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${newToken}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const response = await axios.delete(
        `http://localhost:5000/task/${isRow.id}`,
        requestOptions
      );
      if (response && response.data) {
        handleClose();
        setActionCall(!isActionCall);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className={styles.main}>
      <Modal
        open={isUpdateModal}
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
              Update Task
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

            <Stack alignItems="flex" sx={{ mt: 3 }}>
              <Stack display="flex-end" sx={{ mt: 3 }}>
                <Button onClick={() => Update()} className={styles.button}>
                  Update
                </Button>
                <Button onClick={() => Delete()} className={styles.button}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Modal>
    </div>
  );
};
