import { Box, Button, Chip, Grid } from "@mui/material";
import { KWrapper } from "@uikit";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  defaultOutput,
  defaultStep,
  formatSteps,
  formatValueResponseDataset,
  IDatasets,
  StatusAction,
} from "../helpers";
import { memo, useCallback, useMemo } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  useDatasets,
  useMutationExportYamlDatasetVersion,
  useMutationSaveDatasets,
} from "@hooks/groupDatasets";
import { useParams } from "react-router-dom";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const ListDataset = () => {
  const { groupDatasetId = "", datasetVersionId = "" } = useParams();
  const { data } = useDatasets(groupDatasetId, datasetVersionId);

  const isEdit = !!datasetVersionId;
  const methods = useFormContext<IDatasets>();
  const { mutate: saveDatasetsMutation } = useMutationSaveDatasets();
  const { mutate: exportYaml, isPending } =
    useMutationExportYamlDatasetVersion(groupDatasetId);

  const { fields, remove } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "listDatasets", // unique name for your Field Array
    keyName: "datasetId",
  });

  const [
    datasetNameWatch,
    statusActionWatch,
    titleListDataset,
    listDatasetsWatch,
  ] = useWatch({
    control: methods.control,
    name: ["name", "statusAction", "titleListDataset", "listDatasets"],
  });

  const handleChooseDataset = useCallback(
    (status: StatusAction, item: any) => {
      const { input, output, steps } = item || {};
      const _item = formatValueResponseDataset({ input, output, steps });

      methods.setValue("statusAction", status);
      methods.setValue("oldName", item?.name ?? "");
      methods.setValue("name", item?.name ?? "");
      methods.setValue("input", {
        ...JSON.parse(JSON.stringify(_item?.input)),
      });
      methods.setValue("steps", _item.steps ?? [defaultStep]);
      methods.setValue("output", _item?.output ?? defaultOutput);
    },
    [methods]
  );

  const isExport = useMemo(() => {
    return JSON.stringify(data) === JSON.stringify(listDatasetsWatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, JSON.stringify(listDatasetsWatch)]);

  return (
    <KWrapper.CardAccordion
      title={titleListDataset}
      controls="list_data_set"
      expanded={true}
    >
      <Box display={"flex"}>
        {fields.map((_item, _index) => {
          return (
            <Box display={"flex"} key={_item?.datasetId}>
              <Chip
                key={_item?.id}
                sx={{
                  minWidth: "7rem",
                  marginRight: 2,
                  color: "#ff79c6",
                  fontFamily: "Times",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
                label={_item?.name}
                deleteIcon={
                  <Box display={"flex"}>
                    <Box
                      onClick={() => {
                        handleChooseDataset(StatusAction.EDIT, _item);
                      }}
                    >
                      <EditOutlinedIcon
                        fontSize={"small"}
                        style={{ color: "#cb8609" }}
                      />
                    </Box>
                    <Box
                      onClick={() => {
                        remove(_index);
                        methods.setValue("statusAction", StatusAction.ADD);
                      }}
                    >
                      <CloseOutlinedIcon
                        fontSize={"small"}
                        style={{ color: "#cd2020" }}
                      />
                    </Box>
                  </Box>
                }
                onDelete={() => {}}
              />
            </Box>
          );
        })}

        <Grid container spacing={2}>
          {statusActionWatch === StatusAction.EDIT && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                methods.setValue("statusAction", StatusAction.ADD);
              }}
              sx={{ marginRight: "0.75rem", textTransform: "lowercase" }}
            >
              Gỡ Edit{" "}
              <Box marginLeft={"0.5rem"} textTransform={"uppercase"}>
                {datasetNameWatch}
              </Box>
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              const finalData = fields.map((item) => {
                return {
                  ...item,
                  steps: formatSteps(item.steps, false),
                  output: !!item?.output ? item?.output : undefined,
                };
              });
              saveDatasetsMutation({
                list_dataset: finalData,
                group_dataset_id: groupDatasetId,
              });
            }}
            startIcon={<SaveOutlinedIcon />}
          >
            save
          </Button>

          <Button
            size="small"
            variant="contained"
            disabled={!isEdit}
            loading={isPending}
            onClick={() => {
              if (isExport) {
                return exportYaml({ datasetVersionId });
              }

              const finalData = fields.map((item) => {
                return {
                  ...item,
                  steps: formatSteps(item.steps, false),
                  output: !!item?.output ? item?.output : undefined,
                };
              });
              saveDatasetsMutation(
                {
                  list_dataset: finalData,
                  group_dataset_id: groupDatasetId,
                },
                {
                  onSuccess: () => {
                    exportYaml({ datasetVersionId });
                  },
                }
              );
            }}
            startIcon={<FileDownloadOutlinedIcon />}
          >
            {isExport ? "Export YAML" : "Save & Export YAML"}
          </Button>
        </Grid>
      </Box>
    </KWrapper.CardAccordion>
  );
};

export default memo(ListDataset);
