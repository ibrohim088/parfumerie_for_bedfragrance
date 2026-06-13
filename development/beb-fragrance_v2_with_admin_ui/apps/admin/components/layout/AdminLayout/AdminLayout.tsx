"use client";

import React, { useState, useCallback } from "react";
import styles from "./AdminLayout.module.scss";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { AdminHeader } from "../AdminHeader/AdminHeader";

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  activePath?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = "Dashboard",
  breadcrumbs = [],
  activePath = "/dashboard",
  user,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.layout}>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarCollapsed} ${isMobileSidebarOpen ? styles.sidebarMobileOpen : ""}`}
      >
        <AdminSidebar
          isCollapsed={!isSidebarOpen}
          activePath={activePath}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />
      </aside>

      {isMobileSidebarOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`${styles.main} ${isSidebarOpen ? styles.mainExpanded : styles.mainCollapsed}`}>
        <AdminHeader
          title={title}
          breadcrumbs={breadcrumbs}
          onMenuToggle={toggleMobileSidebar}
          user={user}
        />

        <main className={styles.content}>
          <div className={styles.contentInner}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
