import React from 'react';

export default function AmbientBackground() {
  return (
    <>
      <div className="ambient-glow orb-1" aria-hidden="true" />
      <div className="ambient-glow orb-2" aria-hidden="true" />
      <div className="ambient-glow orb-3" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
    </>
  );
}
