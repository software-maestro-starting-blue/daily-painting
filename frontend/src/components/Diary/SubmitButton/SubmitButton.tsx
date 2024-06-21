import React from 'react';
import './SubmitButton.css';

interface Props {
  loading: boolean;
}

const SubmitButton = (props: Props) => {
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
