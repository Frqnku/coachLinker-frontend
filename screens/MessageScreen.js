import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FlatList, View, TextInput, TouchableOpacity, Text, ScrollView,StyleSheet } from "react-native";
import Moment from "moment";
import io from "socket.io-client";

const socket = io("http://localhost:8090");

export default function MessageScreen(){
  const user = useSelector((state) => state.users.value);
  console.log(user)

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesList = useRef(null);
  let currentDate = new Date("August 19, 1975 23:15:30").toDateString();

  useEffect(() => {
    // Fetch messages from server and scroll to bottom of messages list on load and every 60 seconds
    const fetchMessages = async () => {
      const { data, ok } = await api.get(`/chat/all`);
      ok && setMessages(data);
    };
    fetchMessages();
    messagesList.current.scrollToEnd();
  }, []);

//   useEffect(() => {
//     if (user){
//     socket.emit("join", user.organisation);

//     // Listen for new messages from server
//     socket.on("receive message", ({ message }) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
    
//     });

//     return () => {
//       socket.off("receive message");
//       socket.off("join");
//     };
// }
//   }, [user]);


  // Send message to server
  const handleSubmit = async () => {
    const { data, ok } = await api.post(`/chat/new`, { content: newMessage });
    if (ok) {
    //   socket.emit("messages", { message: data });
    //   setNewMessage("");
    }
  };

  // Render message based on if it's from the current user or not
//   const RenderMessage = ({ item }) => {
//     return (
//       <View>
//         {item.name === user.name ? (
//           <MyMessage message={item.content} date={item.date} name={item.name} avatar={item.avatar} />
//         ) : (
//           <Message message={item.content} date={item.date} name={item.name} avatar={item.avatar} />
//         )}
//       </View>
//     );
//   };

  return (
    <View style={{ flex: 1, padding: 2, paddingBottom: 8 }}>
      <ScrollView
        ref={messagesList}
        style={{ flex: 1, borderWidth: 1, borderColor: "#888", backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderMessage}
          ListHeaderComponent={() => (
            <Text style={{ textAlign: "center", color: "#666" }}>
              <Moment format="MMM Do YY">{currentDate}</Moment>
            </Text>
          )}
          ListHeaderComponentStyle={{ marginTop: 10 }}
          onContentSizeChange={() => messagesList.current.scrollToEnd()}
        />
      </ScrollView>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
        <TextInput
          style={{ flex: 1, fontSize: 14, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: "#ddd" }}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, backgroundColor: "#0560FD", marginLeft: 10 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
    }
})