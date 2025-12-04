import React from 'react';
import './HistoryView.css';

function HistoryView({ responses, onBack }) {
    return (
        <div className="history-view fade-in">
            <div className="view-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <h1>📜 Response History</h1>
            </div>

            {responses.length === 0 ? (
                <div className="empty-history card">
                    <div className="empty-icon">📭</div>
                    <h3>No History Yet</h3>
                    <p>Start an assistant session to see your response history here</p>
                </div>
            ) : (
                <div className="history-list">
                    {responses.map((response, index) => (
                        <div key={index} className="history-item card">
                            <div className="history-header">
                                <span className="history-number">#{responses.length - index}</span>
                                <span className="history-time">
                                    {response.timestamp ? new Date(response.timestamp).toLocaleString() : 'Recent'}
                                </span>
                            </div>
                            <div
                                className="history-content"
                                dangerouslySetInnerHTML={{ __html: response.html || response.text || 'No content' }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HistoryView;
