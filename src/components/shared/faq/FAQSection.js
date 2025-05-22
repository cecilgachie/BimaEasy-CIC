import { useState, useEffect, useContext } from 'react';
import { getFAQsByCategory, faqCategories, searchFAQs } from '../../../data/FAQData';
import { ThemeContext } from '../../../ThemeContext';
import '../../../styles/auth.css';
import '../../../styles/faqs.css';

/**
 * Reusable FAQ Section component that can be used across the application
 * @param {Object} props - Component props
 * @param {boolean} props.showTitle - Whether to show the main title (default: true)
 * @param {boolean} props.showCategories - Whether to show category filters (default: true)
 * @param {boolean} props.showSearch - Whether to show search input (default: true)
 * @param {boolean} props.showContactCTA - Whether to show contact CTA section (default: true)
 * @param {string} props.defaultCategory - Default category to show (default: 'all')
 * @param {number} props.maxItems - Maximum number of FAQs to display (default: all)
 * @param {string} props.categoryFilter - Only show FAQs from this category (overrides user selection)
 */
const FAQSection = ({
  showTitle = true,
  showCategories = true,
  showSearch = true,
  showContactCTA = true,
  defaultCategory = 'all',
  maxItems = null,
  categoryFilter = null
}) => {
  // Get theme context for styling
  useContext(ThemeContext);
  // Get initial FAQs to initialize activeItems correctly
  const initialFaqs = categoryFilter
    ? getFAQsByCategory(categoryFilter)
    : getFAQsByCategory(defaultCategory);

  const initialMaxedFaqs = maxItems && initialFaqs.length > maxItems
    ? initialFaqs.slice(0, maxItems)
    : initialFaqs;

  // State to track which FAQ items are open - initialize with all current FAQ IDs set to false
  const [activeItems, setActiveItems] = useState(() => {
    const initialState = {};
    initialMaxedFaqs.forEach(faq => {
      initialState[faq.id] = false;
    });
    return initialState;
  });

  const [activeCategory, setActiveCategory] = useState(categoryFilter || defaultCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(initialMaxedFaqs);

  // Toggle FAQ item open/closed
  const toggleItem = (id) => {
    setActiveItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Update filtered FAQs when category or search changes
  useEffect(() => {
    let results = [];

    if (searchTerm.trim()) {
      // Search takes precedence over category
      results = searchFAQs(searchTerm);
    } else {
      // Otherwise filter by category
      const effectiveCategory = categoryFilter || activeCategory;
      results = getFAQsByCategory(effectiveCategory);
    }

    // Apply maxItems limit if specified
    if (maxItems && results.length > maxItems) {
      results = results.slice(0, maxItems);
    }

    // Update activeItems with any new FAQs that weren't in the previous state
    setActiveItems(prev => {
      const newState = {...prev};
      results.forEach(faq => {
        if (newState[faq.id] === undefined) {
          newState[faq.id] = false;
        }
      });
      return newState;
    });

    setFilteredFaqs(results);
  }, [activeCategory, searchTerm, maxItems, categoryFilter]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category changes
  const handleCategoryChange = (categoryId) => {
    if (!categoryFilter) {
      setActiveCategory(categoryId);
      setSearchTerm(''); // Clear search when changing categories
    }
  };

  return (
    <div className="faq-section">
      {showTitle && <h2>Frequently Asked Questions</h2>}

      {/* Search input */}
      {showSearch && (
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="faq-search-input"
          />
          <span className="faq-search-icon">🔍</span>
        </div>
      )}

      {/* Category filters */}
      {showCategories && !categoryFilter && (
        <div className="faq-categories">
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`faq-category-btn ${activeCategory === category.id ? 'active' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* FAQ items */}
      <div className="faq-container">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeItems[faq.id] ? 'active' : ''}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleItem(faq.id)}
              >
                {faq.question}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="faq-empty-state">
            <p>
              {searchTerm
                ? "No FAQs match your search. Please try different keywords or browse by category."
                : "No FAQs available in this category."}
            </p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      {showContactCTA && (
        <div className="faq-contact-cta">
          <h3 className="faq-contact-title">Can't find what you're looking for?</h3>
          <p className="faq-contact-text">
            Our customer support team is ready to assist you with any questions you may have.
          </p>
          <div className="faq-contact-buttons">
            <a href="tel:0703099120" className="faq-contact-btn">
              Call Us
            </a>
            <a href="mailto:callc@cic.co.ke" className="faq-contact-btn">
              Email Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;