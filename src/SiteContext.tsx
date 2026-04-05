import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { Toast, ToastType } from './components/UI';
import { AnimatePresence } from 'motion/react';

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  pricing: {
    name: string;
    price: string;
    description: string;
    features: string[];
  }[];
  contact: {
    phones: string[];
    email: string;
    address: string;
    mapLink: string;
  };
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: 'user' | 'admin' | 'super_admin';
  status: 'pending' | 'approved' | 'rejected';
}

interface SiteContextType {
  content: SiteContent | null;
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  updateContent: (newContent: SiteContent) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    title: "GISHWATI MUKURA",
    subtitle: "Where the mist meets the canopy. Experience the breathtaking biodiversity of Rwanda's most vibrant rainforest ecosystem.",
    ctaText: "Book Your Expedition"
  },
  pricing: [
    {
      name: 'Day Explorer',
      price: '$10',
      description: 'Perfect for a quick escape into nature.',
      features: ['Guided Forest Walk', 'Bird Watching', 'Park Entry Fees', 'Packed Lunch']
    },
    {
      name: 'Primate Trek',
      price: '$30',
      description: 'The ultimate wildlife experience.',
      features: ['Chimpanzee Tracking', 'Golden Monkey Visit', 'Expert Naturalist Guide', 'Photography Permit', 'Lunch & Refreshments']
    },
    {
      name: 'Overnight Safari',
      price: '$50',
      description: 'Deep immersion in the rainforest.',
      features: ['2-Day Guided Tour', 'Luxury Eco-Lodge Stay', 'Night Forest Walk', 'All Meals Included', 'Private Transportation']
    }
  ],
  contact: {
    phones: ['+250 789 505 766', '+250 924 269 38'],
    email: 'hello@gishwatitour.rw',
    address: 'Gishwati-Mukura HQ, Rubavu, Rwanda',
    mapLink: 'https://maps.app.goo.gl/hj4VTvifNbcbu1sP7'
  }
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    // Listen for Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch or create user profile
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            // Check if pre-authorized
            let isPreauthorized = false;
            if (firebaseUser.email) {
              const preAuthDoc = await getDoc(doc(db, 'preauthorizedAdmins', firebaseUser.email));
              isPreauthorized = preAuthDoc.exists();
            }

            // Create default profile
            const isSuperAdmin = firebaseUser.email === 'ishimwekevin199@gmail.com';
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName,
              role: isSuperAdmin ? 'super_admin' : (isPreauthorized ? 'admin' : 'user'),
              status: (isSuperAdmin || isPreauthorized) ? 'approved' : 'pending'
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Listen for Content changes
    const contentDocRef = doc(db, 'content', 'site');
    const unsubscribeContent = onSnapshot(contentDocRef, (doc) => {
      if (doc.exists()) {
        setContent(doc.data() as SiteContent);
      } else {
        // Initialize with default content if it doesn't exist
        setContent(DEFAULT_CONTENT);
        // Only admins can write, so we don't auto-initialize here to avoid permission errors
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'content/site');
    });

    return () => {
      unsubscribeAuth();
      unsubscribeContent();
    };
  }, []);

  const updateContent = async (newContent: SiteContent) => {
    try {
      await setDoc(doc(db, 'content', 'site'), newContent);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'content/site');
    }
  };

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin' || user?.email === 'ishimwekevin199@gmail.com';
  const isSuperAdmin = profile?.role === 'super_admin' || user?.email === 'ishimwekevin199@gmail.com';

  return (
    <SiteContext.Provider value={{ content, user, profile, loading, isAdmin, isSuperAdmin, updateContent, showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
