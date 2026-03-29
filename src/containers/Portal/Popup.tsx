"use client";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useImperativeHandle, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IPopupDialogProps, IPopupProps } from "./helpers";

const KPopup = React.forwardRef<IPopupDialogProps>((_, ref) => {
  const [data, setData] = useState<IPopupProps[]>([]);

  const dismiss = useCallback(() => {
    const newArr = data.splice(0, -1);
    setData(newArr);
  }, [data]);

  useImperativeHandle(ref, () => {
    return {
      open: (payload: IPopupProps) => {
        setData([...data, payload]);
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
        <Dialog
          open={true}
          keepMounted
          onClose={dismiss}
          fullWidth
          maxWidth={item?.maxWidth || "sm"}
        >
          {item?.title && (
            <DialogTitle
              borderBottom={"1px solid #b9b5b5"}
              sx={{ m: 0, p: 1.5, pl: 2 }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  fontSize={"1.5rem"}
                  fontWeight={"bold"}
                  fontFamily={"Times"}
                  color="#ff79c6"
                >
                  {item?.title}
                </Typography>
                <div onClick={dismiss} style={{ cursor: "pointer" }}>
                  <CloseOutlinedIcon />
                </div>
              </Box>
            </DialogTitle>
          )}
          <DialogContent sx={{ m: 0, p: 1.5, pl: 2 }}>
            <Box paddingY={"1rem"}>{item?.content()}</Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  });
});

KPopup.displayName = "KPopup";

export default memo(KPopup);
