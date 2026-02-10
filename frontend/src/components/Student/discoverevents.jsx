import { useState } from "react";
import Sidebar from "./sidebar";

export default function DiscoverEvents() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge 2025",
      org: "TechCorp Global",
      prize: "$50,000",
      date: "Jan 15–17, 2025",
      location: "San Francisco, CA",
      featured: true,
    },
    {
      id: 2,
      title: "Web3 Summit Hackathon",
      org: "Blockchain Foundation",
      prize: "$30,000",
      date: "Jan 22–24, 2025",
      location: "Virtual",
      featured: true,
    },
    {
      id: 3,
      title: "Startup Weekend 2025",
      org: "Innovation Hub",
      date: "Feb 5–7, 2025",
      location: "New York, NY",
      featured: false,
    },
    {
      id: 4,
      title: "Healthcare Innovation Sprint",
      org: "MedTech Alliance",
      date: "Feb 12–14, 2025",
      location: "Boston, MA",
      featured: false,
    },
  ];

  return (
    <div style={styles.outer}>
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main */}
      <div style={styles.main}>
        <h1 style={styles.heading}>Discover Hackathons</h1>
        <p style={styles.subText}>
          Find and join amazing hackathons from around the world
        </p>

        {/* Search */}
        <div style={styles.searchWrapper}>
          <svg
            style={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            style={styles.search}
            placeholder="Search hackathons by name, organizer, or category..."
          />
        </div>

        <div style={styles.layoutRow}>
          {/* Filters */}
          <div style={styles.filtersColumn}>
            <button
              style={styles.toggleBtnTop}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {showFilters && (
              <div style={styles.filtersCard}>
                <h3 style={styles.filtersTitle}>Filters</h3>

                <FilterBlock
                  title="Participation Type"
                  items={["All", "Solo", "Team"]}
                  name="participation"
                />
                <FilterInput title="Location" placeholder="City" />
                <FilterSelect
                  title="Event Category"
                  options={["All", "AI", "Web3", "Healthcare"]}
                />
                <FilterBlock
                  title="Event Mode"
                  items={["All", "Online", "Offline", "Hybrid"]}
                  name="mode"
                />
              </div>
            )}
          </div>

          {/* Hackathons */}
          <div style={styles.cardsSection}>
            <h2 style={styles.cardsTitle}>Popular Hackathons</h2>
            <p style={styles.subText}>
              Amazing Hackathons You Can Able to Explore
            </p>

            <div style={styles.cards}>
              {hackathons.map((h) => (
                <div key={h.id} style={styles.card}>
                  {h.featured && (
                    <div style={styles.badge}>{h.prize} • Featured</div>
                  )}

                  <div style={styles.cardImage} />

                  <h3 style={styles.cardTitle}>{h.title}</h3>
                  <p style={styles.cardOrg}>{h.org}</p>

                  <div style={styles.cardMeta}>
                    <span>{h.date}</span>
                    <span>{h.location}</span>
                  </div>

                  <button
                    style={styles.viewBtn}
                    onClick={() => setSelectedEvent(h)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>{selectedEvent.title}</h2>

            <p>
              <strong>Organizer:</strong> {selectedEvent.org}
            </p>
            <p>
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>

            {selectedEvent.prize && (
              <p>
                <strong>Prize:</strong> {selectedEvent.prize}
              </p>
            )}

            <button
              style={styles.closeBtn}
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Filters ---------- */

const FilterBlock = ({ title, items, name }) => (
  <div style={styles.filterSection}>
    <p style={styles.sectionTitle}>{title}</p>
    {items.map((i, idx) => (
      <label key={i} style={styles.radioRow}>
        <input type="radio" name={name} defaultChecked={idx === 0} />
        <span>{i}</span>
      </label>
    ))}
  </div>
);

const FilterInput = ({ title, placeholder }) => (
  <div style={styles.filterSection}>
    <p style={styles.sectionTitle}>{title}</p>
    <input style={styles.input} placeholder={placeholder} />
  </div>
);

const FilterSelect = ({ title, options }) => (
  <div style={styles.filterSection}>
    <p style={styles.sectionTitle}>{title}</p>
    <select style={styles.select}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

/* ---------- STYLES ---------- */

const styles = {
  outer: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#fafafa",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  sidebar: {
    width: "18vw",
    backgroundColor: "#f1f5f9",
  },

  main: {
    width: "82vw",
    padding: "2%",
  },

  heading: {
    fontSize: "3vh",
    fontWeight: 700,
  },

  subText: {
    fontSize: "1.7vh",
    color: "#6b7280",
    marginBottom: "1.2%",
  },

  searchWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "1.5%",
  },

  searchIcon: {
    position: "absolute",
    left: "1.5%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "2vh",
    height: "2vh",
    color: "#9ca3af",
  },

  search: {
    width: "100%",
    padding: "1.2% 1.2% 1.2% 4.5%",
    fontSize: "1.7vh",
    borderRadius: "1.6vh",
    border: "1px solid #d1d5db",
  },

  layoutRow: {
    display: "flex",
    gap: "2%",
    height: "70vh",
  },

  filtersColumn: {
    width: "22%",
  },

  toggleBtnTop: {
    width: "100%",
    padding: "4%",
    fontSize: "1.6vh",
    borderRadius: "1.6vh",
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    cursor: "pointer",
    marginBottom: "4%",
  },

  filtersCard: {
    height: "100%",
    overflowY: "auto",
    padding: "6%",
    backgroundColor: "#fff",
    borderRadius: "1.8vh",
    border: "1px solid #e5e7eb",
  },

  filtersTitle: {
    fontSize: "2vh",
    fontWeight: 600,
    marginBottom: "6%",
  },

  filterSection: {
    marginBottom: "6%",
  },

  sectionTitle: {
    fontSize: "1.6vh",
    fontWeight: 600,
    marginBottom: "4%",
  },

  radioRow: {
    display: "flex",
    gap: "6%",
    marginBottom: "3%",
    fontSize: "1.5vh",
  },

  input: {
    width: "100%",
    padding: "6%",
    fontSize: "1.5vh",
    borderRadius: "1.4vh",
    border: "1px solid #d1d5db",
  },

  select: {
    width: "100%",
    padding: "6%",
    fontSize: "1.5vh",
    borderRadius: "1.4vh",
    border: "1px solid #d1d5db",
  },

  cardsSection: {
    width: "78%",
    height: "100%",
    overflowY: "auto",
    paddingRight: "1%",
  },

  cardsTitle: {
    fontSize: "2.3vh",
    fontWeight: 600,
  },

  count: {
    fontSize: "1.5vh",
    color: "#6b7280",
    marginBottom: "2%",
  },

  cards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "3%",
  },

  card: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: "1.8vh",
    border: "1px solid #e5e7eb",
    padding: "2%",
    marginBottom: "3%",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "#fde68a",
    padding: "2% 3%",
    fontSize: "1.3vh",
    borderRadius: "1.4vh",
    fontWeight: 600,
  },

  cardImage: {
    height: "14vh",
    backgroundColor: "#e5e7eb",
    borderRadius: "1.4vh",
    marginBottom: "6%",
  },

  cardTitle: {
    fontSize: "1.9vh",
    fontWeight: 600,
  },

  cardOrg: {
    fontSize: "1.5vh",
    color: "#6b7280",
    marginBottom: "5%",
  },

  cardMeta: {
    fontSize: "1.4vh",
    display: "flex",
    flexDirection: "column",
    gap: "4%",
    marginBottom: "6%",
  },

  viewBtn: {
    width: "100%",
    padding: "4%",
    fontSize: "1.5vh",
    borderRadius: "1.6vh",
    border: "none",
    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    width: "30%",
    backgroundColor: "#fff",
    padding: "2%",
    borderRadius: "1.8vh",
  },

  modalTitle: {
    fontSize: "2.2vh",
    fontWeight: 700,
    marginBottom: "5%",
  },

  closeBtn: {
    marginTop: "6%",
    width: "100%",
    padding: "4%",
    fontSize: "1.6vh",
    borderRadius: "1.6vh",
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};
