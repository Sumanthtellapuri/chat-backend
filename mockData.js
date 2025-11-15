module.exports = {
  sessions: [
    { id: "101", title: "First Chat" },
    { id: "102", title: "Work Notes" }
  ],

  conversations: {
    "101": [
      { sender: "user", text: "Hello" },
      { sender: "bot", text: "Hi! How can I help?" }
    ],

    "102": []
  }
};
