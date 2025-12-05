export const StartupApplicationForm = {
  title: "Startup Application Form",
  highlight_text: "Startup",
  sub_title: "",
  totalSteps: 5,
  question: [
    // 1. Startup Details
    {
      question: "Startup Name",
      question_type: "text",
      placeholder: "Enter your startup name",
      field_name: "name",
      validation: "text",
      stepTitle: "Startup Details",
      stepDescription: "Tell us about your startup"
    },
    {
      question: "Website / Product Link",
      question_type: "text",
      placeholder: "https://example.com",
      field_name: "website",
      validation: "url"
    },
    {
      question: "Founders' Names",
      question_type: "text",
      placeholder: "Enter founders' names (e.g., John Doe, Jane Smith)",
      field_name: "ceoName",
      validation: "text",
      isTextarea: true
    },
    {
      question: "CEO LinkedIn Profile",
      question_type: "text",
      placeholder: "https://linkedin.com/in/yourprofile",
      field_name: "ceoLinkedinUrl",
      validation: "url"
    },
    {
      question: "Contact Email",
      question_type: "text",
      placeholder: "your@email.com",
      field_name: "ceoEmail",
      validation: "email"
    },
    {
      question: "Phone Number",
      question_type: "text",
      placeholder: "+1234567890",
      field_name: "ceoPhone",
      validation: "text"
    },
    {
      question: "One-line description of your startup",
      question_type: "text",
      placeholder: "Brief one-line description",
      field_name: "description",
      validation: "text",
      maxLength: 200
    },
    // 2. Product & Traction
    {
      question: "What problem do you solve, and why does it matter in Kingdom of Saudi Arabia (KSA)?",
      question_type: "text",
      placeholder: "Describe the problem and its relevance to KSA",
      field_name: "companyGoal",
      validation: "text",
      isTextarea: true,
      stepTitle: "Product & Traction",
      stepDescription: "Tell us about your product and market traction"
    },
    {
      question: "Describe your product/tech in brief (max 100 words)",
      question_type: "text",
      placeholder: "Describe your product or technology",
      field_name: "productDescription",
      validation: "text",
      isTextarea: true,
      maxLength: 500
    },
    {
      question: "Current monthly revenue",
      question_type: "text",
      placeholder: "Enter monthly revenue amount",
      field_name: "revenueDetails",
      validation: "text"
    },
    {
      question: "Top 2–3 clients or pilots",
      question_type: "text",
      placeholder: "List your top clients or pilot programs",
      field_name: "topClients",
      validation: "text",
      isTextarea: true
    },
    {
      question: "Funding raised so far (if any)",
      question_type: "text",
      placeholder: "Enter funding amount and details",
      field_name: "fundingRaised",
      validation: "text"
    },
    // 3. Saudi Market Fit
    {
      question: "Why is KSA a priority market for you?",
      question_type: "text",
      placeholder: "Explain why KSA is important for your startup",
      field_name: "ksaPriority",
      validation: "text",
      isTextarea: true,
      stepTitle: "Saudi Market Fit",
      stepDescription: "Help us understand your fit with the Saudi market"
    },
    {
      question: "Any existing Saudi/GCC leads or conversations? (Yes/No — if yes, specify)",
      question_type: "yesno",
      placeholder: "",
      field_name: "existingLeads",
      validation: "text",
      followUpQuestion: "Please specify your existing Saudi/GCC leads or conversations",
      followUpFieldName: "existingLeadsDetails"
    },
    {
      question: "Your top 2 use cases for the Saudi market",
      question_type: "text",
      placeholder: "Describe your top use cases",
      field_name: "topUseCases",
      validation: "text",
      isTextarea: true
    },
    // 4. Team & Capability
    {
      question: "Team size",
      question_type: "text",
      placeholder: "Enter number of team members",
      field_name: "employeeCount",
      validation: "text",
      stepTitle: "Team & Capability",
      stepDescription: "Tell us about your team"
    },
    {
      question: "Do you have someone who can lead Saudi expansion? (Yes/No)",
      question_type: "yesno",
      placeholder: "",
      field_name: "hasSaudiLead",
      validation: "text"
    },
    {
      question: "Are you willing to invest in Saudi setup if selected? (Yes/No)",
      question_type: "yesno",
      placeholder: "",
      field_name: "willingToInvest",
      validation: "text"
    },
    // 5. Supporting Material
    {
      question: "Pitch Deck URL",
      question_type: "text",
      placeholder: "https://drive.google.com/file/d/... or https://docsend.com/...",
      field_name: "dataRoomLink",
      validation: "url",
      stepTitle: "Supporting Material",
      stepDescription: "Share additional materials"
    },
    {
      question: "Product demo link (optional)",
      question_type: "text",
      placeholder: "https://demo.example.com",
      field_name: "productUrl",
      validation: "url",
      required: false
    },
  ],
};

