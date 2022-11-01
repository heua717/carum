import { Button as MUIButton } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(MUIButton)(
  ({ size, variant }) =>
    `
      width: ${getWidth(size)};
      height: ${getHeight(size)};
      background-color: ${getColor(variant)};
      border: 8px;
      color: ${getTextColor(variant)};
      &: focus{
        background-color: ${getColor(variant)};
      };
    `
);

function getColor(variant) {
  switch (variant) {
    case "primary":
      return "#5d51a7";
    case "light":
      return "#8682ce";
    case "extraLight":
      return "#B7BDEE";
    case "XXLight":
      return "#E7E9FD";
    default:
      return "white";
  }
}

function getTextColor(variant) {
  switch (variant) {
    case "primary":
      return "white";
    case "light":
      return "white";
    default:
      return "black";
  }
}

function getWidth(size) {
  switch (size) {
    case "big":
      return "300px";
    case "medium":
      return "248px";
    case "small":
      return "140px";
    case "extraSmall":
      return "76px";
    default:
      return "300px";
  }
}

function getHeight(size) {
  switch (size) {
    case "big":
      return "48px";
    case "medium":
      return "48px";
    case "small":
      return "44px";
    case "extraSmall":
      return "32px";
    default:
      return "48px";
  }
}

function Button({ text, size, variant, onClick, disabled }) {
  return (
    <StyledButton
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
}

export default Button;
