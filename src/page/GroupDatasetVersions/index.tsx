import { Box, Button, Card, Stack } from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { memo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDatasetVersionsByGroupDataset,
  useMutationDeleteGroupDatasetVersion,
  useMutationUpdateDatasetVersion,
} from "@hooks/groupDatasets";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PortalHandle from "@utils/portal";
import ConfirmDeleteDialog from "@component/dialog/ConfirmDelete";
import { KInput } from "@uikit";

const groupDatasetDetail = () => {
  const navigate = useNavigate();

  const { groupDatasetId = "" } = useParams();
  const { data = [] } = useDatasetVersionsByGroupDataset(groupDatasetId);

  const { mutate: deleteMutation } =
    useMutationDeleteGroupDatasetVersion(groupDatasetId);

  const { mutate: updateMutation } =
    useMutationUpdateDatasetVersion(groupDatasetId);

  const divRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const divUpdateRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const columns: MUIDataTableColumnDef[] = [
    {
      label: "Action",
      name: "",
      options: {
        customBodyRender: (value, rowData) => {
          const _item = data[rowData.rowIndex];
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
                        <ConfirmDeleteDialog
                          onClose={dismiss}
                          onConfirm={() => {
                            deleteMutation({
                              ids: [_item?.id],
                            });
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

              <div
                key={rowData.rowIndex}
                ref={(el) => {
                  divUpdateRefs.current[rowData.rowIndex] = el;
                }}
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  PortalHandle.popper.open({
                    anchorEl: divUpdateRefs.current[rowData.rowIndex],
                    title: "Update",
                    maxWidth: "xs",
                    content: (dismiss) => {
                      return (
                        <UpdateNote
                          onClose={dismiss}
                          onConfirm={(note) => {
                            updateMutation({
                              id: _item?.id,
                              note,
                            });
                          }}
                        />
                      );
                    },
                  });
                }}
              >
                <EditOutlinedIcon color="primary" />
              </div>
            </Box>
          );
        },
      },
    },
    {
      label: "Pipeline Name",
      name: "group_datasets",
      options: {
        customBodyRender: (v) => {
          return v?.name;
        },
        filter: true,
        sort: false,
      },
    },
    {
      label: "Version",
      name: "version",
      options: {
        customBodyRender: (value, rowData) => {
          const _item = data[rowData.rowIndex];
          return <Link to={`./${_item.id}`}>{value}</Link>;
        },
        filter: true,
        sort: false,
      },
    },
    {
      label: "Active",
      name: "active",
      options: {
        customBodyRender: (v) => {
          return `${v}`;
        },
        filter: true,
        sort: false,
      },
    },
    {
      label: "Note",
      name: "note",
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
              <Box>Pipelines Version</Box>
              <Box
                marginLeft={"0.5rem"}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("./new");
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
          filterType: "checkbox",
          selectableRowsHideCheckboxes: true,
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

export default memo(groupDatasetDetail);

interface IProps {
  onClose: () => void;
  onConfirm: (v: string) => void;
}

export const UpdateNote = (props: IProps) => {
  const { onConfirm, onClose } = props;
  const [note, setNote] = useState<string>("");
  return (
    <Box width={250} borderRadius={"10%"}>
      <Box>
        <KInput.Base
          label="Note"
          value={note}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNote(e.target?.value);
          }}
          horizontal={false}
        />
      </Box>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        marginTop="1rem"
      >
        <Button
          variant="outlined"
          size="small"
          onClick={onClose}
          sx={{ minWidth: 100 }}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            onConfirm(note);
          }}
          sx={{ minWidth: 130 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};
