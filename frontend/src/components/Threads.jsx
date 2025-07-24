import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Threads = () => {
  const { communityId } = useParams();
  const [threads, setThreads] = useState([]);
  const [newThreadText, setNewThreadText] = useState('');
  const [expandedThreads, setExpandedThreads] = useState({});
  const [replyTexts, setReplyTexts] = useState({});

  const token = localStorage.getItem('token'); // <-- make sure you have this stored!

  useEffect(() => {
    fetchThreads();
  }, [communityId]);

  const fetchThreads = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/threads/${communityId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads(res.data.threads || []);
    } catch (err) {
      console.error("Error fetching threads:", err);
    }
  };

  const handlePostThread = async () => {
    if (!newThreadText.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/threads/${communityId}`,
        { text: newThreadText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads([res.data.thread, ...threads]);
      setNewThreadText('');
    } catch (err) {
      console.error("Error posting thread:", err);
    }
  };

  const handlePostReply = async (threadId) => {
    const replyText = replyTexts[threadId];
    if (!replyText || !replyText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/threads/${communityId}/${threadId}/reply`,
        { text: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads(prev =>
        prev.map(t => t._id === threadId ? { ...t, replies: [...t.replies, res.data.reply] } : t)
      );
      setReplyTexts({ ...replyTexts, [threadId]: '' });
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  const toggleReplies = (threadId) => {
    setExpandedThreads(prev => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };

  return (
    <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 flex flex-col">
      <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Threads</h2>

      {/* New Thread input */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newThreadText}
          onChange={(e) => setNewThreadText(e.target.value)}
          placeholder="Start a new thread..."
          className="flex-grow p-2 border rounded-l-md"
        />
        <button
          onClick={handlePostThread}
          className="bg-[#bd06a2] text-white px-4 rounded-r-md"
        >
          Post
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {threads.map(thread => (
          <div key={thread._id} className="bg-white rounded-lg shadow p-3 mb-4">
            <p className="text-[#150e5d] font-medium">{thread.text}</p>

            {/* Replies */}
            <div className="mt-2">
              {(expandedThreads[thread._id] ? thread.replies : thread.replies.slice(0,2)).map((reply, idx) => (
                <div key={idx} className="bg-[#f4f3fe] rounded p-2 my-1 text-[#150e5d] text-sm">
                  {reply.text}
                </div>
              ))}
              {thread.replies.length > 2 && (
                <button
                  onClick={() => toggleReplies(thread._id)}
                  className="text-[#bd06a2] text-xs mt-1"
                >
                  {expandedThreads[thread._id] ? "Hide replies" : "See more replies"}
                </button>
              )}
            </div>

            {/* Reply input */}
            <div className="flex mt-2">
              <input
                type="text"
                value={replyTexts[thread._id] || ''}
                onChange={(e) => setReplyTexts({ ...replyTexts, [thread._id]: e.target.value })}
                placeholder="Write a reply..."
                className="flex-grow p-2 border rounded-l-md"
              />
              <button
                onClick={() => handlePostReply(thread._id)}
                className="bg-[#bd06a2] text-white px-3 rounded-r-md"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Threads;
