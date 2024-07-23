import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useGetUsersQuery } from "@/features/users/apiUsers";
import styles from "./index.module.css";
import { AppBar } from "@/common/appBar";
import CardItem from "@/common/card";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const { data, isLoading, error } = useGetUsersQuery({});

  return (
    <div className={styles.main}>
      <div className={styles.mainTop}>
        <AppBar />
      </div>
      <div className={styles.content}>
        {isLoading === true ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.gridcontainer}>
            {data &&
              data.map((data:any,key:any) => (
                <div key={key} className={styles.card}>
                  <CardItem data={data}/>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
