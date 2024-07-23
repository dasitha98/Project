import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./index.module.css";
import CircularProgress from "@mui/material/CircularProgress";

import TableWithFields from "../../common/table";
import { AppBar } from "@/common/appBar";
import { CreateTask } from "@/components/createTask";
import { UpdateTask } from "@/components/updateTask";

export default function Home() {
  const [isActionCall, setActionCall] = useState<boolean>(false);
  const [isUpdateModal, setUpdateModal] = useState<boolean>(false);
  const [isRow, setRow] = useState<any>({});
  const [membershipData, setMembershipData] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [dataField, setDataField] = useState<any>([]);
  const [dataFieldLenght, setDataFieldLenght] = useState<any>(0);

  let VISIBLE_FIELDS: any;
  const router = useRouter();

  useEffect(() => {
    if (data && data[0]) {
      VISIBLE_FIELDS = Object.keys(data[0]);
      setDataField(Object.keys(data[0]));
    }
  }, [data]);

  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, isLoading]);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${newToken}`,
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        };

        console.log("sjakfh 1");
        const response = await axios.get(
          `http://localhost:5000/task`,
          requestOptions
        );
        console.log("sjakfh", response.data);
        setData(response.data);
        setDataFieldLenght(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [isActionCall]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/membership`);
  //       setMembershipData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className={styles.main}>
      <div className={styles.mainTop}>
        <AppBar />
      </div>
      <div className={styles.addBtn}>
        <CreateTask
          setActionCall={setActionCall}
          isActionCall={isActionCall}
          membershipData={membershipData}
          dataFieldLenght={dataFieldLenght}
        />
      </div>
      <UpdateTask
        isUpdateModal={isUpdateModal}
        setUpdateModal={setUpdateModal}
        isRow={isRow}
        setActionCall={setActionCall}
        isActionCall={isActionCall}
        membershipData={membershipData}
      />
      <div className={styles.table}>
        {data && (
          <TableWithFields
            feilds={dataField}
            data={data}
            isUpdateModal={isUpdateModal}
            setUpdateModal={setUpdateModal}
            setRow={setRow}
          />
        )}
      </div>
    </div>
  );
}
