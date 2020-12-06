import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from './config'

// STATEFUL
class TodoList extends Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.r'
    ];
    this.state = ({
      items: [],
      itemDescription: '',
      priority: -1,
      modalVisible: false,
      id: '',
    });

  }

  componentDidMount() {
    var newThis = this;
    newThis.listToDoItem();
  }

  listToDoItem = async () => {
    this.setState({
      items: []
    })
    await db.collection('atividades').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const res = {
            id: doc.id,
            priority: doc.data().priority,
            item: doc.data().item
          }
          this.setState({
            items: [res, ...this.state.items]
          });
        });
      })
      .catch((err) => {
        console.log('Error getting documents', JSON.stringify(err));
      });
  }

  addTodoItem = async () => {
    var itemDescription = this.state.itemDescription;
    var priority = this.state.priority;
    const id = new Date();
    if (priority !== -1 && itemDescription !== '') {
      const refTodo = db.collection("atividades");
      try {
        await refTodo.doc(id.toString()).set({
          item: itemDescription,
          priority: priority,
        });

        this.setState({
          itemDescription: ''
        })

        this.listToDoItem();

      } catch (error) {
        console.log("Error adding document: ", error)
      }
    } else {
      Alert.alert("Falta de dados encontrada", "Preencha os campos corretamente", {
        text: "Ok! Irei fazê-lo!"
      })
    }
  }
  deleteItem = async (id) => {
    Alert.alert("Detecção de hostilidade contra o item", "Deseja apagar mesmo o item?", [
      {
        text: "Sim, eu me cansei desse item",
        onPress: async () => {
          await db.collection('atividades').doc(id).delete()
          this.listToDoItem()
          this.setModalVisible(false)
        },
      },
      {
        text: "Não, foi um erro! Me desculpe!",
        style: "cancel"
      }
    ])

  }
  updateItem = async () =>{
    await db.collection('atividades').doc(this.state.id).set({
      item: this.state.itemDescription,
      priority: this.state.priority
    }).then( function(){
      console.log("Enviou numa boa o update");
    }).catch(function (error){
      console.error("Deu erro no update: ", error)
    })
    this.listToDoItem()
    this.setModalVisible(false)
  }

  changePriority = (priority) => {
    this.setState({ priority });
  }

  colorPriority(priority) {
    if (priority === '2' || priority === 2) {
      return ('red')
    } else if (priority === '1' || priority === 1) {
      return ('yellow')
    } else if (priority === '0' || priority === 0) {
      return ('green')
    } else {
      return ('none');
    }
  }

  setModalVisible(visibility, id, item, priority) {
    if (visibility) {
      this.setState({
        modalVisible: true,
        itemDescription: item,
        id: id,
        priority: priority
      })
    } else {
      this.setState({
        modalVisible: false,
        itemDescription: '',
        id: '',
        priority: -1
      })
    }
  }

  render() {
    return (
      <View style={styles.bigger}>
        <View style={styles.bar}>
          <Text style={styles.textBar}>TODO<Text style={{ fontWeight: 'bold' }}>LIST</Text></Text>
        </View>
        <View style={styles.container}>
          <View style={{ marginBottom: 5 }}>
            <View style={styles.form}>
              <TextInput
                style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: "#DDDDDD", flex: 1, padding: 5 }} placeholder={'Descrição'}
                value={this.state.itemDescription} onChangeText={(text) => this.setState({ itemDescription: text })}
              ></TextInput>

              <TouchableOpacity onPress={() => this.addTodoItem()}>
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
                    <TouchableOpacity onPress={() => { this.setModalVisible(true, elem.id, elem.item, elem.priority) }}>
                      <Text style={styles.itemText}>{elem.item}</Text>
                    </TouchableOpacity>
                    <FontAwesome name="square" size={30} color={this.colorPriority(elem.priority)} />
                  </View>
                )
              })
            }
          </View>
          <View>

          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false)
          }}>
          <View style={styles.containerModal}>
            <Text style={{marginBottom: 10}}>O que desejas fazer?</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput 
              defaultValue={this.state.itemDescription} 
              style={{ flex: 1, textAlign: "center", borderWidth: 1, borderColor: "#DDDDDD", padding: 5, minWidth: 200, margin: 5 }} 
              onChangeText={(text) => this.setState({ itemDescription: text })}
              />
            </View>
            <View style={{flexDirection: "row", backgroundColor: "#DDDDDD", borderRadius: 5, marginBottom: 10}}>
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => { this.updateItem() }} style={styles.btnModal}>
                <Text style={{ color: 'gray' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.deleteItem(this.state.id) }} style={styles.btnModal}>
                <Text style={{ color: 'red' }}>Deletar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { this.setModalVisible(false) }} style={{ marginTop: 50, borderColor: "orange", borderWidth: 1, padding: 5, borderRadius: 5}}>
              <Text style={{ color: 'orange' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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


export default TodoList;