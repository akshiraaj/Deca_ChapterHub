import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, collection, addDoc,
  getDocs, query, orderBy, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig, CLUSTERS, CLUSTER_META } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, where, serverTimestamp,
  signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously,
  CLUSTERS, CLUSTER_META
};

export function renderNav(){
  const el = document.getElementById("nav");
  if(!el) return;
  el.innerHTML = `
    <div class="nav-inner">
      <a href="/index.html" class="nav-brand"><span class="dot">◆</span> DECA Chapter Hub</a>
      <div id="nav-user" class="nav-user"></div>
    </div>
  `;
}

export function watchAuth(cb){
  onAuthStateChanged(auth, (user)=>{
    cb(user);
    const userEl = document.getElementById("nav-user");
    if(userEl){
      userEl.innerHTML = user && !user.isAnonymous
        ? `${user.email} &nbsp;·&nbsp; <a href="#" id="logout-link">Log out</a>`
        : "";
      const logoutLink = document.getElementById("logout-link");
      if(logoutLink){
        logoutLink.addEventListener("click", async (e)=>{
          e.preventDefault();
          await signOut(auth);
          window.location.href = "/index.html";
        });
      }
    }
  });
}

export function requireAuth(){
  return new Promise((resolve)=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      unsub();
      if(!user || user.isAnonymous){
        window.location.href = "/index.html";
      } else {
        resolve(user);
      }
    });
  });
}

export async function getUserProfile(uid){
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function isExec(uid){
  const snap = await getDoc(doc(db, "execs", uid));
  return snap.exists() ? snap.data() : null;
}

export function showMsg(el, text, type){
  el.textContent = text;
  el.className = "msg show " + (type === "error" ? "msg-error" : "msg-success");
}

export function fmtDate(ts){
  if(!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString(undefined,{month:"short", day:"numeric", year:"numeric"});
}