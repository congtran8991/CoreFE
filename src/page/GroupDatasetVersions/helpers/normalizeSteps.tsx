import { RecordStep } from ".";
import {
  EnumTypeOptionsRepartition,
  EnumTypeStep,
} from "../../../constants/enum";
import { formatNormalizeEmptyObj, undefineValue } from "../../../utils";

export const convertDataStepWithTypeSELECT = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    expression: step.expression,
  };

  return val;
};

export const convertDataStepWithTypeTRANSFORM = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    col: step.col,
    expression: step.expression,
  };

  return val;
};

export const convertDataStepWithTypeDROPCOLUMNS = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    col: step.col,
  };

  return val;
};

export const convertDataStepWithTypeUNION = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    options: {
      with_dataset: step.options?.with_dataset,
    },
  };

  return val;
};

export const convertDataStepWithTypeEXCEPT = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    options: {
      with_dataset: step.options?.with_dataset,
    },
  };

  return val;
};

export const convertDataStepWithTypeAGGREGATE = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    group_by: step.group_by,
    agg_functions: step.agg_functions,
  };

  return val;
};

export const convertDataStepWithTypeREPARTITION = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    typeOptionRepartition: undefineValue(
      step.typeOptionRepartition,
      isCopyBlock
    ),
    options: {
      partition_num: step.options?.partition_num,
      partition_cols: step.options?.partition_cols,
    },
  };

  return val;
};

export const convertDataStepWithTypeFILTER = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    expression: step.expression,
  };

  return val;
};

export const convertDataStepWithTypeJOIN = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    col: step.col,
    options: formatNormalizeEmptyObj({
      join_type: step.options?.join_type,
      with_dataset: step.options?.with_dataset,
    }),
  };

  return val;
};

export const convertDataStepWithTypeDUPLICATE = (
  step: RecordStep,
  isCopyBlock: boolean
) => {
  const val = {
    type: step.type,
    typeOptionDuplicate: undefineValue(step.typeOptionDuplicate, isCopyBlock),
    col: step.col,
  };

  return val;
};

export const useNormalizeSteps = (
  steps: RecordStep[],
  isCopyBlock: boolean
) => {
  const OPTIONS = {
    [EnumTypeStep.select]: convertDataStepWithTypeSELECT,
    [EnumTypeStep.transform]: convertDataStepWithTypeTRANSFORM,
    [EnumTypeStep.dropcolumns]: convertDataStepWithTypeDROPCOLUMNS,
    [EnumTypeStep.union]: convertDataStepWithTypeUNION,
    [EnumTypeStep.except]: convertDataStepWithTypeEXCEPT,
    [EnumTypeStep.aggregate]: convertDataStepWithTypeAGGREGATE,
    [EnumTypeStep.repartition]: convertDataStepWithTypeREPARTITION,
    [EnumTypeStep.filter]: convertDataStepWithTypeFILTER,
    [EnumTypeStep.join]: convertDataStepWithTypeJOIN,
    [EnumTypeStep.deduplicate]: convertDataStepWithTypeDUPLICATE,
  };

  const _steps = steps.map((x) => {
    const convertValue = OPTIONS[x.type];
    const { type, ...rest } = convertValue(x, isCopyBlock);
    if (isCopyBlock) {
      return {
        [type]: rest,
      };
    } else {
      return {
        type,
        ...rest,
      };
    }
  });
  return _steps;
};
