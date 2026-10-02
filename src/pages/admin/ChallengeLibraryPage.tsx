import React, { useState } from 'react';
import { ChallengeList } from '../../components/admin/ChallengeList';
import { ChallengeEditorModal } from '../../components/admin/ChallengeEditorModal';
import type { Challenge } from '../../types/challenge';

export const ChallengeLibraryPage: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [challengeToEdit, setChallengeToEdit] = useState<Challenge | null>(null);
  const [, setRefreshKey] = useState(0);

  const handleEdit = (challenge: Challenge) => {
    setChallengeToEdit(challenge);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setChallengeToEdit(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <ChallengeList onEditChallenge={handleEdit} onAddNew={handleAddNew} />

      <ChallengeEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        challengeToEdit={challengeToEdit}
        onSaved={() => setRefreshKey((k) => k + 1)}
      />
    </div>
  );
};

