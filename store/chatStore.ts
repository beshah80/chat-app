import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

interface PrivacySettings {
  showOnlineStatus: boolean;
  showLastSeen: boolean;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
  senderId: string;
  quotedMessageId?: string;
}

interface ChatState {
  currentUser: User | null;
  privacySettings: PrivacySettings;
  contacts: Contact[];
  chats: Chat[];
  messages: { [chatId: string]: Message[] };
  activeChat: string | null;
  sidebarOpen: boolean;
  viewMode: "chats" | "contacts";
  hydrated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (name: string, avatar: string, bio: string) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  addContact: (name: string, phone: string) => boolean;
  deleteContact: (contactId: string) => void;
  sendMessage: (chatId: string, content: string, quotedMessageId?: string) => void;
  setActiveChat: (chatId: string | null) => void; // FIX: Now accepts string or null
  pinChat: (chatId: string) => void;
  archiveChat: (chatId: string) => void;
  toggleSidebar: () => void;
  setViewMode: (mode: "chats" | "contacts") => void;
  setHydrated: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      privacySettings: {
        showOnlineStatus: true,
        showLastSeen: true,
      },
      contacts: [
        {
          id: "1",
          name: "Fanuel Derbe",
          phone: "+251911223344",
        },
        {
          id: "2",
          name: "Beshah Ashenafi",
          phone: "+251922334455",
        },
        {
          id: "3",
          name: "Amanuel Takile",
          phone: "+251933445566",
        },
        {
          id: "4",
          name: "Gezahegn Birhanu",
          phone: "+251944556677",
        },
      ],
      chats: [
        {
          id: "1",
          name: "Fanuel Derbe",
          lastMessage: "Hey, how are you?",
          lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
          unreadCount: 2,
          isOnline: true,
          isPinned: false,
          isArchived: false,
        },
        {
          id: "2",
          name: "Beshah Ashenafi",
          lastMessage: "Meeting at 3 PM?",
          lastMessageTime: new Date(Date.now() - 45 * 60 * 1000),
          unreadCount: 0,
          isOnline: false,
          isPinned: false,
          isArchived: false,
        },
        {
          id: "3",
          name: "Amanuel Takile",
          lastMessage: "Check out this link!",
          lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
          unreadCount: 1,
          isOnline: true,
          isPinned: false,
          isArchived: false,
        },
        {
          id: "4",
          name: "Gezahegn Birhanu",
          lastMessage: "Let's catch up soon!",
          lastMessageTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
          unreadCount: 3,
          isOnline: false,
          isPinned: false,
          isArchived: false,
        },
      ],
      messages: {
        "1": [
          {
            id: "m1",
            content: "Hi! I’m doing great, thanks!",
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            isOwn: true,
            status: "read",
            senderId: "user",
          },
          {
            id: "m2",
            content: "Hey, how are you?",
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            isOwn: false,
            status: "read",
            senderId: "1",
          },
        ],
        "2": [
          {
            id: "m3",
            content: "Meeting at 3 PM?",
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            isOwn: false,
            status: "delivered",
            senderId: "2",
          },
        ],
        "3": [
          {
            id: "m4",
            content: "Check out this link!",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            isOwn: false,
            status: "read",
            senderId: "3",
          },
        ],
        "4": [
          {
            id: "m5",
            content: "Let's catch up soon!",
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            isOwn: false,
            status: "sent",
            senderId: "4",
          },
        ],
      },
      activeChat: null,
      sidebarOpen: true, // Default to open for large screens
      viewMode: "chats",
      hydrated: true,
      login: (email, password) => {
        if (email === "demo@example.com" && password === "demo123") {
          set({
            currentUser: {
              id: "user",
              name: "Demo User",
              email: "demo@example.com",
              bio: "Hello, I’m using Chat App!",
            },
          });
          return true;
        }
        return false;
      },
      signup: (name, email, password) => {
        if (
          email !== "demo@example.com" &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          password.length >= 6 &&
          name.length >= 2
        ) {
          set({
            currentUser: {
              id: uuidv4(),
              name,
              email,
              bio: "Hello, I’m using Chat App!",
            },
          });
          return true;
        }
        return false;
      },
      logout: () =>
        set({
          currentUser: null,
          activeChat: null,
          sidebarOpen: true,
          viewMode: "chats",
        }),
      updateProfile: (name, avatar, bio) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, name, avatar, bio }
            : state.currentUser,
        })),
      updatePrivacySettings: (settings) =>
        set((state) => ({
          privacySettings: { ...state.privacySettings, ...settings },
        })),
      addContact: (name, phone) => {
        if (!name || !phone || !phone.match(/^\+\d{10,15}$/)) return false;
        const newContact: Contact = {
          id: uuidv4(),
          name,
          phone,
        };
        set((state) => ({
          contacts: [...state.contacts, newContact],
          chats: [
            ...state.chats,
            {
              id: newContact.id,
              name: newContact.name,
              lastMessage: "Started a new chat",
              lastMessageTime: new Date(),
              unreadCount: 0,
              isOnline: false,
              isPinned: false,
              isArchived: false,
            },
          ],
        }));
        return true;
      },
      deleteContact: (contactId) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== contactId),
          chats: state.chats.filter((c) => c.id !== contactId),
          messages: Object.fromEntries(
            Object.entries(state.messages).filter(([id]) => id !== contactId)
          ),
          activeChat:
            state.activeChat === contactId
              ? state.chats.find((c) => !c.isArchived)?.id || null
              : state.activeChat,
        })),
      sendMessage: (chatId, content, quotedMessageId) => {
        const newMessage: Message = {
          id: uuidv4(),
          content,
          timestamp: new Date(),
          isOwn: true,
          status: "sent",
          senderId: get().currentUser?.id || "user",
          quotedMessageId,
        };
        set((state) => ({
          messages: {
            ...state.messages,
            [chatId]: [...(state.messages[chatId] || []), newMessage],
          },
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  lastMessage: content,
                  lastMessageTime: new Date(),
                  unreadCount: 0,
                  isArchived: false,
                }
              : chat
          ),
        }));
      },
      setActiveChat: (chatId) =>
        set((state) => ({
          activeChat: chatId,
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
          ),
          sidebarOpen: false,
        })),
      pinChat: (chatId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
          ),
        })),
      archiveChat: (chatId) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId ? { ...chat, isArchived: !chat.isArchived } : chat
          ),
          activeChat:
            state.activeChat === chatId
              ? state.chats.find((c) => !c.isArchived)?.id || null
              : state.activeChat,
        })),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setViewMode: (mode) => set({ viewMode: mode, sidebarOpen: true }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        privacySettings: state.privacySettings,
        contacts: state.contacts,
        chats: state.chats,
        messages: state.messages,
        activeChat: state.activeChat,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.chats = state.chats.map((chat) => ({
          ...chat,
          lastMessageTime: new Date(chat.lastMessageTime),
        }));
        state.messages = Object.fromEntries(
          Object.entries(state.messages).map(([chatId, messages]) => [
            chatId,
            messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          ])
        );
        state.hydrated = true;
      },
    }
  )
);
