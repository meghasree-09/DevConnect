import "./CommunityDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCommunity } from "../../api/communityApi";
import { useAuth } from "../../context/AuthContext";

import CommunityHeader from "../../components/Community/CommunityHeader";
import CommunityTabs from "../../components/Community/CommunityTabs";
import CommunityMembers from "../../components/Community/CommunityMembers";
import CommunityAbout from "../../components/Community/CommunityAbout";
import CommunityResources from "../../components/Community/CommunityResources";
import CommunityEvents from "../../components/Community/CommunityEvents";
import CommunityFeed from "../../components/Community/CommunityFeed";
import ChatBox from "../../components/Chat/ChatBox";

function CommunityDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");

  useEffect(() => {
    fetchCommunity();
  }, [id]);

  const fetchCommunity = async () => {
    try {
      const data = await getCommunity(id);
      setCommunity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!community) {
    return <h2 className="loading">Community Not Found</h2>;
  }

  const joined = community.members?.some(
    (member) => member._id === user?._id
  );

  return (
    <div className="community-page">

      <CommunityHeader
        community={community}
        joined={joined}
      />

      <CommunityTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="tab-content">

        {activeTab === "feed" && (
          <CommunityFeed
            communityId={community._id}
          />
        )}

        {activeTab === "chat" && (
          <ChatBox
            communityId={community._id}
          />
        )}

        {activeTab === "members" && (
          <CommunityMembers
            members={community.members}
          />
        )}
{activeTab === "resources" && (
  <CommunityResources
    communityId={community._id}
  />
)}

        {activeTab === "events" && (
          <CommunityEvents 
          communityId={community._id}/>
        )}

        {activeTab === "about" && (
          <CommunityAbout
            community={community}
          />
        )}

      </div>

    </div>
  );
}

export default CommunityDetails;