import { Fragment, memo, ReactNode, useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { defaultStep, IDatasets } from "../../helpers";
import { Box, Grid, Divider } from "@mui/material";
import TypeStep from "./TypeStep";
import { EnumTypeStep } from "@constants/enum";
import SelectStep from "./SelectStep";
import Transform from "./Transform";
import Aggregate from "./Aggregate";
import Dropcolumns from "./Dropcolumns";
import Union from "./Union";
import Except from "./Except";
import Repartition from "./Repartition";
import JoinStep from "./Join";
import Deduplicate from "./Deduplicate";
import FilterStep from "./Filter";
import { KWrapper } from "@uikit";

const DetailSteps = () => {
  const methods = useFormContext<IDatasets>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "steps", // unique name for your Field Array
    keyName: "formStepId",
  });

  const [_steps] = useWatch({
    control: methods.control,
    name: ["steps"],
  });

  const OPTIONS_STEPS: Record<
    EnumTypeStep,
    // eslint-disable-next-line no-unused-vars
    (props: { index: number }) => ReactNode
  > = useMemo(() => {
    return {
      [EnumTypeStep.select]: SelectStep,
      [EnumTypeStep.filter]: FilterStep,
      [EnumTypeStep.transform]: Transform,
      [EnumTypeStep.aggregate]: Aggregate,
      [EnumTypeStep.deduplicate]: Deduplicate,
      [EnumTypeStep.dropcolumns]: Dropcolumns,
      [EnumTypeStep.except]: Except,
      [EnumTypeStep.join]: JoinStep,
      [EnumTypeStep.union]: Union,
      [EnumTypeStep.repartition]: Repartition,
    };
  }, []);

  return (
    <Box marginTop={1}>
      <KWrapper.CardAccordion title="Steps" controls="panel-content-steps">
        <Box>
          <Grid container spacing={2}>
            {fields.map((itm, index) => {
              const record = _steps[index];
              const Step = OPTIONS_STEPS[record?.type];

              return (
                <Fragment key={itm.formStepId}>
                  <TypeStep index={index} />
                  {record?.type && (
                    <Step key={`${itm.formStepId}-${itm.type}`} index={index} />
                  )}

                  <Grid size={{ xs: 0.8 }} alignSelf={"center"}>
                    <Box display={"flex"} paddingTop={1}>
                      {fields.length - 1 === index && (
                        <Box
                          sx={{ cursor: "pointer", marginBottom: 1 }}
                          onClick={() => {
                            append(defaultStep);
                          }}
                        >
                          <AddOutlinedIcon
                            sx={{ color: "#0a620a", fontWeight: "bold" }}
                          />
                        </Box>
                      )}

                      {fields.length !== 1 && (
                        <Box
                          sx={{ cursor: "pointer", marginBottom: 1 }}
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          <CloseOutlinedIcon
                            sx={{ color: "#cd2020", fontWeight: "bold" }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Box>
      </KWrapper.CardAccordion>
    </Box>
  );
};

export default memo(DetailSteps);
