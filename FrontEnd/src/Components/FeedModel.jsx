import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styleForFeedModel from "./Login.module.css";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { inserData } from "../Redux/action";
import moment from "moment";
import dayjs from 'dayjs';

export default function FeedModel({
  handleCloseModel,
  sendMessageToEdit,
  sendDateToEdit,
}) {
  const dispatch = useDispatch();

  const storedLoginDetails = JSON.parse(localStorage.getItem("reduxState"));

  const [textContent, setTextContent] = useState(
    sendMessageToEdit !== "" ? sendMessageToEdit : ""
  );
  const [date, setDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateToDisplay , setDateToDisplay ] = useState(null);

  const handleDateChange = (e) => {
      const Currentdate = new Date(e.$d);
      const pad = "00";
      const yy = Currentdate.getFullYear().toString();
      const mm = (Currentdate.getMonth() + 1).toString();
      const dd = Currentdate.getDate().toString();
      setDate(`${(pad + dd).slice(-2)}/${(pad + mm).slice(-2)}/${yy}`);
  };

  useEffect(() => {
    if(sendDateToEdit !== "") {
      setDateToDisplay(moment(sendDateToEdit , "DD/MM/YYYY").format("MM/DD/YYYY"));
      setDate(moment(sendDateToEdit , "DD/MM/YYYY").format("DD/MM/YYYY"));
    } else {
      setDateToDisplay(null);
    }
  } , [sendDateToEdit] )

  // console.log("setDateToDisplay => " , dateToDisplay);
  console.log("dateToDisplay => " , dateToDisplay);

  const handleSubmitButton = () => {
    if (date !== null && textContent !== "") {
      dispatch(
        inserData({
          email: storedLoginDetails.loginDetails.email,
          name: storedLoginDetails.loginDetails.name,
          data: [
            {
              date: date,
              content: textContent,
            },
          ],
        })
      );

      handleCloseModel();
    } else {
      setErrorMessage("Date and text can't be empty");
    }
  };
  return (
    <>
      <p className={styleForFeedModel.feederTopHeader}>write your content</p>
      <div className={styleForFeedModel.feedModel}>
        <div className={styleForFeedModel.dataPickerButton}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
              <DatePicker
                disableFuture
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    helperText: 'MM/DD/YYYY',
                  },
                }}
                value={dateToDisplay !== null ? dayjs(dateToDisplay, 'MM/DD/YYYY') : null}
                views={["year", "month", "day"]}
              />
            </LocalizationProvider>
  
        </div>

        <div style={{ paddingRight: "5px" }}>
          <textarea
            onChange={(e) => setTextContent(e.target.value)}
            rows="15"
            cols="50"
            className={styleForFeedModel.textareaStyle}
            value={textContent}
          />
        </div>
        {errorMessage !== "" && (
          <p style={{ color: "red", fontWeight: "400" }}>{errorMessage}</p>
        )}
        <div className={styleForFeedModel.feedButtonModel}>
          <Button
            variant="contained"
            style={{ background: "#1F1D2B", color: "#fff", fontWeight: "400" }}
            onClick={handleSubmitButton}
          >
            save
          </Button>

          <Button
            variant="contained"
            style={{
              marginLeft: "10px",
              background: "#1F1D2B",
              color: "#fff",
              fontWeight: "400",
            }}
            onClick={handleCloseModel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
