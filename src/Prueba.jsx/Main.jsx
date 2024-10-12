import React from "react";
import FilterSidebar from "../Filter/FilterSidebar";
import TrendingTopics from "./TrendingTopics";
import UserPosts from "./UserPost";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <aside className="filter-section">
        <FilterSidebar />
      </aside>
      <main className="posts-section">
        <UserPosts />
      </main>
      <aside className="trending-section">
        <TrendingTopics />
      </aside>
    </div>
  );
};

export default MainLayout;
