import { useState } from "react";
import Header from "./components/layout/Header";
import TabNavigation from "./components/layout/TabNavigation";
import ReadingRecordPage from "./pages/ReadingRecordPage";
import LibraryPage from "./pages/LibraryPage";
import StatisticsPage from "./pages/StatisticsPage";

const TABS = {
  RECORD: "record",
  LIBRARY: "library",
  STATISTICS: "statistics",
};

function App() {
  const [activeTab, setActiveTab] = useState(TABS.RECORD);

  const renderPage = () => {
    switch (activeTab) {
      case TABS.RECORD:
        return <ReadingRecordPage />;
      case TABS.LIBRARY:
        return <LibraryPage />;
      case TABS.STATISTICS:
        return <StatisticsPage />;
      default:
        return <ReadingRecordPage />;
    }
  };

  return (
    <div className="app">
      <Header />
      <TabNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="main-container">{renderPage()}</main>
    </div>
  );
}

export default App;