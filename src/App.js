import React, { useState } from "react";
import useTable from "./GetTable";
import db from "./firebase.js";
import PageHeader from "./PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Button,
} from "@material-ui/core";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px",
    padding: "10px",
    margin: "10px",
  },
  searchInput: {
    width: "35%",
  },
}));

const headCells = [
  { id: "SlNoHeading", label: "Sl No." },
  { id: "name", label: "Customer Name " },
  { id: "email", label: "Customer Email" },
  { id: "query", label: "Customer Query" },
];

function App() {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    db.collection("contact-form")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setRecords((arr) => [...arr, data]);
        });
      });
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleRefresh = () => {
    setRecords([]);
    db.collection("contact-form")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setRecords((arr) => [...arr, data]);
        });
      });
  };
  return (
    <>
      <PageHeader
        title="PORTFOLIO CONTACT QUERY"
        subTitle="Aadhar Kulshrestha"
        icon={<AssignmentTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Button
            style={{
              marginLeft: "90%",
              borderRadius: 15,
              height: "70%",
              fontSize: "18px",
            }}
            color="primary"
            variant="contained"
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.question}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
}

export default App;
