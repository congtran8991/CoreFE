import { Box } from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { memo, useCallback, useRef } from "react";
import PortalHandle from "../../utils/portal";
import FormAddGroupDataset from "./Form";
import {
  useDatasetGroup,
  useMutationDeleteGroupDataset,
} from "@hooks/groupDatasets";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

console.log(">>> HMR Diagnostic - File Loaded At:", new Date().toLocaleTimeString());
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import FormPermission from "./Form.Permission";
import ConfirmDelete from "@component/dialog/ConfirmDelete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useUser } from "@hooks/user";
import { KColors } from "@constants-libs";
import { KButtons, KContainer, KInput } from "@uikit";
import MenuIcon from "@mui/icons-material/Menu";

const ListGroupDataset = () => {
  const { data } = useDatasetGroup();
  const { data: user } = useUser();

  const { mutate: deleteGroupDatasetMutation } =
    useMutationDeleteGroupDataset();

  const divRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const showPermission = useCallback((item: any) => {
    PortalHandle.popup.open({
      title: "Phân quyền",
      content: () => {
        return <FormPermission item={item} />;
      },
      maxWidth: "md",
    });
  }, []);

  const showFormGroupDataset = useCallback((item?: any) => {
    PortalHandle.popup.open({
      title: !item ? "Add Pipeline Name" : "Edit Pipeline Name",
      content: () => {
        return <FormAddGroupDataset item={item} />;
      },
      maxWidth: "sm",
    });
  }, []);

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "",
      label: "ACTION",
      options: {
        customBodyRender: (value, rowData) => {
          const _item = data[rowData.rowIndex];
          const isShowPermission =
            _item?.created_by_user?.id === user?.id || user?.is_super_admin;
          return (
            <Box display="flex">
              <div
                key={rowData.rowIndex}
                ref={(el) => {
                  divRefs.current[rowData.rowIndex] = el;
                }}
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  PortalHandle.popper.open({
                    anchorEl: divRefs.current[rowData.rowIndex],
                    title: "Xác nhận xoá",
                    maxWidth: "xs",
                    content: (dismiss) => {
                      return (
                        <ConfirmDelete
                          onClose={dismiss}
                          onConfirm={() => {
                            deleteGroupDatasetMutation([_item?.id]);
                          }}
                          content="Delete Pipeline?"
                        />
                      );
                    },
                  });
                }}
              >
                <DeleteOutlineOutlinedIcon color="error" />
              </div>

              <Box
                marginRight="0.5rem"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  showFormGroupDataset(_item);
                }}
              >
                <EditOutlinedIcon color="primary" />
              </Box>

              {isShowPermission && (
                <Box
                  marginRight="0.5rem"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    showPermission(_item);
                  }}
                >
                  <PortraitOutlinedIcon sx={{ color: "#cb8609" }} />
                </Box>
              )}
            </Box>
          );
        },
      },
    },
    {
      label: "Pipeline Name",
      name: "name",
      options: {
        customBodyRender: (value, rowData) => {
          const _item = data[rowData.rowIndex];
          return <Link to={`./${_item.id}/pipeline-version`}>{value}</Link>;
        },
        filter: true,
        sort: false,
      },
    },
    {
      label: "Latest Version",
      name: "latest_version",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Created By",
      name: "created_by_user",
      options: {
        customBodyRender: (v) => {
          return v?.email;
        },
        filter: true,
        sort: false,
      },
    },
  ];

  return (
    <>
      <KContainer.Card
        header={{
          title: "Group 177sd4e3tds14d77799",
          border: true,
          color: "#cb8609",
          bgColorIcon: "#cb8609",
          fontWeight: "bold",
          icon: MenuIcon,
        }}
        size="md"
      >
        <MUIDataTable
          title={
            <Box display={"flex"}>
              <Box
                marginRight={1}
                fontFamily={"times"}
                fontWeight={"bold"}
                fontSize={"1.5rem"}
                // color={"#cb8609"}
                color={KColors.primary.mild}
                display={"flex"}
                alignItems={"center"}
              >
                <KContainer.View
                  // color={KColors.primary.moderate}
                  color={KColors.primary.moderate}
                >
                  Pipelines0
                </KContainer.View>
                <Box
                  marginLeft={"0.5rem"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    showFormGroupDataset();
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
      </KContainer.Card></>
  );
};

export default ListGroupDataset;
