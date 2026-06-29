import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronDown, Home, Wrench, Calculator, FileText, BarChart3, LogOut, LogIn, Menu, X, Download, Send, Upload } from 'lucide-react';

// ============= CONTEXT FOR USER STATE =============
const UserContext = createContext();

const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [savedQuestions, setSavedQuestions] = useState([]);
const [savedResults, setSavedResults] = useState([]);

const login = (name, email) => {
setUser({ name, email, loginTime: new Date().toLocaleDateString() });
};

const logout = () => {
setUser(null);
};

const saveQuestion = (question) => {
setSavedQuestions([...savedQuestions, { ...question, id: Date.now() }]);
};

const saveCalculatorResult = (result) => {
setSavedResults([...savedResults, { ...result, id: Date.now() }]);
};

return (
<UserContext.Provider value={{ user, login, logout, savedQuestions, saveQuestion, savedResults, saveCalculatorResult }}>
{children}
</UserContext.Provider>
);
};

const useUser = () => useContext(UserContext);

// ============= NAVIGATION COMPONENT =============
const Navigation = ({ currentPage, setCurrentPage }) => {
const { user, logout } = useUser();
const [menuOpen, setMenuOpen] = useState(false);

const navItems = [
{ label: 'Home', id: 'home' },
{ label: 'Ask Question', id: 'ask-question' },
{ label: 'Defect Checker', id: 'defect-checker' },
{ label: 'Calculators', id: 'calculators' },
{ label: 'Templates', id: 'templates' },
{ label: 'Articles', id: 'articles' },
{ label: 'About', id: 'about' },
];

return (
<nav className="sticky top-0 z-50 bg-white shadow-md border-b border-blue-100">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
<div className="flex justify-between items-center">
{/* Logo */}
<div
onClick={() => setCurrentPage('home')}
className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
>
<div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded-lg">
<Home className="w-5 h-5 text-white" />
</div>
<span className="font-bold text-lg text-blue-600 hidden sm:inline">PropertyMate AU</span>
</div>

{/* Desktop Navigation */}
<div className="hidden md:flex items-center gap-1">
{navItems.map(item => (
<button
key={item.id}
onClick={() => setCurrentPage(item.id)}
className={`px-3 py-2 rounded text-sm font-medium transition ${
currentPage === item.id
? 'bg-blue-100 text-blue-700'
: 'text-gray-600 hover:bg-gray-100'
}`}
>
{item.label}
</button>
))}
</div>

{/* User & Mobile Menu */}
<div className="flex items-center gap-3">
{user ? (
<div className="flex items-center gap-3">
<span className="text-sm text-gray-600 hidden sm:inline">{user.name}</span>
<button
onClick={() => logout()}
className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
>
<LogOut className="w-4 h-4" />
<span className="hidden sm:inline">Logout</span>
</button>
</div>
) : (
<button
onClick={() => setCurrentPage('login')}
className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
<LogIn className="w-4 h-4" />
<span className="hidden sm:inline">Login</span>
</button>
)}

{/* Mobile Menu Button */}
<button
onClick={() => setMenuOpen(!menuOpen)}
className="md:hidden p-2 text-gray-600"
>
{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
</button>
</div>
</div>

{/* Mobile Navigation */}
{menuOpen && (
<div className="md:hidden mt-4 space-y-1 border-t pt-4">
{navItems.map(item => (
<button
key={item.id}
onClick={() => {
setCurrentPage(item.id);
setMenuOpen(false);
}}
className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
currentPage === item.id
? 'bg-blue-100 text-blue-700'
: 'text-gray-600 hover:bg-gray-100'
}`}
>
{item.label}
</button>
))}
</div>
)}
</div>
</nav>
);
};

// ============= HOMEPAGE COMPONENT =============
const HomePage = ({ setCurrentPage }) => {
return (
<div className="w-full">
{/* Hero Section */}
<section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-4">
<div className="max-w-4xl mx-auto text-center">
<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
Ask Any Residential Property Question
</h1>
<p className="text-lg text-gray-600 mb-8">
Get simple guidance on defects, warranties, repairs, investment property costs, and tax-related property questions in Australia.
</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
<button
onClick={() => setCurrentPage('ask-question')}
className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
>
Ask a Question
</button>
<button
onClick={() => setCurrentPage('calculators')}
className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
>
Use Calculators
</button>
<button
onClick={() => setCurrentPage('defect-checker')}
className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
>
Check Builder Defects
</button>
</div>

{/* Disclaimer Banner */}
<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded text-left max-w-2xl mx-auto">
<p className="text-sm text-gray-700">
<strong>⚠️ Important Disclaimer:</strong> PropertyMate AU provides general information only and is NOT legal, tax, building, engineering, financial, or accounting advice. Always consult licensed professionals before making decisions.
</p>
</div>
</div>
</section>

{/* Main Search Box */}
<section className="max-w-4xl mx-auto px-4 py-8 -mt-6 relative z-10">
<div className="bg-white rounded-lg shadow-lg p-6">
<label className="block text-sm font-medium text-gray-700 mb-2">Ask your property question:</label>
<input
type="text"
placeholder="E.g., Is this a builder defect? Can I claim this on tax? How much will this repair cost?"
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
onKeyPress={(e) => {
if (e.key === 'Enter') setCurrentPage('ask-question');
}}
/>
<button
onClick={() => setCurrentPage('ask-question')}
className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
>
Get Guidance
</button>
</div>
</section>

{/* Category Cards */}
<section className="max-w-6xl mx-auto px-4 py-12">
<h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Topic</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{[
{ icon: '🔨', title: 'Builder Defects', desc: 'Is it a defect? What to do?' },
{ icon: '📋', title: 'New Home Warranty', desc: 'Coverage & claims explained' },
{ icon: '✅', title: '90-Day Checklist', desc: 'What to check after handover' },
{ icon: '💰', title: 'Investment Tax', desc: 'Tax benefits & deductions' },
{ icon: '📉', title: 'Negative Gearing', desc: 'Understand tax losses' },
{ icon: '📊', title: 'Depreciation', desc: 'Building & contents depreciation' },
{ icon: '🔧', title: 'Repairs & Maintenance', desc: 'DIY vs professional help' },
{ icon: '🏛️', title: 'Council & Strata', desc: 'OC, CDC, approvals' },
{ icon: '🛠️', title: 'DIY Fixes', desc: 'Bunnings options & tips' },
].map((category, idx) => (
<div
key={idx}
className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer hover:border-blue-300 border-2 border-transparent"
onClick={() => setCurrentPage('articles')}
>
<div className="text-4xl mb-3">{category.icon}</div>
<h3 className="font-bold text-gray-900 mb-1">{category.title}</h3>
<p className="text-gray-600 text-sm">{category.desc}</p>
</div>
))}
</div>
</section>

{/* Features Section */}
<section className="bg-gray-50 py-12 px-4 mt-12">
<div className="max-w-4xl mx-auto">
<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
<div className="grid md:grid-cols-3 gap-8">
<div className="text-center">
<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
<span className="text-2xl font-bold text-blue-600">1</span>
</div>
<h3 className="font-bold text-gray-900 mb-2">Ask or Check</h3>
<p className="text-gray-600 text-sm">Ask a question or use our defect checker to diagnose issues.</p>
</div>
<div className="text-center">
<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
<span className="text-2xl font-bold text-green-600">2</span>
</div>
<h3 className="font-bold text-gray-900 mb-2">Get Guidance</h3>
<p className="text-gray-600 text-sm">Receive practical, plain-English guidance tailored to your situation.</p>
</div>
<div className="text-center">
<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
<span className="text-2xl font-bold text-blue-600">3</span>
</div>
<h3 className="font-bold text-gray-900 mb-2">Take Action</h3>
<p className="text-gray-600 text-sm">Use templates, calculators, and next steps to move forward confidently.</p>
</div>
</div>
</div>
</section>

{/* CTA Section */}
<section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-12 px-4 mt-12">
<div className="max-w-2xl mx-auto text-center">
<h2 className="text-3xl font-bold mb-4">Ready to Get Answers?</h2>
<p className="mb-6 text-blue-50">Start with our defect checker or ask a specific question about your property.</p>
<button
onClick={() => setCurrentPage('defect-checker')}
className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-bold"
>
Start Now
</button>
</div>
</section>
</div>
);
};

// ============= ASK QUESTION PAGE =============
const AskQuestionPage = () => {
const [question, setQuestion] = useState('');
const [photos, setPhotos] = useState([]);
const [response, setResponse] = useState(null);
const { user, saveQuestion } = useUser();

const handlePhotoUpload = (e) => {
const file = e.target.files[0];
if (file) {
setPhotos([...photos, { name: file.name, size: (file.size / 1024).toFixed(2) + ' KB' }]);
}
};

const handleSubmit = () => {
if (!question.trim()) {
alert('Please enter a question');
return;
}

const mockResponses = [
{
title: 'Possible Causes Identified',
content: 'Based on your question about builder defects, this could be related to workmanship or materials. Recommend checking against HIA new home warranty coverage.',
nextSteps: ['Take detailed photos', 'Check your builder warranty documents', 'Email the builder with specific details', 'Get a building inspector report if needed'],
},
{
title: 'Tax Deduction Guidance',
content: 'Investment property expenses may be deductible, but it depends on whether costs are for repairs (deductible) vs improvements (depreciated). Consult a tax accountant.',
nextSteps: ['Collect receipts and invoices', 'Categorize as repair or improvement', 'Consult a qualified tax accountant', 'Keep records for 5+ years'],
},
{
title: 'General Guidance Provided',
content: 'PropertyMate AU provides general information about common property issues. For your specific situation, consider speaking with a licensed professional.',
nextSteps: ['Review related articles', 'Use our defect checker tool', 'Consult a qualified professional', 'Save your question for later review'],
},
];

const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
setResponse(mockResponse);

if (user) {
saveQuestion({ question, photoCount: photos.length, timestamp: new Date().toLocaleDateString() });
}
};

return (
<div className="max-w-3xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Your Property Question</h1>
<p className="text-gray-600 mb-8">Describe your issue in detail. Upload photos if relevant. You'll receive practical guidance within seconds.</p>

{/* Disclaimer */}
<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
<p className="text-sm text-gray-700">
<strong>General guidance only:</strong> PropertyMate AU is not providing legal, tax, building, engineering, or financial advice. Consult qualified professionals for decisions.
</p>
</div>

{/* Question Input */}
<div className="bg-white rounded-lg shadow p-6 mb-6">
<label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
<textarea
value={question}
onChange={(e) => setQuestion(e.target.value)}
placeholder="E.g., Is this crack in my kitchen tile a builder defect? Can I claim plumbing repairs on my investment property tax return? How do I calculate cashflow on a rental?"
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
/>
</div>

{/* Photo Upload */}
<div className="bg-white rounded-lg shadow p-6 mb-6">
<label className="block text-sm font-medium text-gray-700 mb-3">Upload Photos (Optional)</label>
<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition">
<input
type="file"
accept="image/*"
onChange={handlePhotoUpload}
className="hidden"
id="photo-upload"
/>
<label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
<Upload className="w-8 h-8 text-gray-400 mb-2" />
<span className="text-gray-600">Click to upload or drag images</span>
<span className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 10MB</span>
</label>
</div>
{photos.length > 0 && (
<div className="mt-4 space-y-2">
{photos.map((photo, idx) => (
<div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded">
<span className="text-sm text-gray-700">{photo.name}</span>
<span className="text-xs text-gray-500">{photo.size}</span>
</div>
))}
</div>
)}
</div>

{/* Submit Button */}
<button
onClick={handleSubmit}
className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
>
<Send className="w-5 h-5" />
Get Guidance
</button>

{/* Response */}
{response && (
<div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
<h2 className="text-2xl font-bold text-gray-900 mb-3">{response.title}</h2>
<p className="text-gray-700 mb-6">{response.content}</p>

<div className="mb-6">
<h3 className="font-bold text-gray-900 mb-3">Suggested Next Steps:</h3>
<ul className="space-y-2">
{response.nextSteps.map((step, idx) => (
<li key={idx} className="flex items-start gap-2">
<span className="text-green-600 font-bold mt-1">✓</span>
<span className="text-gray-700">{step}</span>
</li>
))}
</ul>
</div>

<button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-gray-700 font-medium">
<Download className="w-4 h-4" />
Download as PDF
</button>
</div>
)}
</div>
);
};

// ============= DEFECT CHECKER PAGE =============
const DefectCheckerPage = () => {
const [area, setArea] = useState('');
const [issue, setIssue] = useState('');
const [result, setResult] = useState(null);

const areas = ['Bathroom', 'Kitchen', 'Garage', 'Roof', 'External Wall', 'Concrete', 'Driveway', 'Windows', 'Doors', 'Flooring', 'AC/Heating', 'Plumbing', 'Electrical'];
const issues = ['Crack', 'Gap/Gap', 'Leak', 'Poor Finish', 'Loose Item', 'Damage', 'Noise', 'Drainage Issue', 'Mould', 'Movement'];

const defectDatabase = {
'Garage-Gap': {
isDefect: 'Likely (common defect)',
urgency: 'Medium',
cause: 'Poor weatherproofing seal or frame installation',
photos: 'Close-ups from outside and inside, showing gap width',
questions: 'When did you first notice this? Has it always been this size? Does water come in during rain?',
email: 'Hi [Builder Name], During our 90-day inspection, I noticed a gap between the garage door frame and wall. Can you please investigate and repair? Thank you.',
},
'Roof-Leak': {
isDefect: 'Possible defect',
urgency: 'High',
cause: 'Faulty flashing, roof tile issues, or poor sealing',
photos: 'Interior staining, exterior roof area, close-ups of suspect area',
questions: 'Where exactly is the water coming in? Does it only happen during heavy rain or wind? When did it start?',
email: 'Hi [Builder Name], We have a water leak in the roof during rain. It\'s coming through at [location]. Please inspect and repair urgently. Thank you.',
},
'Concrete-Crack': {
isDefect: 'Possible (depends on severity)',
urgency: 'Low to Medium',
cause: 'Shrinkage, poor finishing, or structural movement',
photos: 'Wide shot of the crack, close-up showing width, ruler for scale',
questions: 'How long is the crack? Is it straight or jagged? Is it getting worse? Any movement underneath?',
email: 'Hi [Builder Name], I\'ve noticed cracks in the concrete [area]. Can you assess if this is within warranty coverage? Thank you.',
},
'Windows-Poor Fit': {
isDefect: 'Likely (workmanship issue)',
urgency: 'Medium',
cause: 'Frame not properly installed or aligned, sealant issues',
photos: 'Wide shot, close-ups showing gaps, photos from inside and outside',
questions: 'Are there visible gaps? Does water leak in? Does the window open/close smoothly? Drafts?',
email: 'Hi [Builder Name], The windows in [room] have visible gaps and I\'m concerned about weatherproofing. Please inspect and repair. Thank you.',
},
};

const handleCheck = () => {
if (!area || !issue) {
alert('Please select both an area and issue type');
return;
}

const key = `${area}-${issue}`;
const defectInfo = defectDatabase[key] || {
isDefect: 'Unclear - needs professional inspection',
urgency: 'Medium (get assessed)',
cause: 'Could be defect, normal settlement, or maintenance issue. Professional assessment recommended.',
photos: 'Clear photos from multiple angles, with good lighting',
questions: 'When did this occur? Has it worsened? Is there any structural movement?',
email: 'Hi [Builder Name], I\'d like to report a potential defect in the [area]. Can you please arrange an inspection? Thank you.',
};

setResult({ area, issue, ...defectInfo });
};

return (
<div className="max-w-3xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Defect Checker</h1>
<p className="text-gray-600 mb-8">Select the area and issue type, and we'll help you understand if it's likely a builder defect.</p>

{/* Disclaimer */}
<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
<p className="text-sm text-gray-700">
<strong>Important:</strong> This tool provides general guidance only. Always consult a qualified building inspector or engineer for professional assessment of structural issues.
</p>
</div>

<div className="grid md:grid-cols-2 gap-6 mb-8">
{/* Area Selection */}
<div className="bg-white rounded-lg shadow p-6">
<label className="block text-sm font-medium text-gray-700 mb-3">Property Area</label>
<select
value={area}
onChange={(e) => setArea(e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="">Select area...</option>
{areas.map(a => (
<option key={a} value={a}>{a}</option>
))}
</select>
</div>

{/* Issue Selection */}
<div className="bg-white rounded-lg shadow p-6">
<label className="block text-sm font-medium text-gray-700 mb-3">Issue Type</label>
<select
value={issue}
onChange={(e) => setIssue(e.target.value)}
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="">Select issue...</option>
{issues.map(i => (
<option key={i} value={i}>{i}</option>
))}
</select>
</div>
</div>

<button
onClick={handleCheck}
className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium mb-8"
>
Check for Defects
</button>

{/* Result */}
{result && (
<div className="space-y-6">
<div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
<h2 className="text-2xl font-bold text-gray-900 mb-4">{result.area} - {result.issue}</h2>

<div className="grid md:grid-cols-2 gap-6 mb-6">
<div className="bg-white rounded p-4 border-l-4 border-orange-400">
<p className="text-xs font-semibold text-orange-600 mb-1">LIKELY A DEFECT?</p>
<p className="text-lg font-bold text-gray-900">{result.isDefect}</p>
</div>
<div className="bg-white rounded p-4 border-l-4 border-red-400">
<p className="text-xs font-semibold text-red-600 mb-1">URGENCY LEVEL</p>
<p className="text-lg font-bold text-gray-900">{result.urgency}</p>
</div>
</div>

<div className="space-y-4">
<div>
<h3 className="font-bold text-gray-900 mb-2">Possible Cause</h3>
<p className="text-gray-700">{result.cause}</p>
</div>

<div>
<h3 className="font-bold text-gray-900 mb-2">Photos to Take</h3>
<p className="text-gray-700">{result.photos}</p>
</div>

<div>
<h3 className="font-bold text-gray-900 mb-2">Questions to Ask Your Builder</h3>
<p className="text-gray-700">{result.questions}</p>
</div>

<div className="bg-white rounded p-4 border border-gray-300">
<h3 className="font-bold text-gray-900 mb-2">Email Template</h3>
<p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">{result.email}</p>
<button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Copy to Clipboard</button>
</div>
</div>
</div>

<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
<p className="text-sm text-gray-700">
<strong>Next Steps:</strong> Document with photos, email your builder, keep copies of all correspondence, and consider a building inspection if the issue is significant.
</p>
</div>
</div>
)}
</div>
);
};

// ============= CALCULATOR PAGE =============
const CalculatorsPage = () => {
const [activeCalc, setActiveCalc] = useState('investment');
const { saveCalculatorResult } = useUser();

// Investment Cashflow Calculator
const InvestmentCalculator = () => {
const [inputs, setInputs] = useState({
propertyValue: 500000,
loanAmount: 400000,
interestRate: 6.5,
weeklyRent: 400,
councilRates: 2000,
water: 600,
strata: 4000,
insurance: 1200,
management: 1440,
repairs: 2000,
landTax: 0,
other: 0,
});

const annualRent = inputs.weeklyRent * 52;
const annualInterest = inputs.loanAmount * (inputs.interestRate / 100);
const totalExpenses = inputs.councilRates + inputs.water + inputs.strata + inputs.insurance + inputs.management + inputs.repairs + inputs.landTax + inputs.other;
const netCashflow = annualRent - totalExpenses - annualInterest;
const monthlyCost = netCashflow / 12;

return (
<div className="space-y-4">
<div className="grid md:grid-cols-2 gap-4">
<input
type="number"
placeholder="Property Value ($)"
value={inputs.propertyValue}
onChange={(e) => setInputs({ ...inputs, propertyValue: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Loan Amount ($)"
value={inputs.loanAmount}
onChange={(e) => setInputs({ ...inputs, loanAmount: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Interest Rate (%)"
value={inputs.interestRate}
onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
step="0.1"
/>
<input
type="number"
placeholder="Weekly Rent ($)"
value={inputs.weeklyRent}
onChange={(e) => setInputs({ ...inputs, weeklyRent: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<h3 className="font-bold text-gray-900 mb-3">Annual Expenses</h3>
<div className="grid grid-cols-2 gap-3">
{[
{ key: 'councilRates', label: 'Council Rates ($)' },
{ key: 'water', label: 'Water ($)' },
{ key: 'strata', label: 'Strata/Body Corporate ($)' },
{ key: 'insurance', label: 'Insurance ($)' },
{ key: 'management', label: 'Property Management ($)' },
{ key: 'repairs', label: 'Repairs & Maintenance ($)' },
{ key: 'landTax', label: 'Land Tax ($)' },
{ key: 'other', label: 'Other Expenses ($)' },
].map(field => (
<input
key={field.key}
type="number"
placeholder={field.label}
value={inputs[field.key]}
onChange={(e) => setInputs({ ...inputs, [field.key]: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
/>
))}
</div>
</div>

{/* Results */}
<div className="grid md:grid-cols-2 gap-4 mt-6">
<div className="bg-green-50 border-l-4 border-green-500 rounded p-4">
<p className="text-xs font-semibold text-gray-600 mb-1">ANNUAL RENT</p>
<p className="text-3xl font-bold text-green-700">${annualRent.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
<div className="bg-red-50 border-l-4 border-red-500 rounded p-4">
<p className="text-xs font-semibold text-gray-600 mb-1">ANNUAL EXPENSES</p>
<p className="text-3xl font-bold text-red-700">${totalExpenses.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
<div className={`rounded p-4 border-l-4 ${netCashflow >= 0 ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
<p className="text-xs font-semibold text-gray-600 mb-1">NET CASHFLOW (Before Tax)</p>
<p className={`text-3xl font-bold ${netCashflow >= 0 ? 'text-green-700' : 'text-orange-700'}`}>
${netCashflow.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
</p>
</div>
<div className={`rounded p-4 border-l-4 ${monthlyCost >= 0 ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
<p className="text-xs font-semibold text-gray-600 mb-1">MONTHLY HOLDING COST</p>
<p className={`text-3xl font-bold ${monthlyCost >= 0 ? 'text-green-700' : 'text-orange-700'}`}>
${monthlyCost.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
</p>
</div>
</div>

<div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-sm text-gray-700">
<strong>Note:</strong> This is an estimate before tax. Rental losses may provide tax benefits. Consult a tax accountant for specific advice.
</div>
</div>
);
};

// Negative Gearing Calculator
const NegativeGearingCalculator = () => {
const [inputs, setInputs] = useState({
rentalIncome: 20800,
deductibleExpenses: 10000,
loanInterest: 26000,
taxableIncome: 80000,
marginalRate: 37,
});

const taxableProfit = inputs.rentalIncome - inputs.deductibleExpenses - inputs.loanInterest;
const taxBenefit = taxableProfit < 0 ? Math.abs(taxableProfit) * (inputs.marginalRate / 100) : 0;
const afterTaxCashflow = taxableProfit + taxBenefit;

return (
<div className="space-y-4">
<div className="grid md:grid-cols-2 gap-4">
<input
type="number"
placeholder="Annual Rental Income ($)"
value={inputs.rentalIncome}
onChange={(e) => setInputs({ ...inputs, rentalIncome: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Deductible Expenses ($)"
value={inputs.deductibleExpenses}
onChange={(e) => setInputs({ ...inputs, deductibleExpenses: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Loan Interest ($)"
value={inputs.loanInterest}
onChange={(e) => setInputs({ ...inputs, loanInterest: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Your Taxable Income ($)"
value={inputs.taxableIncome}
onChange={(e) => setInputs({ ...inputs, taxableIncome: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Your Marginal Tax Rate (%)"
value={inputs.marginalRate}
onChange={(e) => setInputs({ ...inputs, marginalRate: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
</div>

{/* Results */}
<div className="grid md:grid-cols-2 gap-4 mt-6">
<div className={`rounded p-4 border-l-4 ${taxableProfit < 0 ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
<p className="text-xs font-semibold text-gray-600 mb-1">TAXABLE PROFIT/LOSS</p>
<p className={`text-3xl font-bold ${taxableProfit < 0 ? 'text-green-700' : 'text-red-700'}`}>
${taxableProfit.toLocaleString('en-AU', { maximumFractionDigits: 0 })}
</p>
</div>
<div className="bg-green-50 border-l-4 border-green-500 rounded p-4">
<p className="text-xs font-semibold text-gray-600 mb-1">ESTIMATED TAX BENEFIT</p>
<p className="text-3xl font-bold text-green-700">${taxBenefit.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
<div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4 md:col-span-2">
<p className="text-xs font-semibold text-gray-600 mb-1">AFTER-TAX POSITION (Approx)</p>
<p className="text-3xl font-bold text-blue-700">${afterTaxCashflow.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
</div>

<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-gray-700">
<strong>Important:</strong> Negative gearing (losses) can reduce your overall taxable income. However, tax laws are complex. Consult a qualified tax accountant before relying on this.
</div>
</div>
);
};

// Mortgage Calculator
const MortgageCalculator = () => {
const [inputs, setInputs] = useState({
loanAmount: 400000,
interestRate: 6.5,
loanTerm: 25,
frequency: 'monthly',
});

const monthlyRate = inputs.interestRate / 100 / 12;
const numPayments = inputs.loanTerm * 12;
const monthlyPayment = (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
const weeklyPayment = monthlyPayment * 12 / 52;
const totalInterest = (monthlyPayment * numPayments) - inputs.loanAmount;

return (
<div className="space-y-4">
<div className="grid md:grid-cols-2 gap-4">
<input
type="number"
placeholder="Loan Amount ($)"
value={inputs.loanAmount}
onChange={(e) => setInputs({ ...inputs, loanAmount: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<input
type="number"
placeholder="Interest Rate (%)"
value={inputs.interestRate}
onChange={(e) => setInputs({ ...inputs, interestRate: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
step="0.1"
/>
<input
type="number"
placeholder="Loan Term (Years)"
value={inputs.loanTerm}
onChange={(e) => setInputs({ ...inputs, loanTerm: parseFloat(e.target.value) })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
<select
value={inputs.frequency}
onChange={(e) => setInputs({ ...inputs, frequency: e.target.value })}
className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>
<option value="monthly">Monthly Repayment</option>
<option value="weekly">Weekly Repayment</option>
</select>
</div>

{/* Results */}
<div className="grid md:grid-cols-2 gap-4 mt-6">
<div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
<p className="text-xs font-semibold text-gray-600 mb-1">MONTHLY REPAYMENT</p>
<p className="text-3xl font-bold text-blue-700">${monthlyPayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
<div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">
<p className="text-xs font-semibold text-gray-600 mb-1">WEEKLY REPAYMENT</p>
<p className="text-3xl font-bold text-blue-700">${weeklyPayment.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
<div className="bg-red-50 border-l-4 border-red-500 rounded p-4 md:col-span-2">
<p className="text-xs font-semibold text-gray-600 mb-1">TOTAL INTEREST OVER LOAN TERM</p>
<p className="text-3xl font-bold text-red-700">${totalInterest.toLocaleString('en-AU', { maximumFractionDigits: 0 })}</p>
</div>
</div>

<div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-sm text-gray-700">
<strong>Note:</strong> This is an estimate based on fixed interest rate. Actual repayments may vary if rates change or you make extra payments.
</div>
</div>
);
};

return (
<div className="max-w-4xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Property Calculators</h1>
<p className="text-gray-600 mb-8">Use these tools to estimate costs, cashflow, and financial impacts of property ownership and investment.</p>

{/* Disclaimer */}
<div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
<p className="text-sm text-gray-700">
<strong>Disclaimer:</strong> These are estimates only. Actual figures may vary. Consult a financial advisor, accountant, or mortgage broker for personalized advice.
</p>
</div>

{/* Calculator Selector */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
{[
{ id: 'investment', label: 'Investment Cashflow' },
{ id: 'gearing', label: 'Negative Gearing' },
{ id: 'mortgage', label: 'Mortgage Calculator' },
].map(calc => (
<button
key={calc.id}
onClick={() => setActiveCalc(calc.id)}
className={`px-4 py-2 rounded-lg font-medium transition ${
activeCalc === calc.id
? 'bg-blue-600 text-white'
: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
}`}
>
{calc.label}
</button>
))}
</div>

{/* Calculator */}
<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
{activeCalc === 'investment' && <InvestmentCalculator />}
{activeCalc === 'gearing' && <NegativeGearingCalculator />}
{activeCalc === 'mortgage' && <MortgageCalculator />}
</div>
</div>
);
};

// ============= TEMPLATES PAGE =============
const TemplatesPage = () => {
const [selectedTemplate, setSelectedTemplate] = useState(null);
const [copied, setCopied] = useState(false);

const templates = {
defect: {
title: 'Builder Defect Claim Email',
content: `Hi [Builder Name],

I'm writing to formally notify you of a defect in the property at [Address] that requires repair under the Home Warranty Insurance.

Issue: [Describe the defect clearly]
Location: [Specify the area]
Date discovered: [Date]

The issue is affecting [explain impact - e.g., weatherproofing, functionality].

I have attached photos for your reference.

Please arrange to inspect and repair this defect within 7 days. If you require any further information, please let me know.

Thank you for your prompt attention to this matter.

Best regards,
[Your Name]
[Contact Number]`,
},
maintenance: {
title: '90-Day Maintenance List Email',
content: `Hi [Builder Name],

As per the new home warranty requirements, I'm providing a maintenance list within 90 days of handover.

During this inspection, I've identified the following items that require attention:

1. [Item 1 with location]
2. [Item 2 with location]
3. [Item 3 with location]

Please confirm receipt of this list and advise when you can arrange repairs.

Attached are photos documenting each item.

Thank you.

Best regards,
[Your Name]`,
},
rental: {
title: 'Rental Repair Request',
content: `Hi [Landlord/Property Manager Name],

I am writing to request urgent repairs to the rental property at [Address].

Issue: [Describe the repair needed]
Date issue discovered: [Date]
Photos attached: [Yes/No]

This is affecting [explain impact]. As per the Residential Tenancies Act, I am providing reasonable notice for repairs.

Please confirm receipt and advise when repairs will be scheduled.

Thank you.

Best regards,
[Tenant Name]
[Contact Number]`,
},
quote: {
title: 'Trades Person Quote Request',
content: `Hi [Trades Person/Company Name],

I am seeking a written quote for repair/renovation work at [Address].

Scope of work:
[Describe the work clearly]

Required materials:
[List materials if applicable]

I would appreciate:
- A detailed quote with breakdown of labour and materials
- Timeline for completion
- Warranty information
- Payment terms

Please send the quote by [Date].

Thank you.

Best regards,
[Your Name]
[Contact Number]`,
},
};

const copyToClipboard = () => {
navigator.clipboard.writeText(selectedTemplate.content);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

return (
<div className="max-w-4xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Email & Letter Templates</h1>
<p className="text-gray-600 mb-8">Use these templates to communicate professionally with builders, landlords, property managers, and trades.</p>

{!selectedTemplate ? (
<div className="grid md:grid-cols-2 gap-6">
{Object.entries(templates).map(([key, template]) => (
<div
key={key}
onClick={() => setSelectedTemplate(template)}
className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer border-2 border-transparent hover:border-blue-300"
>
<FileText className="w-8 h-8 text-blue-600 mb-3" />
<h3 className="font-bold text-gray-900 mb-2">{template.title}</h3>
<p className="text-sm text-gray-600">Click to view and copy</p>
</div>
))}
</div>
) : (
<div className="bg-white rounded-lg shadow-lg p-6">
<div className="flex justify-between items-start mb-4">
<h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.title}</h2>
<button
onClick={() => setSelectedTemplate(null)}
className="text-gray-600 hover:text-gray-900"
>
✕
</button>
</div>

<div className="bg-gray-50 rounded p-4 mb-6 font-mono text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
{selectedTemplate.content}
</div>

<button
onClick={copyToClipboard}
className={`px-6 py-2 rounded-lg font-medium transition ${
copied
? 'bg-green-600 text-white'
: 'bg-blue-600 text-white hover:bg-blue-700'
}`}
>
{copied ? '✓ Copied to Clipboard' : 'Copy Template'}
</button>
</div>
)}
</div>
);
};

// ============= ARTICLES PAGE =============
const ArticlesPage = () => {
const articles = [
{
title: 'Is a Garage Door Gap a Builder Defect?',
excerpt: 'Understanding warranty coverage for common garage issues.',
category: 'Builder Defects',
},
{
title: 'What is Covered Under New Home Warranty in Australia?',
excerpt: 'Complete guide to HIA warranty coverage and timeframes.',
category: 'Warranty',
},
{
title: 'What Can Landlords Claim on Tax?',
excerpt: 'Deductible expenses for rental property owners.',
category: 'Tax',
},
{
title: 'What is Negative Gearing?',
excerpt: 'How rental losses can provide tax benefits.',
category: 'Investment',
},
{
title: 'Common Defects After New Home Handover',
excerpt: 'The top 10 issues to check in the first 90 days.',
category: 'Defects',
},
{
title: 'How to Calculate Investment Property Cashflow',
excerpt: 'Step-by-step guide to understanding rental returns.',
category: 'Investment',
},
];

return (
<div className="max-w-4xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Property Articles & Guides</h1>
<p className="text-gray-600 mb-8">Read practical guides on property defects, warranties, taxes, and investment strategies.</p>

<div className="grid md:grid-cols-2 gap-6">
{articles.map((article, idx) => (
<div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer border-l-4 border-blue-500">
<span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
{article.category}
</span>
<h3 className="font-bold text-gray-900 mb-2 text-lg">{article.title}</h3>
<p className="text-gray-600 text-sm">{article.excerpt}</p>
<button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">Read More →</button>
</div>
))}
</div>
</div>
);
};

// ============= LOGIN PAGE =============
const LoginPage = ({ setCurrentPage }) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const { login } = useUser();

const handleLogin = () => {
if (name && email) {
login(name, email);
setCurrentPage('home');
}
};

return (
<div className="max-w-md mx-auto px-4 py-16">
<div className="bg-white rounded-lg shadow-lg p-8">
<h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>

<div className="space-y-4 mb-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Your name"
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="your@email.com"
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
</div>
</div>

<button
onClick={handleLogin}
className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium mb-4"
>
Login
</button>

<button
onClick={() => setCurrentPage('home')}
className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
>
Continue as Guest
</button>

<div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-sm text-gray-700">
<p><strong>Benefits of logging in:</strong></p>
<ul className="list-disc list-inside space-y-1 mt-2">
<li>Save your questions</li>
<li>Save calculator results</li>
<li>Download PDF reports</li>
<li>Create property profiles</li>
</ul>
</div>
</div>
</div>
);
};

// ============= ABOUT PAGE =============
const AboutPage = () => {
return (
<div className="max-w-3xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold text-gray-900 mb-6">About PropertyMate AU</h1>

<div className="space-y-6 text-gray-700">
<div>
<h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
<p>PropertyMate AU is designed to help Australian homeowners, first-home buyers, renters, landlords, and property investors understand property matters in simple, plain English.</p>
</div>

<div>
<h2 className="text-2xl font-bold text-gray-900 mb-3">What We Do</h2>
<p>We provide general guidance on:</p>
<ul className="list-disc list-inside space-y-1 mt-2">
<li>Builder defects and new home warranty claims</li>
<li>Rental property maintenance and management</li>
<li>Investment property tax deductions and cashflow</li>
<li>Common property issues and solutions</li>
<li>Practical templates and calculators</li>
</ul>
</div>

<div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
<h2 className="text-2xl font-bold text-gray-900 mb-3">Important Disclaimer</h2>
<p className="text-sm">
PropertyMate AU provides general information only and is NOT legal, tax, building, engineering, financial, or accounting advice.
We are not licensed to provide these services.
<strong> Always consult qualified professionals (solicitors, accountants, engineers, builders) before making important decisions.</strong>
</p>
</div>

<div>
<h2 className="text-2xl font-bold text-gray-900 mb-3">When to Seek Professional Help</h2>
<ul className="space-y-2">
<li><strong>Legal:</strong> Warranty disputes, contract review, tenant/landlord issues → Consult a lawyer</li>
<li><strong>Tax:</strong> Deductions, depreciation, negative gearing → Consult a tax accountant</li>
<li><strong>Building:</strong> Structural issues, defect assessment → Consult a building inspector or engineer</li>
<li><strong>Financial:</strong> Loan pre-approval, investment strategy → Consult a mortgage broker or financial advisor</li>
<li><strong>Building Trades:</strong> Repairs and quotes → Get multiple quotes from licensed trades</li>
</ul>
</div>

<div>
<h2 className="text-2xl font-bold text-gray-900 mb-3">Contact & Support</h2>
<p>Have feedback? Found an error? Want to contribute? Contact us at: <strong>hello@propertymate.com.au</strong></p>
</div>
</div>
</div>
);
};

// ============= MAIN APP COMPONENT =============
export default function PropertyMateApp() {
const [currentPage, setCurrentPage] = useState('home');

const renderPage = () => {
switch (currentPage) {
case 'home':
return <HomePage setCurrentPage={setCurrentPage} />;
case 'ask-question':
return <AskQuestionPage />;
case 'defect-checker':
return <DefectCheckerPage />;
case 'calculators':
return <CalculatorsPage />;
case 'templates':
return <TemplatesPage />;
case 'articles':
return <ArticlesPage />;
case 'about':
return <AboutPage />;
case 'login':
return <LoginPage setCurrentPage={setCurrentPage} />;
default:
return <HomePage setCurrentPage={setCurrentPage} />;
}
};

return (
<UserProvider>
<div className="min-h-screen bg-white">
<Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
<main className="min-h-screen">
{renderPage()}
</main>

{/* Footer */}
<footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-16">
<div className="max-w-6xl mx-auto">
<div className="grid md:grid-cols-4 gap-8 mb-8">
<div>
<h3 className="font-bold text-white mb-4">PropertyMate AU</h3>
<p className="text-sm">Simple guidance for Australian property owners and investors.</p>
</div>
<div>
<h3 className="font-bold text-white mb-4">Quick Links</h3>
<ul className="space-y-2 text-sm">
<li><a href="#" className="hover:text-white transition">Defect Checker</a></li>
<li><a href="#" className="hover:text-white transition">Calculators</a></li>
<li><a href="#" className="hover:text-white transition">Articles</a></li>
</ul>
</div>
<div>
<h3 className="font-bold text-white mb-4">Legal</h3>
<ul className="space-y-2 text-sm">
<li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
<li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
<li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
</ul>
</div>
<div>
<h3 className="font-bold text-white mb-4">Support</h3>
<p className="text-sm">hello@propertymate.com.au</p>
</div>
</div>

<div className="border-t border-gray-700 pt-8 text-center text-sm">
<p>© 2024 PropertyMate AU. General information only. Always consult qualified professionals.</p>
</div>
</div>
</footer>
</div>
</UserProvider>
);
}
