import React, { useEffect, useState } from 'react';
import { API_BASE_URL, getApiUrl } from '../config/api';

const DebugAPI: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      setLoading(true);
      const info: any = {
        envVar: import.meta.env.VITE_API_BASE_URL,
        apiBaseUrl: API_BASE_URL,
        testUrl: getApiUrl('api/products'),
        bestSellingUrl: getApiUrl('api/bestselling/featured?limit=8'),
        timestamp: new Date().toISOString(),
        isDev: import.meta.env.DEV
      };

      // Test multiple endpoints
      const endpoints = [
        { name: 'products', url: info.testUrl },
        { name: 'bestselling', url: info.bestSellingUrl }
      ];

      info.tests = {};

      for (const endpoint of endpoints) {
        try {
          console.log(`Testing ${endpoint.name} at:`, endpoint.url);
          
          const response = await fetch(endpoint.url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
          });
          
          info.tests[endpoint.name] = {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            url: response.url
          };
          
          if (response.ok) {
            const data = await response.json();
            info.tests[endpoint.name].data = data;
            info.tests[endpoint.name].dataLength = Array.isArray(data) ? data.length : 'Not an array';
          } else {
            const errorText = await response.text();
            info.tests[endpoint.name].error = errorText;
          }
        } catch (error) {
          info.tests[endpoint.name] = {
            fetchError: error instanceof Error ? error.message : 'Unknown error',
            errorName: error instanceof Error ? error.name : 'Unknown'
          };
          console.error(`${endpoint.name} API Test Error:`, error);
        }
      }

      setDebugInfo(info);
      setLoading(false);
    };

    testAPI();
  }, []);

  if (loading) {
    return <div className="p-4">Testing API connections...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 m-4 rounded">
      <h2 className="text-xl font-bold mb-4">API Debug Information</h2>
      <div className="mb-4">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Test
        </button>
      </div>
      <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-auto max-h-96">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};

export default DebugAPI;