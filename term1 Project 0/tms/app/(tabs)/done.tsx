import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";

interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default function DonePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchCompleteTasks = async () => {
    try {
      const response = await fetch("http://192.168.227.1:3000/tasks/complete");
      const result = await response.json();
      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const toggleTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://192.168.227.1:3000/task/${taskId}`, {
        method: "PATCH",
      });
      const result = await response.json();
      if (result.success) {
        fetchCompleteTasks(); // Refresh the list
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  useEffect(() => {
    fetchCompleteTasks();
  }, []);

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <TouchableOpacity
        onPress={() => toggleTask(item._id)}
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#000",
          marginRight: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 12 }}>✓</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, textDecorationLine: "line-through" }}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Completed Tasks
      </Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
