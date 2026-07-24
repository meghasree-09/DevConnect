import "./CommunityTabs.css";

function CommunityTabs({ activeTab, setActiveTab }) {
  return (
    <div className="community-tabs">

      <button
        className={activeTab === "feed" ? "active" : ""}
        onClick={() => setActiveTab("feed")}
      >
        📝 Feed
      </button>

      <button
        className={activeTab === "chat" ? "active" : ""}
        onClick={() => setActiveTab("chat")}
      >
        💬 Chat
      </button>

      <button
        className={activeTab === "members" ? "active" : ""}
        onClick={() => setActiveTab("members")}
      >
        👥 Members
      </button>

      <button
        className={activeTab === "resources" ? "active" : ""}
        onClick={() => setActiveTab("resources")}
      >
        📂 Resources
      </button>

      <button
        className={activeTab === "events" ? "active" : ""}
        onClick={() => setActiveTab("events")}
      >
        📅 Events
      </button>

      <button
        className={activeTab === "about" ? "active" : ""}
        onClick={() => setActiveTab("about")}
      >
        ℹ️ About
      </button>

    </div>
  );
}

export default CommunityTabs;