import React, { useState } from 'react';
import { StylePreferences } from '../types';
import { WEATHER_OPTIONS, CONTEXT_OPTIONS, REGION_OPTIONS, BODY_TYPE_OPTIONS, FIT_OPTIONS } from '../constants';

interface Props {
  preferences: StylePreferences;
  onChange: (prefs: StylePreferences) => void;
  disabled?: boolean;
}

export const StylePreferencesForm: React.FC<Props> = ({ preferences, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof StylePreferences, value: string | boolean) => {
    onChange({ ...preferences, [key]: value });
  };

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left text-stone-900 hover:bg-stone-50 transition-colors"
        disabled={disabled}
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <div>
             <span className="font-serif text-lg font-medium">Fine-Tune Styling</span>
             <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-0.5">
               {isOpen ? 'Configure Context & Fit' : 'Optional: Weather, Occasion, Fit'}
             </p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
          {/* Weather */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 pl-1">Weather</label>
            <select 
              value={preferences.weather}
              onChange={(e) => handleChange('weather', e.target.value)}
              disabled={disabled}
              className="w-full bg-white border border-stone-200 text-stone-900 text-sm rounded-lg p-2.5 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select Weather...</option>
              {WEATHER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Context */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 pl-1">Specific Occasion</label>
            <select 
              value={preferences.context}
              onChange={(e) => handleChange('context', e.target.value)}
              disabled={disabled}
              className="w-full bg-white border border-stone-200 text-stone-900 text-sm rounded-lg p-2.5 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select Occasion...</option>
              {CONTEXT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Region */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 pl-1">Fashion Context</label>
            <select 
              value={preferences.region}
              onChange={(e) => handleChange('region', e.target.value)}
              disabled={disabled}
              className="w-full bg-white border border-stone-200 text-stone-900 text-sm rounded-lg p-2.5 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select Region / Vibe...</option>
              {REGION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Body Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 pl-1">Body Type (Optional)</label>
            <select 
              value={preferences.bodyType}
              onChange={(e) => handleChange('bodyType', e.target.value)}
              disabled={disabled}
              className="w-full bg-white border border-stone-200 text-stone-900 text-sm rounded-lg p-2.5 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select Body Type...</option>
              {BODY_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

           {/* Fit */}
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 pl-1">Fit Preference</label>
            <select 
              value={preferences.fit}
              onChange={(e) => handleChange('fit', e.target.value)}
              disabled={disabled}
              className="w-full bg-white border border-stone-200 text-stone-900 text-sm rounded-lg p-2.5 focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select Fit...</option>
              {FIT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

           {/* Sustainable Mode Toggle */}
           <div className="space-y-1.5 flex flex-col justify-end">
             <div className="flex items-center gap-3 p-2.5 bg-stone-50 rounded-lg border border-stone-100">
                <div className="flex-1">
                   <span className="text-sm font-serif font-medium text-stone-900 flex items-center gap-2">
                     <svg className="w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                     </svg>
                     Eco-Conscious Mode
                   </span>
                   <p className="text-[10px] text-stone-500">Prioritize timeless, re-wearable styling.</p>
                </div>
                <button 
                  onClick={() => handleChange('isEcoMode', !preferences.isEcoMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.isEcoMode ? 'bg-green-700' : 'bg-stone-300'}`}
                >
                  <span className={`${preferences.isEcoMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`} />
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};