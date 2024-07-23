import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { FaUsersGear } from "react-icons/fa6";
import { MdElevator, MdPayment } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { TbReportSearch, TbWorldOff, TbWorldSearch } from "react-icons/tb";
import Link from "next/link";

import { redirect } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

export const MenuOptions = () => {
  return (
    <>
      <div className={styles.main}>
        <h3 className={styles.heading}>OVERVIEW</h3>
        <div className={styles.iconDiv}>
          <FaUsersGear className={styles.userIcon} />
          <h6 className={styles.iconName}>Product</h6>
        </div>
      </div>
    </>
  );
};
