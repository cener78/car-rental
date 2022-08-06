import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { downloadReservations, getReservations } from "../../../api/admin-reservation-service";

const AdminReservations = () => {
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const resp = await downloadReservations();
      fileDownload(resp.data, "reservations.xlsx");
      
    } catch (err) {
      console.log(err);
    }
    finally{
      setDownloading(false);
    }

  };

  const loadData = async () => {
    try {
      const resp = await getReservations();
      setReservations(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      name: "Car",
      selector: (row) => row.car.model,
      sortable: true,
    },
    {
      name: "Pick Up",
      selector: (row) => row.pickUpLocation,
      sortable: true,
    },
    {
      name: "Drop Off",
      selector: (row) => row.dropOfLocation,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.totalPrice,
      sortable: true,
      format: (row)=> `$ ${row.totalPrice.toLocaleString()}`
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const handleEdit = (row) => {
    navigate(`/admin/reservations/${row.id}`);
  };

  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading && <Spinner animation="border" size="sm" />}
          Download List
        </Button>
      </ButtonGroup>

      <DataTable
        title="Reservations"
        columns={columns}
        data={reservations}
        progressPending={loading}
        pagination
        onRowClicked={handleEdit}
      />
    </div>
  );
};

export default AdminReservations;
