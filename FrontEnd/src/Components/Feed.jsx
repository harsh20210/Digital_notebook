import React, { useEffect, useState } from "react";
import styleForFeed from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllDataAPI, deleteApi, logout } from "../Redux/action";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FeedModel from "./FeedModel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LogoutIcon from "@mui/icons-material/Logout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  minHeigth: 700,
  bgcolor: "#edecfe",
  boxShadow: 24,
  overflow: "hidden",
  overflowY: "auto",
  borderRadius: "5px",
};

const TextFieldData = ({ textData }) => {
  const [open, setOpen] = useState(false);

  const divStyle = {
    width: `calc(100% - 5%)`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          color: "#fff",
        }}
      >
        <div
          className={
            open
              ? styleForFeed.displayNone
              : styleForFeed.textDataBeforeCollapse
          }
        >
          {textData}
        </div>
        <div
          style={
            open
              ? { position: "absolute", right: "10px", paddingTop: "20px" }
              : { position: "absolute", right: "10px" }
          }
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon style={{ color: "#fff" }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: "#fff" }} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={styleForFeed.textFieldAftercollapse}>{textData}</div>
      </Collapse>
    </>
  );
};

export default function Feed() {
  const { allData } = useSelector((state) => state.data);

  const storedLoginDetails = JSON.parse(localStorage.getItem("reduxState"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [displayHidden, setdisplayHidden] = useState("none");

  const [sendMessageToEdit, setSendMessageToEdit] = useState("");
  const [sendDateToEdit, setSendDateToEdit] = useState("");

  const date = new Date();

  const getApi = () => {
    dispatch(getAllDataAPI({ email: storedLoginDetails.loginDetails.email }));
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleDeleteCommand = (date) => {
    dispatch(
      deleteApi({ email: storedLoginDetails.loginDetails.email, date: date })
    );
  };

  const handleOpenModel = () => {
    setOpen(!open);
    setSendMessageToEdit("");
    setSendDateToEdit("");
  };

  const handleEditOpenOrCloseModel = (data) => {
    setOpen(!open);
    setSendMessageToEdit(data.content);
    setSendDateToEdit(data.date);
  };

  const handleLogoutButton = () => {
    dispatch(
      logout({ email: storedLoginDetails.loginDetails.email }, () => {
        window.location.replace("/");
        localStorage.clear();
      })
    );
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styleForFeed.feedModelBox}>
          <FeedModel
            handleCloseModel={handleOpenModel}
            sendMessageToEdit={sendMessageToEdit}
            sendDateToEdit={sendDateToEdit}
          />
        </Box>
      </Modal>

      <div className={styleForFeed.topContainer}>
        <div className={styleForFeed.textInHeader}>
          <div
            className={styleForFeed.logo}
            style={{
              background: "#ffc965",
            }}
            onMouseEnter={() => setdisplayHidden("block")}
            onMouseLeave={() => setdisplayHidden("none")}
          >
            <div className={styleForFeed.logoName}>
              {storedLoginDetails.loginDetails.name.substring(0, 1)}
            </div>
            <div
              className={styleForFeed.logout}
              style={{ display: displayHidden }}
              onClick={handleLogoutButton}
            >
              <p>Logout</p>
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            {storedLoginDetails.loginDetails.name}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#fff",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <p className={styleForFeed.currentDate}>
              Current Date: {moment(date).format("DD MMM YYYY")}
            </p>
            <p>
              <LogoutIcon
                onClick={handleLogoutButton}
                style={{ color: "red", paddingTop: "8px", cursor: "pointer" }}
              />
            </p>
          </div>
        </div>
      </div>

      <div className={styleForFeed.secondContainer}>
        <div className={styleForFeed.feedDescriptionRow}>
          {allData.map((value, index) => {
            return (
              <div className={styleForFeed.feedBlock} key={index}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontWeight: "600", color: "#fff" }}>
                    {moment(value.date, "DD/MM/YYYY").format("DD MMM YYYY")}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <EditNoteIcon
                      className={styleForFeed.editIcons}
                      onClick={() => handleEditOpenOrCloseModel(value)}
                    />
                    <DeleteIcon
                      className={styleForFeed.deleteIcons}
                      onClick={() => handleDeleteCommand(value.date)}
                    />
                  </div>
                </div>
                <Divider
                  style={{
                    margin: "10px 0",
                    background: "rgb(255 255 255 / 12%)",
                  }}
                />
                <TextFieldData textData={value.content} />
              </div>
            );
          })}
          {allData.length === 0 && (
            <div className={styleForFeed.feedBlock}>
              <p style={{ color: "red", fontSize: "16px", fontWeight: "600" }}>
                No Data Found!
              </p>
            </div>
          )}
        </div>
      </div>

      <Fab
        sx={fabStyle}
        aria-label="Edit"
        style={{ color: "#fff", background: "#ffbb40" }}
      >
        <EditIcon onClick={handleOpenModel} />
      </Fab>
    </>
  );
}
