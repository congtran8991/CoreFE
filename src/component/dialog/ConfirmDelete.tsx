import React from "react";
import { Button, Box, Typography, Stack } from "@mui/material";

interface ConfirmDeleteDialogProps {
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <Box width={250} borderRadius={"10%"}>
      <Typography variant="subtitle1" gutterBottom>
        {content}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
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
          color="error"
          size="small"
          onClick={onConfirm}
          sx={{ minWidth: 130 }}
        >
          Yes, Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmDeleteDialog;
