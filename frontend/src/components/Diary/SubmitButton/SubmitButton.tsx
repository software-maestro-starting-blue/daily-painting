import React from 'react';
import './SubmitButton.css';

export interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { loading } = props;

  return (
    <div className="submit-button">
      <button type="submit" disabled={loading}>
        {loading ? '저장중...' : '일기 작성'}
      </button>
    </div>
  );
};

export default SubmitButton;
