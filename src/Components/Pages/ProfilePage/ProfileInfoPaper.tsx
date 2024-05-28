import { Box, Button, Paper, Typography } from "@mui/material";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { User } from "../../../Models/UserModel";
import FollowButton from "../../Reusable/FollowButton/FollowButton";

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
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          padding: "20px 0 10px 0",
          alignItems: "center",
        }}
      >
        <UserAvatar
          userId={0}
          isActive={props.user.isActive}
          name={props.user.name}
          lastName={props.user.lastName}
          avatarColor={props.user.avatarColor}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1.7rem" }}
        >
          {props.user.name + " " + props.user.lastName}
        </Typography>
        <Box>
          <FollowButton
            isFollowedByUser={props.user.isFollowedByUser}
            size="small"
          />
        </Box>
      </Box>
    </Paper>
  );
}
