import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { JDMatcher } from './pages/JDMatcher';
import { InterviewPrep } from './pages/InterviewPrep';
import { MockInterview } from './pages/MockInterview';
import { GDTrainer } from './pages/GDTrainer';
import { AppRoute } from './types';

function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return <Dashboard onNavigate={setCurrentRoute} />;
      case AppRoute.RESUME:
        return <ResumeAnalyzer />;
      case AppRoute.JD_MATCH:
        return <JDMatcher />;
      case AppRoute.INTERVIEW_PREP:
        return <InterviewPrep />;
      case AppRoute.MOCK_INTERVIEW:
        return <MockInterview />;
      case AppRoute.GD_TRAINER:
        return <GDTrainer />;
      default:
        return <Dashboard onNavigate={setCurrentRoute} />;
    }
  };

  return (
    <Layout activeRoute={currentRoute} onNavigate={setCurrentRoute}>
      {renderContent()}
    </Layout>
  );
}

export default App;