import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BiHome,
  BiFile,
  BiChat,
  BiBarChart,
  BiCog,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi';
import './Sidebar.css';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`sidebar d-flex flex-column text-white ${collapsed ? 'collapsed' : ''}`}
    >
      <div className="d-flex justify-content-between align-items-center p-3">
        <NavLink
          to="/"
          className="text-white text-decoration-none d-flex align-items-center gap-2"
        >
          {!collapsed && <h5 className="mb-0">🔥 DocAI</h5>}
        </NavLink>
        <button
          className="btn btn-sm toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <BiChevronRight size={20} />
          ) : (
            <BiChevronLeft size={20} />
          )}
        </button>
      </div>

      <ul className="nav nav-pills flex-column mb-auto px-2">
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
            }
          >
            <BiHome size={20} />
            {!collapsed && 'Home'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
            }
          >
            <BiFile size={20} />
            {!collapsed && 'Documents'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
            }
          >
            <BiChat size={20} />
            {!collapsed && 'Chat'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
            }
          >
            <BiBarChart size={20} />
            {!collapsed && 'Analytics'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
            }
          >
            <BiCog size={20} />
            {!collapsed && 'Settings'}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
