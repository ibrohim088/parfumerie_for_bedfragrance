"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./AdminHeader.module.scss";

interface AdminHeaderProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  onMenuToggle?: () => void;
  onLogout?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  notifications?: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Dashboard",
  breadcrumbs = [],
  onMenuToggle,
  onLogout,
  user = {
    name: "Admin User",
    email: "admin@bebfragrance.uz",
    role: "Super Admin",
  },
  notifications = 3,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const mockNotifications = [
    { id: 1, text: "New order #1234 received", time: "2 min ago", unread: true },
    { id: 2, text: "Product 'Rose Elixir' is low on stock", time: "15 min ago", unread: true },
    { id: 3, text: "User 'Jane Doe' registered", time: "1 hour ago", unread: true },
    { id: 4, text: "Payment confirmed for order #1230", time: "3 hours ago", unread: false },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuToggle}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className={styles.breadcrumbWrap}>
          {breadcrumbs.length > 0 ? (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                  {crumb.href ? (
                    <a href={crumb.href} className={styles.breadcrumbLink}>
                      {crumb.label}
                    </a>
                  ) : (
                    <span className={index === breadcrumbs.length - 1 ? styles.breadcrumbCurrent : styles.breadcrumbLink}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          ) : (
            <h1 className={styles.pageTitle}>{title}</h1>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.notifications} ref={notificationsRef}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsNotificationsOpen((v) => !v)}
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifications > 0 && (
              <span className={styles.badge}>{notifications}</span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <span>Notifications</span>
                <button className={styles.markAllRead}>Mark all read</button>
              </div>
              <ul className={styles.notificationList}>
                {mockNotifications.map((n) => (
                  <li key={n.id} className={`${styles.notificationItem} ${n.unread ? styles.unread : ""}`}>
                    <p className={styles.notificationText}>{n.text}</p>
                    <span className={styles.notificationTime}>{n.time}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.dropdownFooter}>
                <a href="/notifications">View all</a>
              </div>
            </div>
          )}
        </div>

        <div className={styles.profile} ref={profileRef}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setIsProfileOpen((v) => !v)}
            aria-label="User menu"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarFallback}>{getInitials(user.name)}</div>
            )}
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{user.name}</span>
              <span className={styles.profileRole}>{user.role}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.chevron}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownProfile}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className={styles.dropdownAvatar} />
                ) : (
                  <div className={styles.dropdownAvatarFallback}>{getInitials(user.name)}</div>
                )}
                <div>
                  <p className={styles.dropdownName}>{user.name}</p>
                  <p className={styles.dropdownEmail}>{user.email}</p>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              <a href="/profile" className={styles.dropdownItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </a>
              <a href="/settings" className={styles.dropdownItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                Settings
              </a>
              <div className={styles.dropdownDivider} />
              <button type="button" className={`${styles.dropdownItem} ${styles.logout}`} onClick={onLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;