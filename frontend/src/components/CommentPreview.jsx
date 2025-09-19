import React, { useState } from 'react';

export default function CommentPreview({ comments, loading }) {
  const [/*showAll*/, /*setShowAll*/] = useState(false);

  return (
    <div className="relative z-0">
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 max-w-full">
        {loading ? (
          <div className="text-sm text-gray-500">Loading comments...</div>
        ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {(!comments || comments.length === 0) ? (
              <div className="text-sm text-gray-500">No comments yet</div>
            ) : (
              comments.map((c) => {
                const displayName = c?.Name || c?.name || c?.userName || c?.username || 'Unknown User';
                const initial = displayName?.charAt(0)?.toUpperCase() || 'U';
                return (
                  <div key={c.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {initial}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-gray-800">{displayName}</div>
                      <div className="text-gray-600 break-words max-w-[220px]">
                        {c.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
