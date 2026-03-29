import { Box, Fade, Paper, Popper } from "@mui/material";
import React, { memo, useCallback, useImperativeHandle, useState } from "react";

// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IPopperProps, IPopperDialogProps } from "./helpers";

const KPopper = React.forwardRef<IPopperDialogProps>((_, ref) => {
  const [data, setData] = useState<IPopperProps[]>([]);

  const dismiss = useCallback(() => {
    const newArr = data.splice(0, -1);
    setData(newArr);
  }, [data]);

  useImperativeHandle(ref, () => {
    return {
      open: (payload: IPopperProps) => {
        setData([payload]);
      },
      dismiss,
      dismissAll: () => {
        setData([]);
      },
    };
  });

  if (data.length === 0) {
    return null;
  }

  return data.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <Popper
          sx={{ zIndex: 1200 }}
          open={true}
          anchorEl={item.anchorEl}
          placement={"right-end"}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Box padding={"0.75rem"}>{item?.content(dismiss)}</Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      </React.Fragment>
    );
  });
});

KPopper.displayName = "KPopper";

export default memo(KPopper);
