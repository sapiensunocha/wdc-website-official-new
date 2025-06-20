import ChatBot, { Button } from "react-chatbotify";
// import { flow } from "../chatbot/flow";
import Bot from "../assets/chatbot/robot.png";
import { useState } from "react";
import WDCLogo from "../assets/images/wdcimage.png";
import WDCLogo2 from "../assets/images/wdclogobg.png";

const questions = {
  "What is Michael?":
    "Michael stands for Global Disaster Monitoring and Alert System. It integrates satellite imagery and weather station data to detect and predict natural and man-made disasters.",
  "What types of disasters does Michael monitor?":
    "Michael monitors various types of disasters, including earthquakes, tsunamis, hurricanes, floods, wildfires, industrial accidents, ...",
  "How can I become a stakeholder in Michael?":
    "You can join us as a stakeholder by visiting our website and filling out the “Become a stakeholder” form. This will keep you informed and ahead of potential disasters.",
  "How does Michael provide real-time alerts?":
    "Michael aggregates data from multiple sources such as satellite imagery, weather stations, seismic sensors, and social media feeds to provide real-time alerts and advanced analytics",
  "Is Michael accessible to the public?":
    "Yes, Michael provides public access to real-time disaster alerts and historical data. You can explore our interactive maps and sign in or sign to our platform to stay updated.",
  "How accurate are Michael predictions?":
    "Michael predictions are based on scientific models and historical data. While we strive for accuracy, unforeseen factors can impact the precision of our alerts.",
  "Can I embed Michael alerts on my website?": "This feature is coming soon.",
  more: "To learn more about World Disaster Center, visit the about page on our website !",
};

const ChatBotComponent = () => {
  const [form, setForm] = useState({});
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #289ed4",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };

  const flow = {
    start: {
      message: "Hello! Welcome to world disaster center, How can i help you?",
      //   chatDisabled: true,
      options: [
        "What is Michael?",
        "What types of disasters does Michael monitor?",
        "How can i join the World Disaster Center?",
        "How can I become a stakeholder in Michael?",
        "How does Michael provide real-time alerts?",
        "Is Michael accessible to the public?",
        "How accurate are Michael predictions?",
        "Can I embed Michael alerts on my website?",
        "more",
      ],
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "give_response",
    },
    frequently_asked: {
      message: "here are some frequently asked questions",
      //   chatDisabled: true,
      options: [
        "How does Michael provide real-time alerts?",
        "Is Michael accessible to the public?",
        "How accurate are Michael predictions?",
        "Can I embed Michael alerts on my website?",
      ],
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "give_response",
    },
    give_response: {
      message: (params) => `${questions[params.userInput]}`,
      function: (params) => setForm({ ...form, age: params.userInput }),
      path: "finish",
    },
    finish: {
      message:
        "To learn more about World Disaster Center, visit the about page on our website !",
      chatDisabled: true,
      function: (params) =>
        setForm({ ...form, pet_ownership: params.userInput }),
    },
  };

  const settings = {
    isOpen: false,
    general: {
      primaryColor: "#126aa5",
      secondaryColor: "#126aa5",
      fontFamily: "Arial, sans-serif",
      embedded: false,
    },
    audio: {
      disabled: true,
    },
    chatHistory: {
      storageKey: "chatbot_assistant_history_wdc",
    },
    chatButton: {
      icon: WDCLogo,
    },
    botBubble: {
      showAvatar: true,
      avatar: Bot,
      simStream: true,
      streamSpeed: 80,
    },
    header: {
      title: "WDC Assistant Bot",
      avatar: WDCLogo2,
      buttons: [Button.CLOSE_CHAT_BUTTON],
    },
    notification: {
      volume: 0,
      showCount: false,
    },
    footer: {
      buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON],
      text: "World Disaster Center Assistant",
    },
    tooltip: {
      text: "How can I assist you today?",
      mode: "START",
    },
    // other sections
  };

  // styles here
  const styles = {
    headerStyle: {
      background: "#126aa5",
      color: "#ffffff",
      padding: "10px",
    },
    chatWindowStyle: {
      backgroundColor: "#f2f2f2",
    },
    // ...other styles
  };
  return <ChatBot flow={flow} styles={styles} settings={settings} />;
};

export default ChatBotComponent;
