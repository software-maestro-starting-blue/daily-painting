import './FeedbackButtonLayout.css';

export interface FeedbackButtonLayoutProps {
    onFeedbackClick: () => void
}

const FeedbackButtonLayout = (props: FeedbackButtonLayoutProps) => {
    const {onFeedbackClick, ...rest} = props;
    
    return (
        <button className="feedbackbutton">
            Feedback
        </button>
    );
}

export default FeedbackButtonLayout;