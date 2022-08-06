import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { downloadVehicles } from "../../../api/admin-vehicle-service";
import { getVehicles } from "../../../api/vehicle-service";

const AdminVehicles = () => {
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const resp = await downloadVehicles();
      fileDownload(resp.data, "vehicles.xlsx");
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await getVehicles();
      setVehicles(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Price/hour",
      selector: (row) => row.pricePerHour,
      sortable: true,
      format: (row) => `$${row.pricePerHour.toLocaleString()}`
    }
  ];

  const handleEdit = (row) => {
    navigate(`/admin/vehicles/${row.id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/vehicles/new">
          New Vehicle
        </Button>
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
        title="Vehicles"
        columns={columns}
        data={vehicles}
        progressPending={loading}
        pagination
        onRowClicked={handleEdit}
      />
    </div>
  );
};

export default AdminVehicles;
