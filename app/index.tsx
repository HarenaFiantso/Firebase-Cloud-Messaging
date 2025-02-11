import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

type Todo = {
  id: string;
  text: string;
};

const TodoItem: React.FC<{
  item: Todo;
  onDelete: (id: string) => void;
}> = ({ item, onDelete }) => (
  <View style={styles.todoItem}>
    <Text>{item.text}</Text>
    <TouchableOpacity onPress={() => onDelete(item.id)}>
      <Text style={styles.deleteText}>X</Text>
    </TouchableOpacity>
  </View>
);

const AddTodoForm: React.FC<{
  todo: string;
  onTodoChange: (text: string) => void;
  onAddTodo: () => void;
}> = ({ todo, onTodoChange, onAddTodo }) => (
  <View>
    <TextInput
      style={styles.input}
      value={todo}
      placeholder="Enter a todo"
      onChangeText={onTodoChange}
    />
    <TouchableOpacity style={styles.button} onPress={onAddTodo}>
      <Text>Add Todo</Text>
    </TouchableOpacity>
  </View>
);

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: todo }]);
      setTodo("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} backgroundColor="#DDD" />
        <AddTodoForm todo={todo} onTodoChange={setTodo} onAddTodo={addTodo} />
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem item={item} onDelete={deleteTodo} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default TodoForm;
