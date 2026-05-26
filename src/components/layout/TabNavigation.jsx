const tabs = [
  {
    id: "record",
    label: "독서 기록",
  },
  {
    id: "library",
    label: "서재",
  },
  {
    id: "statistics",
    label: "통계",
  },
];

function TabNavigation({ activeTab, onChangeTab }) {
  return (
    <nav className="tab-navigation" aria-label="ReadWithMe 탭 메뉴">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onChangeTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabNavigation;