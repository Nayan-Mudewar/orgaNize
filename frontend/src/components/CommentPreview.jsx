import React from 'react';

export default function CommentPreview({ comments, loading }) {
  if (!loading && comments.length === 0) return null;
  
  return (
    <div className="relative z-0">
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 max-w-full">
        {loading ? (
          <div className="text-sm text-gray-500">Loading comments...</div>
        ) : (
          <div className="space-y-2">
            {comments.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {c.userName?.charAt(0)?.toUpperCase()}
                </div>
                <div className="text-xs">
                  <div className="font-medium text-gray-800">{c.userName}</div>
                  <div className="text-gray-600 truncate max-w-[220px]">{c.text}</div>
                </div>
              </div>
            ))}
            {comments.length > 3 && (
              <div className="text-xs text-blue-600 font-medium">View all comments ({comments.length})</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
