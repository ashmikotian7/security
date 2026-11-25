import React from 'react';

const THOUGHTFUL_WISHES = [
  {
    id: 'wisdom',
    theme: 'Wisdom & Growth',
    icon: '🌱',
    quote:
      "Happy Birthday, Rakshith! May this new chapter bring you clarity of purpose, inner peace, and the courage to pursue the goals that truly matter to you. May every experience become a stepping stone toward becoming the best version of yourself."
  },
  {
    id: 'serenity',
    theme: 'Health & Serenity',
    icon: '✨',
    quote:
      "Beyond all achievements and milestones, I wish you vibrant health, sound sleep, genuine contentment, and quiet confidence every single day. Take time to celebrate who you are and everything you have overcome."
  },
  {
    id: 'friendship',
    theme: 'Gratitude & Bond',
    icon: '🤝',
    quote:
      "To an irreplaceable and true friend: Thank you for your warmth, reliability, and the positive energy you bring wherever you go. Life is immeasurably richer with you in it. May this year repay you with boundless happiness and unforgettable memories."
  }
];

export default function ThoughtfulWishes() {
  return (
    <section className="thoughtful-section">
      <div className="thoughtful-header">
        <span className="thoughtful-badge">HEARTFELT REFLECTIONS</span>
        <h2 className="thoughtful-title">Thoughtful Wishes for Rakshith</h2>
        <p className="thoughtful-subtitle">
          Sincere reflections and heartfelt blessings for the extraordinary journey ahead.
        </p>
      </div>

      <div className="thoughtful-grid">
        {THOUGHTFUL_WISHES.map((item) => (
          <div key={item.id} className="thoughtful-card">
            <div className="thoughtful-card-top">
              <span className="thoughtful-icon">{item.icon}</span>
              <span className="thoughtful-theme">{item.theme}</span>
            </div>

            <blockquote className="thoughtful-text">
              "{item.quote}"
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
