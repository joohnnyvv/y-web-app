import { Avatar, IconButton } from "@mui/material";

import { Link } from "react-router-dom";

interface UserAvatarProps {
  userId: number;
  name: string;
  lastName: string;
  avatarColor: string;
  marginBottom?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  return (
    <Link
      to={`/profile/${props.userId}`}
      style={{
        padding: 0,
        marginBottom: props.marginBottom,
        textDecoration: "none",
      }}
    >
      <Avatar
        alt={props.name + " " + props.lastName}
        sx={{ bgcolor: props.avatarColor }}
      >
        {props.name.charAt(0) + props.lastName.charAt(0)}
      </Avatar>
    </Link>
  );
}
