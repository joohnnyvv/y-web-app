import { Button, ButtonPropsSizeOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import React from "react";

export default function FollowButton(props: {
  isFollowedByUser: boolean;
  size?: OverridableStringUnion<
    "small" | "medium" | "large",
    ButtonPropsSizeOverrides
  >;
}) {
  return (
    <Button
      variant={props.isFollowedByUser ? "outlined" : "contained"}
      size={props.size}
      sx={{ borderRadius: "0" }}
    >
      {props.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
