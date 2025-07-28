'use client';

import { useEffect, useState } from 'react';

export default function TestHackathonPage() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('Testing hackathon API...');
        const res = await fetch('/api/test-hackathon');
        const data = await res.json();
        console.log('Test result:', data);
        setTestResult(data);
      } catch (err) {
        console.error('Test error:', err);
        setTestResult({ error: err.message });
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) {
    return <div className="p-8">Testing API...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hackathon API Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(testResult, null, 2)}
      </pre>
    </div>
  );
} 