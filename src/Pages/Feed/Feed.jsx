import React, { useState } from 'react';

// CSS Imports
import './feed.css';

// Internal Imports
import { SidebarLeft } from '../../Components/SidebarLeft/SidebarLeft';
import { SidebarRight } from '../../Components/SidebarRight/SidebarRight';
import { CreatePostModal } from '../../Components/CreatePostModal/CreatePostModal';
import { CreatePostBox } from '../../Components/CreatePostBox/CreatePostBox';
import { PostList } from '../../Components/PostList/PostList';

// UI Imports
import { Form, InputGroup } from 'react-bootstrap';
import { FcSearch } from 'react-icons/fc';

export const Feed = () => {
  // Modal state
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Search state
  const [search, setSearch] = useState('');

  return (
    <div className="feed-page">
      {/* Left Sidebar */}
      <div className="feed-left">
        <SidebarLeft />
      </div>

      {/* Main Feed */}
      <main className="feed-main">
        {/* Create post */}
        <CreatePostBox onOpen={() => setShowCreatePost(true)} />
        <CreatePostModal
          show={showCreatePost}
          onClose={() => setShowCreatePost(false)}
        />

        {/* Search */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search posts..."
            className="text-muted"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Text>
            <FcSearch />
          </InputGroup.Text>
        </InputGroup>

        {/* Posts */}
        <PostList search={search} />
      </main>

      {/* Right Sidebar */}
      <div className="feed-right">
        <SidebarRight />
      </div>
    </div>
  );
};
