// ============================================================
// PASTE YOUR FIREBASE CONFIG HERE
// Firebase Console → Project Settings → General → Your apps → SDK setup and config
// ============================================================
export const firebaseConfig = {
  apiKey: "AIzaSyD9_nCeFYOlhyK0ckN7dcRcSBGLc8oJvF4",
  authDomain: "deca-chapter-hub-23513.firebaseapp.com",
  projectId: "deca-chapter-hub-23513",
  storageBucket: "deca-chapter-hub-23513.firebasestorage.app",
  messagingSenderId: "54897593265",
  appId: "1:54897593265:web:935819b251391b1c374b90"
};

// List of clusters/teams in your chapter — edit freely.
export const CLUSTERS = [
  "Marketing",
  "Finance",
  "Hospitality & Tourism",
  "Business Management & Administration",
  "Entrepreneurship",
  "Principles"
];

export const CLUSTER_META = {
  "Finance": { color: "#639922", badge: "/assets/finance-foxes.svg", nickname: "Fox" },
  "Marketing": { color: "#993556", badge: "/assets/marketing-monkeys.svg", nickname: "Monkey" },
  "Hospitality & Tourism": { color: "#185FA5", badge: "/assets/hospitality.svg", nickname: "Horse" },
  "Business Management & Administration": { color: "#BA7517", badge: "/assets/admin-alligators.svg", nickname: "Alligator" },
  "Entrepreneurship": { color: "#534AB7", badge: "/assets/entrepreneurship.svg", nickname: "Phoenix" },
  "Principles": { color: "#D85A30", badge: "/assets/principles.svg", nickname: "Wolf" }
};