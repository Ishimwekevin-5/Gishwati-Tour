import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';
import { Shield, UserX, CheckCircle, XCircle, Clock, Plus, Trash2, Mail } from 'lucide-react';
import { ConfirmModal } from './UI';
import { useSite } from '../SiteContext';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: 'user' | 'admin' | 'super_admin';
  status: 'pending' | 'approved' | 'rejected';
}

interface PreAuthAdmin {
  email: string;
  addedBy: string;
  addedAt: string;
}

export default function UserManagement() {
  const { showToast } = useSite();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [preAuthAdmins, setPreAuthAdmins] = useState<PreAuthAdmin[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: 'danger' | 'primary';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data() as UserProfile);
      setUsers(usersList);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });

    const unsubscribePreAuth = onSnapshot(collection(db, 'preauthorizedAdmins'), (snapshot) => {
      const preAuthList = snapshot.docs.map(doc => doc.data() as PreAuthAdmin);
      setPreAuthAdmins(preAuthList);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'preauthorizedAdmins');
    });

    return () => {
      unsubscribeUsers();
      unsubscribePreAuth();
    };
  }, []);

  const addPreAuthEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    try {
      await setDoc(doc(db, 'preauthorizedAdmins', newEmail), {
        email: newEmail,
        addedBy: auth.currentUser?.email || 'unknown',
        addedAt: new Date().toISOString()
      });
      setNewEmail('');
      showToast('Email pre-authorized successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `preauthorizedAdmins/${newEmail}`);
      showToast('Failed to pre-authorize email', 'error');
    }
  };

  const removePreAuthEmail = async (email: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remove Pre-authorization',
      message: `Are you sure you want to remove ${email} from pre-authorized admins?`,
      variant: 'danger',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'preauthorizedAdmins', email));
          showToast('Pre-authorization removed');
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `preauthorizedAdmins/${email}`);
          showToast('Failed to remove pre-authorization', 'error');
        }
      }
    });
  };

  const updateUserRole = async (uid: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      showToast('User role updated');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
      showToast('Failed to update user role', 'error');
    }
  };

  const updateUserStatus = async (uid: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), { status: newStatus });
      showToast(`User status updated to ${newStatus}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
      showToast('Failed to update user status', 'error');
    }
  };

  const deleteUser = async (uid: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete User',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'users', uid));
          showToast('User deleted successfully');
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `users/${uid}`);
          showToast('Failed to delete user', 'error');
        }
      }
    });
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 mb-2">User Management</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Manage administrators and pre-authorized access permissions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Pre-authorization Section */}
        <div className="lg:col-span-1 space-y-8 animate-in">
          <div className="bg-white border border-zinc-200 rounded-md p-8 space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Access Control</h2>
              <p className="text-lg font-bold text-zinc-950 mt-1">Pre-authorize Email</p>
            </div>
            
            <form onSubmit={addPreAuthEmail} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Email Address</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-md py-2.5 px-4 text-zinc-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-zinc-950 hover:bg-zinc-800 text-white p-2.5 rounded-md transition-all shadow-sm"
                  >
                    <Plus className="w-5 h-5 stroke-[2]" />
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-3">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Authorized Emails</p>
              <div className="space-y-2">
                {preAuthAdmins.map((admin) => (
                  <div key={admin.email} className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-100 rounded-md group">
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-zinc-950 truncate">{admin.email}</p>
                      <p className="text-[10px] text-zinc-400 font-medium truncate">By {admin.addedBy}</p>
                    </div>
                    <button
                      onClick={() => removePreAuthEmail(admin.email)}
                      className="text-zinc-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                ))}
                {preAuthAdmins.length === 0 && (
                  <p className="text-xs text-zinc-400 italic text-center py-4">No pre-authorized emails.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Users Section */}
        <div className="lg:col-span-2 space-y-8 animate-in">
          <div className="bg-white border border-zinc-200 rounded-md overflow-hidden">
            <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
              <h2 className="text-lg font-bold text-zinc-950">Active Users</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mt-1">System Accounts</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50/50 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                  <tr>
                    <th className="px-8 py-4">User</th>
                    <th className="px-8 py-4">Role</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {users.map((user) => (
                    <tr key={user.uid} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-extrabold text-sm">
                            {user.displayName?.[0] || user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-950 text-sm">{user.displayName || 'Anonymous'}</p>
                            <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.uid, e.target.value)}
                          disabled={user.email === 'ishimwekevin199@gmail.com'}
                          className="bg-white border border-zinc-200 rounded-md py-1.5 px-3 text-xs font-bold text-zinc-700 focus:outline-none focus:border-emerald-500 transition-all disabled:opacity-50"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          {user.status === 'approved' && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />}
                          {user.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />}
                          {user.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />}
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            user.status === 'approved' ? 'text-emerald-600' : 
                            user.status === 'pending' ? 'text-amber-500' : 'text-red-500'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'pending' && (
                            <button
                              onClick={() => updateUserStatus(user.uid, 'approved')}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-md transition-all"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5 stroke-[2]" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(user.uid)}
                            disabled={user.email === 'ishimwekevin199@gmail.com'}
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-0"
                            title="Delete User"
                          >
                            <UserX className="w-5 h-5 stroke-[2]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
      />
    </div>
  );
}
