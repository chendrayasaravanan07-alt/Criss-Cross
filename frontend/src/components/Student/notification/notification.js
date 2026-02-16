const notifications = [
  // ===== TODAY =====
  {
    id: 1,
    section: "TODAY",
    title: "New AI Hackathon Posted!",
    message:
      "AI & Robotics Summit 2025 - $75,000 prize pool. Matches your interests in AI & Machine Learning.",
    tag: "AI & Robotics Summit 2025",
    time: "2 hours ago",
    type: "event",      // blue icon
    unread: true,
    action: true,       // View Event button
  },
  {
    id: 2,
    section: "TODAY",
    title: "Registration Deadline Approaching",
    message:
      "Only 2 days left to register for AI Innovation Challenge 2025 (Bookmarked Event). Don’t miss out!",
    tag: "AI Innovation Challenge 2025",
    time: "5 hours ago",
    type: "warning",    // red icon
    unread: true,
    action: false,
  },
  {
    id: 3,
    section: "TODAY",
    title: "3 New Events Added",
    message:
      "New hackathons in Healthcare, Climate Tech, and Education are now available.",
    time: "7 hours ago",
    type: "event",
    unread: false,
    action: true,
  },
  {
    id: 4,
    section: "TODAY",
    title: "Event Starting Tomorrow",
    message:
      "Climate Tech Challenge starts in 24 hours. Make sure you’re prepared!",
    tag: "Climate Tech Challenge",
    time: "8 hours ago",
    type: "event",
    unread: true,
    action: false,
  },

  // ===== THIS WEEK =====
  {
    id: 5,
    section: "THIS WEEK",
    title: "Registration Confirmed",
    message:
      "You’ve successfully registered for Startup Weekend 2025. Check your email for details.",
    tag: "Startup Weekend 2025",
    time: "Yesterday",
    type: "success",    // green icon
    unread: false,
    action: false,
  },
  {
    id: 6,
    section: "THIS WEEK",
    title: "Bookmarked Event Deadline",
    message:
      "Registration for Fintech Revolution 2025 (Bookmarked Event) closes in 5 days.",
    tag: "Fintech Revolution 2025",
    time: "2 days ago",
    type: "warning",
    unread: false,
    action: false,
  },
  {
    id: 7,
    section: "THIS WEEK",
    title: "Featured Event Posted",
    message:
      "Space Tech Challenge – NASA sponsored event with $100,000 prize pool!",
    tag: "Space Tech Challenge",
    time: "3 days ago",
    type: "event",
    unread: false,
    action: true,
  },

  // ===== EARLIER =====
  {
    id: 8,
    section: "EARLIER",
    title: "Registration Deadline Reminder",
    message:
      "EdTech Builders Summit (Bookmarked Event) registration deadline is tomorrow!",
    tag: "EdTech Builders Summit",
    time: "1 week ago",
    type: "warning",
    unread: false,
    action: false,
  },
  {
    id: 9,
    section: "EARLIER",
    title: "New Events in Your Area",
    message:
      "5 new hackathons posted near San Francisco. Check them out!",
    time: "1 week ago",
    type: "event",
    unread: false,
    action: true,
  },
  {
    id: 10,
    section: "EARLIER",
    title: "Event Starting Soon",
    message:
      "Healthcare Innovation Sprint starts in 3 hours. Get ready!",
    tag: "Healthcare Innovation Sprint",
    time: "2 weeks ago",
    type: "event",
    unread: false,
    action: false,
  },
];

export default notifications;
