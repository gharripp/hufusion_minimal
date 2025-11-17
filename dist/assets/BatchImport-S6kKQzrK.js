import{c as b,r as n,j as e,k as y,d as j,e as f,T as d}from"./index-CTVhykcm.js";import{U as N}from"./upload-CPGzn_z8.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=b("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);function A(){const[o,h]=n.useState(""),[c,m]=n.useState(!1),[x,a]=n.useState([]),p=`[
  {
    "title": "Example Article 1",
    "excerpt": "Short description of the article",
    "content": "Full content of the article goes here...",
    "author": "Dr. John Doe",
    "category": "research",
    "date": "2024-03-15",
    "image": "https://example.com/image.jpg"
  },
  {
    "title": "Example Article 2",
    "excerpt": "Another short description",
    "content": "More content here...",
    "author": "Dr. Jane Smith",
    "category": "awards",
    "date": "2024-03-10"
  }
]`,u=async()=>{m(!0),a([]);const t=[];try{const s=JSON.parse(o);if(!Array.isArray(s))throw new Error("JSON must be an array of articles");t.push(`📦 Found ${s.length} articles to import...`),a([...t]);for(let l=0;l<s.length;l++){const r=s[l];try{if(!r.title||!r.excerpt||!r.content||!r.author||!r.category)throw new Error(`Article ${l+1}: Missing required fields`);const i=r.date?new Date(r.date):new Date,g=await y(j(f,"news"),{title:r.title,excerpt:r.excerpt,content:r.content,author:r.author,category:r.category,image:r.image||"",date:d.fromDate(i),createdAt:d.now(),updatedAt:d.now()});t.push(`✅ Imported: "${r.title}" (ID: ${g.id})`),a([...t])}catch(i){t.push(`❌ Failed article ${l+1}: ${i.message}`),a([...t])}}t.push(`
🎉 Import complete!`),a([...t])}catch(s){t.push(`❌ Error: ${s.message}`),a([...t])}finally{m(!1)}};return e.jsx("div",{className:"min-h-screen bg-black text-white pt-24 pb-8 px-8",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsx("h1",{className:"text-3xl font-bold mb-8",children:"Batch Import News Articles"}),e.jsxs("div",{className:"bg-gray-900 p-6 rounded-lg mb-6",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Instructions"}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-gray-300",children:[e.jsx("li",{children:"Prepare your articles as a JSON array (see example below)"}),e.jsx("li",{children:"Paste the JSON into the text area"}),e.jsx("li",{children:'Click "Import Articles"'}),e.jsx("li",{children:"Wait for the import to complete"})]}),e.jsx("div",{className:"mt-4 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded",children:e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(w,{className:"text-yellow-400 mt-1",size:20}),e.jsxs("div",{className:"text-sm text-yellow-200",children:[e.jsx("strong",{children:"Note:"})," Images must be publicly accessible URLs. If you want to upload images from your computer, use the regular admin interface one article at a time."]})]})})]}),e.jsxs("div",{className:"bg-gray-900 p-6 rounded-lg mb-6",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Example JSON Format"}),e.jsx("pre",{className:"bg-black p-4 rounded text-sm overflow-x-auto text-gray-300",children:p}),e.jsxs("div",{className:"mt-2 text-sm text-gray-400",children:[e.jsx("strong",{children:"Categories:"})," research, awards, outreach, collaboration"]})]}),e.jsxs("div",{className:"bg-gray-900 p-6 rounded-lg mb-6",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Paste Your JSON"}),e.jsx("textarea",{value:o,onChange:t=>h(t.target.value),className:"w-full h-64 p-4 bg-black text-white rounded font-mono text-sm",placeholder:"Paste your JSON array here...",disabled:c}),e.jsx("button",{onClick:u,disabled:c||!o.trim(),className:"mt-4 bg-hampton-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:c?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"}),"Importing..."]}):e.jsxs(e.Fragment,{children:[e.jsx(N,{size:20}),"Import Articles"]})})]}),x.length>0&&e.jsxs("div",{className:"bg-gray-900 p-6 rounded-lg",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Import Results"}),e.jsx("div",{className:"bg-black p-4 rounded font-mono text-sm space-y-1",children:x.map((t,s)=>e.jsx("div",{className:t.includes("✅")?"text-green-400":t.includes("❌")?"text-red-400":t.includes("📦")||t.includes("🎉")?"text-blue-400 font-bold":"text-gray-300",children:t},s))})]})]})})}export{A as default};
