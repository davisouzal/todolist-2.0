import React, {Component} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import axios from "axios";
import { FontAwesome } from '@expo/vector-icons'; 

// STATEFUL
class TodoList extends Component {

  constructor(props){
    super(props);

    this.state = ({
      items: [],
      itemDescription: '',
      priority: -1,
    });

  }

  componentDidMount () {
      axios.get('https://todolist-295919.appspot.com/listItems')
      .then(res => {
        this.setState({
          items: res.data.items,
        })
      })  
      .catch(e => {
        console.log(JSON.stringify(e));
      })
  }

  addTodoItem = () => {
    var itemDescription = this.state.itemDescription;
    var priority = this.state.priority;
    if(priority!==-1 && itemDescription!==''){
      var id = Date.now();

      axios.post('https://todolist-295919.appspot.com/addTodoItem?item='+itemDescription+'&priority='+priority+'&id='+id)
      .then(res => {
        this.setState({
          items: res.data.items,
        });
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
      this.setState({itemDescription: ''})
  }else{
    Alert.alert("Falta de dados detectada", "Por favor, preencha todos os campos corretamente",[
      {
        text: "Ok! Irei tentar"
      }
    ])
  }
}

  changePriority = (priority) => {
    this.setState({priority});
  }

  colorPriority(priority) {
    if (priority==='2' || priority===2){
      return ('red')
    }else if(priority==='1' || priority===1){
      return ('yellow')
    }else if(priority==='0' || priority===0){
      return ('green')
    }else{
      return ('none');
    }
  }
  render() {
      return (
        <View style={styles.bigger}>
          <View style={styles.bar}>
                <Text style={styles.textBar}>TODO<Text style={{fontWeight: 'bold'}}>LIST</Text></Text>
          </View>
          <View style={styles.container}>
            <View style={{marginBottom: 5   }}>
              <View style={styles.form}>
                <TextInput 
                    style={{backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: "#DDDDDD", flex: 1, padding: 5}} placeholder={'Descrição'}
                    value={this.state.itemDescription} onChangeText={(text) => this.setState({itemDescription: text})}
                  ></TextInput>

                  <TouchableOpacity onPress={()=>this.addTodoItem()}>
                    <Text style={styles.btnAdd}>+</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.priorityForm}>
                <TouchableOpacity style={[
                    styles.button, 
                    this.state.priority == 0 ? styles.hover : styles.grayColor]} 
                    onPress={() => this.changePriority(0)}>
                  <Text>Baixa</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[
                    styles.button, 
                    this.state.priority == 1 ? styles.hover : styles.grayColor]} 
                    onPress={() => this.changePriority(1)}>
                  <Text>Média</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.button, 
                    this.state.priority == 2 ? styles.hover : styles.grayColor]} 
                    onPress={() => this.changePriority(2)}>
                  <Text>Alta</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemList}>
              { 
                this.state.items.map(elem => {
                  return (
                    <View style={styles.item} key={elem.id}>
                      <Text style={styles.itemText}>{elem.item}</Text>
                      <FontAwesome name="square" size={30} color={this.colorPriority(elem.priority)} />
                    </View> 
                  )
                })
              }
            </View>
            <View>
              
            </View>
          </View>
        </View>
      );
  }

}

const styles = StyleSheet.create({
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
  bigger :{
    flex: 1,
  },
  textBar:{
    color: "white",
    fontSize: 20,
    padding: 15,
  },
  bar:{
    backgroundColor: "green",
    marginTop: 23,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnAdd:{
    color: "#3371FF",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#3371FF",
    textAlign: "center",
    width: 25,
    marginLeft: 5,
  },
  form:{
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  priorityForm:{
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  itemList:{
  },
  item:{
    paddingTop: 20,
    justifyContent: "center",
    textAlignVertical: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "white",
    borderBottomColor: "#DDDDDD"
  },
  itemText:{
    paddingRight: 20,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
  }
});


export default TodoList;