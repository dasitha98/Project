"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import { RiMenu3Fill, RiMoneyDollarBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { MenuOptions } from "../menu/menuOption";
import { FaUsersGear } from "react-icons/fa6";
import { MdElevator, MdOutlineSubscriptions, MdPayment } from "react-icons/md";
import { TbReportSearch, TbWorldOff, TbWorldSearch } from "react-icons/tb";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { ProfileModal } from "./profileModal";

type Anchor = "top" | "left" | "bottom" | "right";

export const AppBar = () => {
  const pathname = usePathname();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  console.log("router", pathname);

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3 className={styles.heading}>Menu</h3>
      <List className={styles.listDiv}>
      </List>
    </Box>
  );

  return (
    <div className={styles.main}>
      <div className={styles.innerMain}>
        <div className={styles.leftDiv}>
          <RiMenu3Fill
            className={styles.menuIcon}
            onClick={toggleDrawer("left", true)}
          />
        </div>
        <div className={styles.rightDiv}>
          <ProfileModal />
        </div>
      </div>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
};
