import { Box, Link, Paper, Typography } from "@mui/material";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { User } from "../../../Models/UserModel";

export default function ProfileInfoPaper(props: { user: User }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "0 20px 20px 20px",
        borderRadius: "0",
        marginBottom: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            padding: "20px 0 10px 0",
          }}
        >
          <UserAvatar
            userId={0}
            name={props.user.name}
            lastName={props.user.lastName}
            avatarColor={props.user.avatarColor}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "1.7rem" }}
              >
                {props.user.name + " " + props.user.lastName}
              </Typography>
            </Box>
            <Link
              href={`mailto:${props.user.email}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="caption"
                sx={{ color: "grey", cursor: "pointer" }}
              >
                {props.user.email}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
