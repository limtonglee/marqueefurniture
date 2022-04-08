import palette from "../../theme/palette";

export const CARD_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: palette.primary.main,
      color: palette.common.black,
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: palette.primary.main },
    },
    invalid: {
      iconColor: palette.error.main,
      color: palette.error.main,
    },
  },
};