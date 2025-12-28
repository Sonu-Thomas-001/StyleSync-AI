import React from 'react';
import { Button } from '../components/Button';
import { BrandAnalytic } from '../types';

export const BrandHub: React.FC = () => {
  // Mock Analytics Data
  const analytics: BrandAnalytic[] = [
    { item: 'Oversized Trench', topPairing: 'Distressed Denim', usageCount: 1420, trend: 'up' },
    { item: 'Silk Slip Dress', topPairing: 'Leather Moto Jacket', usageCount: 890, trend: 'stable' },
    { item: 'Chunky Knit', topPairing: 'Pleated Midi Skirt', usageCount: 650, trend: 'up' },
    { item: 'Wide Leg Trouser', topPairing: 'Fitted Bodysuit', usageCount: 420, trend: 'down' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 animate-fade-in-up pb-20">
      
      {/* Brand Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-stone-900 rounded-md flex items-center justify-center text-white font-serif font-bold">B</div>
             <span className="font-bold tracking-tight text-stone-900">BrandHub <span className="text-stone-400 font-normal">by StyleSync</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-stone-500">
            <span className="text-stone-900">Dashboard</span>
            <span>Campaigns</span>
            <span>Catalog</span>
            <div className="w-8 h-8 rounded-full bg-stone-200"></div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
             <h1 className="text-4xl font-serif text-stone-900 mb-2">Burberry Autumn '24</h1>
             <p className="text-stone-500">Live campaign performance & styling insights.</p>
           </div>
           <div className="flex gap-4 mt-4 md:mt-0">
             <Button variant="outline">Export Report</Button>
             <Button variant="primary">Upload New Collection</Button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Generations</span>
             <p className="text-3xl font-serif text-stone-900 mt-2">124.5k</p>
             <span className="text-green-600 text-xs font-medium">↑ 12% vs last week</span>
           </div>
           <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Add to Cart Rate</span>
             <p className="text-3xl font-serif text-stone-900 mt-2">8.4%</p>
             <span className="text-green-600 text-xs font-medium">↑ 2.1% vs avg</span>
           </div>
           <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Top Context</span>
             <p className="text-3xl font-serif text-stone-900 mt-2">Business</p>
             <span className="text-stone-400 text-xs font-medium">34% of all styles</span>
           </div>
           <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
             <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Active SKUs</span>
             <p className="text-3xl font-serif text-stone-900 mt-2">842</p>
             <span className="text-stone-400 text-xs font-medium">98% coverage</span>
           </div>
        </div>

        {/* Deep Dive & Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Styling Matrix */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
             <div className="p-6 border-b border-stone-100 flex justify-between items-center">
               <h3 className="font-serif text-lg text-stone-900">Styling Matrix</h3>
               <span className="text-xs uppercase tracking-widest text-stone-400">What users pair with your items</span>
             </div>
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-stone-50 text-xs font-bold uppercase tracking-widest text-stone-500">
                   <th className="p-4">Item Name</th>
                   <th className="p-4">Most Common Pairing</th>
                   <th className="p-4">Usage</th>
                   <th className="p-4">Trend</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-stone-100">
                 {analytics.map((row, idx) => (
                   <tr key={idx} className="hover:bg-stone-50 transition-colors">
                     <td className="p-4 font-medium text-stone-900">{row.item}</td>
                     <td className="p-4 text-stone-600">{row.topPairing}</td>
                     <td className="p-4 text-stone-900">{row.usageCount}</td>
                     <td className="p-4">
                       <span className={`inline-block w-2 h-2 rounded-full ${row.trend === 'up' ? 'bg-green-500' : row.trend === 'down' ? 'bg-red-400' : 'bg-stone-300'}`}></span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>

          {/* Catalog Upload */}
          <div className="bg-stone-900 text-white rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
             <h3 className="font-serif text-2xl mb-4 relative z-10">Expand Your Reach</h3>
             <p className="text-stone-400 mb-8 relative z-10 leading-relaxed">
               Upload your upcoming season catalog to train the StyleSync engine.
             </p>
             
             <div className="border-2 border-dashed border-stone-700 rounded-xl p-8 flex flex-col items-center justify-center mb-6 relative z-10 hover:border-stone-500 transition-colors cursor-pointer bg-stone-800/50">
               <svg className="w-8 h-8 text-stone-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
               </svg>
               <span className="text-xs uppercase tracking-widest text-stone-400">Drop CSV or JSON</span>
             </div>

             <Button className="w-full bg-white text-stone-900 hover:bg-stone-200 relative z-10">Start Ingestion</Button>
          </div>

        </div>

      </div>
    </div>
  );
};