// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mockData = require("./mockData");

// -----------------------------------------
// 1. Get all sessions for sidebar
// -----------------------------------------
app.get("/api/sessions", (req, res) => {
  res.json(mockData.sessions);
});

// -----------------------------------------
// 2. Create a new chat session
// -----------------------------------------
app.get("/api/new-chat", (req, res) => {
  const newId = Date.now().toString();

  // Add the new session to the session list
  mockData.sessions.push({
    id: newId,
    title: "New Chat " + newId
  });

  // Create empty conversation
  mockData.conversations[newId] = [];

  res.json({ sessionId: newId });

});

// -----------------------------------------
// 3. Get conversation by session ID
// -----------------------------------------
app.get("/api/session/:id", (req, res) => {
  const id = req.params.id;

  // If conversation doesn't exist, create blank array
  if (!mockData.conversations[id]) {
    mockData.conversations[id] = [];
  }

  res.json(mockData.conversations[id]); // always returns array
});

// -----------------------------------------
// 4. Chat API – mock AI response
// -----------------------------------------
app.post("/api/chat/:id", (req, res) => {
  const id = req.params.id;
  const { question } = req.body;

  // Always ensure conversation exists
  if (!mockData.conversations[id]) {
    mockData.conversations[id] = [];
  }

  // Add user message
  mockData.conversations[id].push({
    sender: "user",
    text: question
  });

  // Mock AI response
  const reply = {
    answer: `This is the mock response for "${question}".`,
    table: [
      { id: 1, name: "Item A", value: 32 },
      { id: 2, name: "Item B", value: 56 }
    ]
  };

  // Add bot reply
  mockData.conversations[id].push({
    sender: "bot",
    text: reply.answer
  });

  res.json(reply);
});

// -----------------------------------------
// Start Server
// -----------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
