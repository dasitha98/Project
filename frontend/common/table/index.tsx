import * as React from "react";
import styles from "./index.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CiSearch } from "react-icons/ci";

export default function TableWithFields({
  feilds,
  data,
  isUpdateModal,
  setUpdateModal,
  setRow,
}: any) {
  const [searchQuery, setSearchQuery] = React.useState<any>("");

  const handleSearchChange = (value: any) => {
    setSearchQuery(value);
  };

  const filterRows = (data: any) => {
    return data.filter((row: any) =>
      feilds.some((field: any) => {
        if (row[field] !== null) {
          return row[field]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toString().toLowerCase());
        }
      })
    );
  };

  const columns = [
    ...feilds.map((field: any) => ({
      field: field,
      headerName: field,
      width: 150,
    })),
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <strong>
          <div
            className={styles.action}
            onClick={() => {
              setUpdateModal(true), setRow(params.row);
            }}
          >
            ...
          </div>
        </strong>
      ),
    },
  ];

  // const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(
  //   initialColumnVisibilityModel
  // );

  // const handleColumnVisibilityChange = (newModel: any) => {
  //   setColumnVisibilityModel(newModel);
  // };

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <div className={styles.saerchOption}>
          <CiSearch className={styles.searchIcon} />
          <div className={styles.searchText}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search..."
              style={{ marginBottom: 10 }}
            />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <DataGrid
          rows={filterRows(data)}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          // columnVisibilityModel={columnVisibilityModel}
          // onColumnVisibilityModelChange={handleColumnVisibilityChange}
          pageSizeOptions={[6]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
