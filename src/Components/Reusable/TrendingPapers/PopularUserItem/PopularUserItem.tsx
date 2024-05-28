import { Avatar, Box, Typography } from "@mui/material";
import { ActiveBadge } from "../../../ActiveBadge/ActiveBadge";

interface PopularUserItemProps {
  user: string;
}

export default function PopularUserItem(props: PopularUserItemProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <ActiveBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="avatar" sx={{ bgcolor: "gray" }}>
          {props.user.charAt(0)}
        </Avatar>
      </ActiveBadge>
      <Typography variant="h6">{props.user}</Typography>
    </Box>
  );
}
