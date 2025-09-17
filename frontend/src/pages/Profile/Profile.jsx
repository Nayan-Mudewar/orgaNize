import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import useProfile from '../../hooks/useProfile';

function ProfileContent({ profile, isEditing, setIsEditing, editForm, setEditForm, handleUpdate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-3xl text-white font-semibold">
            {profile.name?.charAt(0)?.toUpperCase()}
          </span>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          {['name','email'].map((f) => (
            <div key={f}>
              <label className="block text-sm text-gray-600">{f[0].toUpperCase()+f.slice(1)}</label>
              <input
                type={f === 'email' ? 'email' : 'text'}
                value={editForm[f]}
                onChange={(e) => setEditForm({ ...editForm, [f]: e.target.value })}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {['name','email','role'].map((f) => (
            <div key={f} className="border-b pb-2">
              <label className="block text-sm text-gray-600">{f[0].toUpperCase()+f.slice(1)}</label>
              <div className="text-lg">{profile[f] || (f==='role' && 'User')}</div>
            </div>
          ))}
          <div className="flex justify-end">
            <button onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Profile({ isOpen, onClose }) {
  const isRouteRender = typeof isOpen === 'undefined';
  const visible = isRouteRender ? true : !!isOpen;
  const navigate = useNavigate();

  const {
    profile, editForm, setEditForm,
    isEditing, setIsEditing,
    loading, error, handleUpdate
  } = useProfile(visible);

  if (!visible) return null;
  const handleClose = () => (onClose ? onClose() : navigate('/dashboard'));

  const body = (
    <>
      {loading ? <div className="text-center py-4">Loading...</div>
      : error ? <div className="text-red-500 text-center py-4">{error}</div>
      : profile && (
        <ProfileContent
          profile={profile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );

  return isRouteRender ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">{body}</div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        {body}
      </div>
    </div>
  );
}
