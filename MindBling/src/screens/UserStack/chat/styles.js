import { StyleSheet } from "react-native";
import { appStyle,color } from "../../../utility";


export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "60%",
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: color.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "20%",
    padding:10,
    marginBottom:80,

  },
});