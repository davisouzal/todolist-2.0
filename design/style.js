import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      marginTop: 10,
  
    },
    button: {
      alignItems: "center",
      padding: 10,
      flex: 1,
      borderRadius: 5,
      marginRight: 5,
    },
    hover: {
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: "#DDDDDD",
    },
    grayColor: {
      backgroundColor: '#DDDDDD'
    },
    bigger: {
      flex: 1,
    },
    textBar: {
      color: "white",
      fontSize: 20,
      padding: 15,
    },
    bar: {
      backgroundColor: "green",
      marginTop: 23,
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    btnAdd: {
      color: "#3371FF",
      fontSize: 15,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "#3371FF",
      textAlign: "center",
      width: 25,
      marginLeft: 5,
    },
    form: {
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    priorityForm: {
      marginTop: 15,
      flexDirection: "row",
      backgroundColor: "#DDDDDD",
      borderRadius: 5,
    },
    itemList: {
    },
    item: {
      paddingTop: 20,
      justifyContent: "space-between",
      textAlignVertical: "center",
      flexDirection: "row",
      borderWidth: 0.5,
      borderColor: "white",
      borderBottomColor: "#DDDDDD"
    },
    itemText: {
      paddingRight: 20,
      flex: 1,
      justifyContent: "space-between",
      alignSelf: "center",
      textAlignVertical: "center",
    },
    containerModal: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      paddingHorizontal: 10,
      marginTop: 10,
    },
    btnModal: {
      padding: 5,
      margin: 5,
      borderWidth: 1,
      borderRadius: 10,
      flex: 1,
      alignItems: "center",
      borderColor: "#DDDDDD"
    }
  });