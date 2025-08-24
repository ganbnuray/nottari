export const templates = [
  {
    id: "blank",
    label: "Blank document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `<h1>Software Proposal</h1>

<h2>Project Overview</h2>
<p>This proposal outlines the development of a software solution designed to address [problem/challenge]. The project aims to deliver a robust, scalable, and user-friendly application that meets the needs of [target audience].</p>

<h2>Objectives</h2>
<ul>
  <li>Define project scope and deliverables</li>
  <li>Develop functional software according to requirements</li>
  <li>Ensure maintainability, scalability, and performance</li>
  <li>Provide documentation and training for users</li>
</ul>

<h2>Proposed Solution</h2>
<p>The solution will consist of the following components:</p>
<ol>
  <li><strong>Frontend:</strong> User interface built with modern frameworks (React, Vue, etc.)</li>
  <li><strong>Backend:</strong> API and business logic using [language/framework]</li>
  <li><strong>Database:</strong> Data storage solution with [SQL/NoSQL] database</li>
  <li><strong>Integration:</strong> Connections to existing systems or services</li>
</ol>

<h2>Timeline & Milestones</h2>
<p>Estimated project duration: [X weeks/months]</p>
<ul>
  <li>Week 1-2: Requirements gathering and design</li>
  <li>Week 3-6: Core development</li>
  <li>Week 7: Testing and QA</li>
  <li>Week 8: Deployment and handover</li>
</ul>

<h2>Budget Estimate</h2>
<p>Projected costs: [provide budget breakdown]</p>

<h2>Conclusion</h2>
<p>This proposal aims to deliver a high-quality software solution tailored to [company/client needs]. By following the outlined plan, we ensure a timely, efficient, and maintainable project outcome.</p>
`,
  },
];
