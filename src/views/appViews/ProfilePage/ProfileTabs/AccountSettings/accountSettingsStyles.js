import {
  container,
  cardTitle,
  title,
  mlAuto,
  mrAuto,
  main,
  whiteColor,
  mainRaised,
  grayColor, section
} from "assets/jss/material-kit-pro-react.js";

import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";
import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import customSelectStyle from "assets/jss/material-kit-pro-react/customSelectStyle.js";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const profilePageStyle = {
  ...imagesStyle,
  ...tooltipsStyle,
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  cardTitle,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: grayColor[0]
  },
  container: {
    ...container,
    padding: "20px 0 60px 0",
  },
  textCenter: {
    textAlign: "center !important"
  },
  name: {
    marginTop: "-80px"
  },

  main: {
    ...main
  },
  mainRaised: {
    ...mainRaised
  },
  title: {
    ...title,
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  follow: {
    position: "absolute",
    top: "0",
    right: "0"
  },
  followIcon: {
    width: "20px",
    height: "20px"
  },
  followButton: {
    marginTop: "-28px !important"
  },
  gridItem: {
    ...mlAuto,
    ...mrAuto
  },
  collections: {
    marginTop: "20px"
  },
  cardBody: {
    display: "flex",
    boxOrient: "vertical",
    boxDirection: "normal",
    flexDirection: "column",
    boxPack: "center",
    justifyContent: "center"
  },
  badge: {
    display: "inline-table",
    margin: "0 auto"
  },
  listUnstyled: {
    paddingLeft: "0",
    listStyle: "none",
    "& > li": {
      padding: "5px 0px",
      fontSize: "1em"
    }
  },
  profileTabs: {
    marginTop: "2.284rem",
    marginBottom: "50px"
  },
  card: {
    textAlign: "left !important"
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  input: {
    paddingTop: "5px",
  },
  inputIconsColor: {
    color: grayColor[13]
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative"
  },
  parallax: {
    height: "380px",
    backgroundPosition: "top center"
  },
  setupForms: {
    textAlign: "center"
  },
  section: {
    ...section,
    padding: "40px 0px",
    "& h4$description": {
      fontSize: "1.5em"
    }
  },
  highlights: {
    textAlign: "center !important",
    paddingTop: "30px",
    paddingBottom: "0px",
    "& p": {
      fontSize: "16px",
      lineHeight: "1.6em"
    }
  },
  short: {
    paddingTop: "30px"
  },
  setupButton: {
    margin: "20px 5px"
  },
  mapContainer: {
    position: "relative"
  },
  timeSelection: {
    padding: "0 0 30px 0"
  },
  accordianTitleLine: {
    display: "flex",
    flexDirection: "row",
    flexWrap:"nowrap",
    alignItems: "center"
  },
  accordianTitle: {
    padding: "0 10px"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: grayColor[13]
  },
  infoLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  }
};

export default profilePageStyle;
