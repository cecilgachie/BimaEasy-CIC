import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFAQsByCategory } from '../../../data/FAQData';
import '../../../styles/faqs.css';

/**
 * Small FAQ widget that can be embedded anywhere in the application
 * @param {Object} props
 * @param {string} props.title - Optional widget title
 * @param {string} props.category - Category to filter FAQs (required)
 * @param {number} props.maxItems - Maximum number of FAQs to display (default: 2)
 * @param {boolean} props.showViewAll - Show the View All link (default: true)
 * @param {string} props.style - Optional styling variants ('compact', 'bordered', 'default')
 */
const FAQWidget = ({
  title = "Common Questions",
  category,
  maxItems = 2,
  showViewAll = true,
  style = 'default'
}) => {
  const [activeItems, setActiveItems] = useState({});

  // Get FAQs for the specified category
  const faqs = getFAQsByCategory(category).slice(0, maxItems);

  // Toggle FAQ item open/closed
  const toggleItem = (id) => {
    setActiveItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get CSS class based on style prop
  const getStyleClass = () => {
    switch(style) {
      case 'compact':
        return 'compact';
      case 'bordered':
        return 'bordered';
      default:
        return '';
    }
  };

  const styleClass = getStyleClass();

  return (
    <div className={`faq-widget ${styleClass}`}>
      {title && (
        <h4 className="faq-widget-title">
          {title}
        </h4>
      )}

      <div className="faq-widget-content">
        {faqs.length > 0 ? (
          faqs.map(faq => (
            <div
              key={faq.id}
              className={`faq-widget-item ${activeItems[faq.id] ? 'active' : ''}`}
            >
              <div
                className="faq-widget-question"
                onClick={() => toggleItem(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-widget-arrow">▼</span>
              </div>

              {activeItems[faq.id] && (
                <div className="faq-widget-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="faq-widget-empty">
            No FAQs available.
          </p>
        )}
      </div>

      {showViewAll && faqs.length > 0 && (
        <div className="faq-widget-footer">
          <Link to="/faqs" className="faq-widget-view-all">
            View all FAQs
          </Link>
        </div>
      )}
    </div>
  );
};

export default FAQWidget;