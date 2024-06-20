import './FeedbackRoutingButtonLayout.css';

export interface FeedbackRoutingButtonLayoutProps {
    onFeedbackClick: () => void
}

const FeedbackRoutingButtonLayout = (props: FeedbackRoutingButtonLayoutProps) => {
    const {onFeedbackClick, ...rest} = props;
    
    return (
        <button className="feedbackbutton">
            Feedback
        </button>
    );
}

export default FeedbackRoutingButtonLayout;