import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ContentProvider } from "../../Contribute/ContentContext";
import HistoryTimeline from "../../HistoryTimeline/HistoryTimeline";

const DashboardContributionLine = () => {
  return (
    <div className="mt-14 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="p-3 ">
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          Volver
        </Link>
        <div>
          <ContentProvider>
            <HistoryTimeline />
          </ContentProvider>
        </div>
      </div>
    </div>
  );
};

export default DashboardContributionLine;
