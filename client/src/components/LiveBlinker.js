import { styled, keyframes } from "@mui/material/styles";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.1; }
  100% { opacity: 1; }
`;

export const LiveBlinker = styled("span")(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: "#28a745",
  display: "inline-block",
  marginRight: theme.spacing(1),
  animation: `${blink} 2s infinite`,
}));
