export const get_query_key = (key) => {
  return { all_items: key, single_item: (id) => [key, id] };
};

export const ENDPOINTS = {
  SOCIAL_PLATFORM: "social-platform",
  CONFIGURATION: "configuration",
  PROFILES: "profiles",
  TEAM_MEMBER: "team-member",
  CONTACTS: "contact-us",
  CREDENTIALS: "credentials",
  TIMELINE_YEAR: "timeline-year",
  TIMELINE_HISTORY: "timeline-history",
};

export const CREATE = "create";
export const UPDATE = "update";
export const DELETE = "delete";

export const API_URL = "http://localhost:8001"