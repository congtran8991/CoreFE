import { Box, Card } from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { memo, useCallback } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useGetListUser } from "@hooks/user";
import PortalHandle from "@utils/portal";
import FormUser from "./Form";

const ListUser = () => {
  const { data } = useGetListUser();

  // const btnRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "",
      label: "ACTION",
      options: {
        customBodyRender: (value, rowData) => {
          const _item = data[rowData.rowIndex];
          return (
            <Box
              marginRight="0.5rem"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                showFormUser(_item);
              }}
            >
              <EditOutlinedIcon color="primary" />
            </Box>
          );
        },
      },
    },
    {
      label: "EMAIL",
      name: "email",
    },
    {
      label: "ADMIN",
      name: "is_super_admin",
      options: {
        customBodyRender: (value) => {
          return value.toString();
        },
      },
    },
    {
      label: "ACTIVE",
      name: "is_active",
      options: {
        customBodyRender: (value) => {
          return value.toString();
        },
      },
    },
  ];

  const showFormUser = useCallback((item?: any) => {
    PortalHandle.popup.open({
      title: !item ? "Add User" : "Edit User",
      content: () => {
        return <FormUser item={item} />;
      },
      maxWidth: "sm",
    });
  }, []);

  return (
    <Card sx={{ margin: 1 }}>
      <MUIDataTable
        title={
          <Box display={"flex"}>
            <Box
              marginRight={1}
              fontFamily={"times"}
              fontWeight={"bold"}
              fontSize={"1.5rem"}
              color={"#cb8609"}
              display={"flex"}
              alignItems={"center"}
            >
              <Box>User Management</Box>
              <Box
                marginLeft={"0.5rem"}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  showFormUser();
                }}
              >
                <AddBoxOutlinedIcon
                  fontSize={"large"}
                  sx={{ color: "#ff79c6" }}
                />
              </Box>
            </Box>
          </Box>
        }
        data={data}
        columns={columns}
        options={{
          selectableRowsHideCheckboxes: true,
          filterType: "checkbox",
          search: "false",
          print: "false",
          viewColumns: "false",
          filter: "false",
          download: "false",
        }}
      />
    </Card>
  );
};

export default memo(ListUser);
