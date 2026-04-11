import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Download } from "lucide-react";
import { FEATURE_SERVER_HOUSE_AND_ROOM } from "@/config/productFeatures";

type NavItem = { label: string; path: string };
type NavGroup = { group: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "What is Qocent", path: "/docs/overview" },
      { label: "Terminologies", path: "/docs/terminologies" },
    ],
  },
  {
    group: "Getting Started",
    items: [
      { label: "Quick Start Guide", path: "/docs/quick-start" },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      { label: "Creating a Server Site", path: "/docs/server-site" },
      ...(FEATURE_SERVER_HOUSE_AND_ROOM
        ? [
            { label: "Creating a Server House", path: "/docs/server-house" },
            { label: "Creating a Server Room", path: "/docs/server-room" },
          ]
        : []),
    ],
  },
  {
    group: "Team & Access",
    items: [
      { label: "Inviting Accounts", path: "/docs/inviting-accounts" },
    ],
  },
];

const DocsSidebar = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(navGroups.map((g) => [g.group, true]))
  );

  const toggle = (group: string) =>
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 px-3">
        Documentation
      </p>
      {navGroups.map(({ group, items }) => (
        <div key={group}>
          <button
            onClick={() => toggle(group)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600 transition-colors"
          >
            {group}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                openGroups[group] ? "rotate-180" : ""
              }`}
            />
          </button>
          {openGroups[group] && (
            <ul className="mt-0.5 space-y-0.5">
              {items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-sm px-3 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? "bg-gray-100 text-black font-medium"
                          : "text-gray-500 hover:text-black hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="mt-8">
        <a
          href="/Qocent User Guide.pdf"
          download
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-white bg-red-700 hover:bg-white hover:text-red-700 border border-red-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download User Guide
        </a>
      </div>
    </nav>
  );
};

export default DocsSidebar;
