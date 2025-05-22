import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';
import '../../../styles/faqs.css';

/**
 * MiniFAQ - A compact FAQ component for Dashboard and other pages
 * @param {Object} props
 * @param {string} props.title - Optional custom title
 * @param {string} props.category - Optional category filter
 * @param {number} props.maxItems - Max number of FAQs to show (default: 3)
 * @param {boolean} props.showViewAll - Show link to full FAQ page (default: true)
 */
const MiniFAQ = ({
  title = "Frequently Asked Questions",
  category = null,
  maxItems = 3,
  showViewAll = true
}) => {
  return (
    <div className="mini-faq-container">
      <div className="mini-faq-header">
        <h3 className="mini-faq-title">{title}</h3>

        {showViewAll && (
          <Link to="/faqs" className="mini-faq-view-all">
            View All FAQs
          </Link>
        )}
      </div>

      <FAQSection
        showTitle={false}
        showCategories={false}
        showSearch={false}
        showContactCTA={false}
        defaultCategory="all"
        maxItems={maxItems}
        categoryFilter={category}
      />
    </div>
  );
};

export default MiniFAQ;