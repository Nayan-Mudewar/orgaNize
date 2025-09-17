import React from 'react';

export default function CommentPreview({ comments, loading }) {
  return (
    <div className="mt-3">
      <div className="bg-gray-50/90 backdrop-blur-sm rounded-lg p-2 shadow-sm max-w-full">
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
