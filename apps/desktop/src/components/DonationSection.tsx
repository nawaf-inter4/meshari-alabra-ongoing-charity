export function DonationSection() {
  const handleDonate = () => {
    // Open donation URL in default browser
    if (typeof window !== 'undefined') {
      window.open('https://meshari.charity/donation', '_blank');
    }
  };

  return (
    <div className="donation-section">
      <h2>Support the Cause</h2>
      <p>Help continue Meshari's legacy of charity and good deeds.</p>
      <button onClick={handleDonate} className="donate-button">
        Donate Now
      </button>
    </div>
  );
}
