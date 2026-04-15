'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StartupApplicationForm } from '@/lib/form-data';
import { buildIaxksaNewWebhookPayload } from '@/lib/iaxksa-new-webhook-payload';
import { motion } from 'framer-motion';

const FORWARD_PRIMARY_API = '/api/forward-iaxksa-primary-webhook';
const FORWARD_NEW_API = '/api/forward-iaxksa-new-webhook';
import { Check, Loader2, Building2, TrendingUp, Globe, Users, FileText } from 'lucide-react';

// Map startup stage from form value to webhook format
const mapStartupStage = (stage) => {
  if (!stage) return '';
  // Return the stage in uppercase
  return stage.toUpperCase();
};

// Format stage for display (convert to title case with spaces)
const formatStageForDisplay = (stage) => {
  if (!stage) return '';
  return stage
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

// Helper function to count words in a string
const countWords = (text) => {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

const validateField = (value, validation) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'This field is required';
  }

  switch (validation) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : 'Please enter a valid email address';
    
    case 'url':
      try {
        // Add https:// if no protocol is provided
        const urlToTest = value.startsWith('http://') || value.startsWith('https://') 
          ? value 
          : `https://${value}`;
        new URL(urlToTest);
        return '';
      } catch {
        return 'Please enter a valid URL';
      }
    
    case 'year':
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return (!isNaN(year) && year >= 1900 && year <= currentYear) 
        ? '' 
        : 'Please enter a valid year';
    
    case 'file':
      // File validation is handled by the file input itself
      return '';
    
    case 'text':
    default:
      return '';
  }
};

export const StartupApplicationFormComponent = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [startupSource, setStartupSource] = useState('WEBSITE_INBOUND');
  const [channel, setChannel] = useState('');

  const questions = StartupApplicationForm.question;

  // Get startupSource and channel from URL parameter (client-side only)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const startupSourceParam = urlParams.get('startupsource');
      const source = startupSourceParam?.toLowerCase() === 'marketing' ? 'MARKETING' : 'WEBSITE_INBOUND';
      setStartupSource(source);
      
      const channelParam = urlParams.get('channel');
      if (channelParam) {
        setChannel(channelParam);
      }
    }
  }, []);

  // Group questions by section (stepTitle)
  const groupQuestionsBySection = () => {
    const sections = [];
    let currentSection = null;

    questions.forEach((question, index) => {
      if (question.stepTitle) {
        // Start a new section
        currentSection = {
          title: question.stepTitle,
          description: question.stepDescription || '',
          questions: []
        };
        sections.push(currentSection);
      }
      
      // Add question to current section (or create a default section if none exists)
      if (!currentSection) {
        currentSection = {
          title: '',
          description: '',
          questions: []
        };
        sections.push(currentSection);
      }
      
      currentSection.questions.push(question);
    });

    return sections;
  };

  const sections = groupQuestionsBySection();

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    let hasErrors = false;
    let firstErrorField = null;

    // Get questions for current step
    const currentSection = sections[currentStep];
    if (!currentSection) return { isValid: true, firstErrorField: null };

    currentSection.questions.forEach((question) => {
      const fieldName = question.field_name;
      const value = formData[fieldName] || '';
      
      // Skip validation for optional fields
      if (question.required === false && (!value || value === '')) {
        return;
      }
      
      // Validate field
      const error = validateField(value, question.validation);
      
      if (error) {
        newErrors[fieldName] = error;
        if (!hasErrors) {
          firstErrorField = fieldName;
        }
        hasErrors = true;
      }

      // Check maxLength if specified
      if (question.maxLength && value.length > question.maxLength) {
        newErrors[fieldName] = `Maximum ${question.maxLength} characters allowed`;
        if (!hasErrors) {
          firstErrorField = fieldName;
        }
        hasErrors = true;
      }

      // Check maxWords if specified
      if (question.maxWords) {
        const wordCount = countWords(value);
        if (wordCount > question.maxWords) {
          newErrors[fieldName] = `Maximum ${question.maxWords} words allowed`;
          if (!hasErrors) {
            firstErrorField = fieldName;
          }
          hasErrors = true;
        }
      }

      // Validate follow-up question if yes/no is "Yes"
      if (question.question_type === 'yesno' && question.followUpQuestion && value === 'Yes') {
        const followUpValue = formData[question.followUpFieldName] || '';
        if (!followUpValue || followUpValue.trim() === '') {
          newErrors[question.followUpFieldName] = 'This field is required';
          if (!hasErrors) {
            firstErrorField = question.followUpFieldName;
          }
          hasErrors = true;
        }
      }

      // Validate follow-up question if dropdown is "Other"
      if (question.question_type === 'dropdown' && question.followUpQuestion && value === 'Other') {
        const followUpValue = formData[question.followUpFieldName] || '';
        if (!followUpValue || followUpValue.trim() === '') {
          newErrors[question.followUpFieldName] = 'This field is required';
          if (!hasErrors) {
            firstErrorField = question.followUpFieldName;
          }
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);
    return { isValid: !hasErrors, firstErrorField };
  };

  const validateAllFields = () => {
    const newErrors = {};
    let hasErrors = false;
    let firstErrorField = null;

    questions.forEach((question) => {
      const fieldName = question.field_name;
      const value = formData[fieldName] || '';
      
      // Skip validation for optional fields
      if (question.required === false && (!value || value === '')) {
        return;
      }
      
      // Validate field
      const error = validateField(value, question.validation);
      
      if (error) {
        newErrors[fieldName] = error;
        if (!hasErrors) {
          firstErrorField = fieldName;
        }
        hasErrors = true;
      }

      // Check maxLength if specified
      if (question.maxLength && value.length > question.maxLength) {
        newErrors[fieldName] = `Maximum ${question.maxLength} characters allowed`;
        if (!hasErrors) {
          firstErrorField = fieldName;
        }
        hasErrors = true;
      }

      // Check maxWords if specified
      if (question.maxWords) {
        const wordCount = countWords(value);
        if (wordCount > question.maxWords) {
          newErrors[fieldName] = `Maximum ${question.maxWords} words allowed`;
          if (!hasErrors) {
            firstErrorField = fieldName;
          }
          hasErrors = true;
        }
      }

      // Validate follow-up question if yes/no is "Yes"
      if (question.question_type === 'yesno' && question.followUpQuestion && value === 'Yes') {
        const followUpValue = formData[question.followUpFieldName] || '';
        if (!followUpValue || followUpValue.trim() === '') {
          newErrors[question.followUpFieldName] = 'This field is required';
          if (!hasErrors) {
            firstErrorField = question.followUpFieldName;
          }
          hasErrors = true;
        }
      }

      // Validate follow-up question if dropdown is "Other"
      if (question.question_type === 'dropdown' && question.followUpQuestion && value === 'Other') {
        const followUpValue = formData[question.followUpFieldName] || '';
        if (!followUpValue || followUpValue.trim() === '') {
          newErrors[question.followUpFieldName] = 'This field is required';
          if (!hasErrors) {
            firstErrorField = question.followUpFieldName;
          }
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);
    return { isValid: !hasErrors, firstErrorField };
  };

  const handleNext = () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      setTimeout(() => {
        if (validation.firstErrorField) {
          const errorElement = document.querySelector(`[data-field-name="${validation.firstErrorField}"]`);
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
      return;
    }
    
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate all fields before submitting
    const validationResult = validateAllFields();
    if (!validationResult.isValid) {
      // Scroll to first error after a brief delay to allow state update
      setTimeout(() => {
        if (validationResult.firstErrorField) {
          const errorElement = document.querySelector(`[data-field-name="${validationResult.firstErrorField}"]`);
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Map form data to webhook structure
      const values = formData;
      
      // Determine sector value: if "Other" is selected, use otherSector, otherwise use startupSector
      const sectorValue = values.startupSector === 'Other' 
        ? (values.otherSector || 'Other') 
        : (values.startupSector || '');
      
      // Determine thesis value: if "Other" is selected, use "Other", otherwise use the selected sector
      const thesisValue = values.startupSector === 'Other' 
        ? 'Other' 
        : (values.startupSector || '');
      
      // Set howDidYouGetToKnow based on channel value, or empty string if channel is empty
      const howDidYouGetToKnow = channel || "";

      const webhookData = {
        startup: {
          name: values.name || "",
          legal_name: "", // Not in new form
          founders: values.ceoName || "",
          overview: values.description || "",
          geographical_address: "", // Not in new form
          stage: "", // Not in new form
          startup_source: "APPLICATION_FORM",
          startupSource: startupSource,
          channel: channel || "",
          howDidYouGetToKnow: howDidYouGetToKnow,
          companyGoal: values.companyGoal || "",
          links: values.website || "",
          email: values.ceoEmail || "",
          startupIndustryDomain: sectorValue,
          industry: sectorValue,
          thesis: thesisValue,
          ceoLinkedinUrl: values.ceoLinkedinUrl || "",
          ceoPhone: values.ceoPhone || "",
          productDescription: values.productDescription || "",
          revenueDetails: values.revenueDetails || "",
          topClients: values.topClients || "",
          fundingRaised: values.fundingRaised || "",
          ksaPriority: values.ksaPriority || "",
          existingLeads: values.existingLeads || "",
          existingLeadsDetails: values.existingLeadsDetails || "",
          topUseCases: values.topUseCases || "",
          employeeCount: values.employeeCount || "",
          hasSaudiLead: values.hasSaudiLead || "",
          willingToInvest: values.willingToInvest || "",
          dataRoomLink: values.dataRoomLink || "",
          productUrl: values.productUrl || "",
        }
      };

      const newPayload = buildIaxksaNewWebhookPayload(values, {
        startupSource,
        sectorValue,
        thesisValue,
        howDidYouGetToKnow,
        channel,
      });

      const jsonPost = (url, bodyObj) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj),
          cache: 'no-store',
        });

      const primaryResponse = await jsonPost(FORWARD_PRIMARY_API, webhookData);

      if (!primaryResponse.ok) {
        const errBody = await primaryResponse.json().catch(() => null);
        const detail =
          errBody?.error || errBody?.detail || `HTTP ${primaryResponse.status}`;
        throw new Error(detail);
      }

      try {
        const secondaryResponse = await jsonPost(FORWARD_NEW_API, newPayload);
        if (!secondaryResponse.ok) {
          console.warn(
            'New webhook may not have received data. Check forward-iaxksa-new-webhook and IAXKSA_WEBHOOK_NEW_URL.'
          );
        }
      } catch (err) {
        console.error('New webhook request failed:', err);
      }

      const result = await primaryResponse.json().catch(() => ({}));
      
      setIsSubmitted(true);
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error?.message
          ? `Failed to submit: ${error.message}`
          : 'Failed to submit application. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Application Submitted!
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for your interest. We'll review your application and get back to you soon.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({});
                setErrors({});
                setSubmitError('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 text-white text-base font-medium bg-[#DC0000] hover:bg-[#000] transition-colors"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Submit Another Application
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get section icon
  const getSectionIcon = (title) => {
    switch(title) {
      case 'Startup Details':
        return <Building2 className="w-5 h-5" />;
      case 'Product & Traction':
        return <TrendingUp className="w-5 h-5" />;
      case 'Saudi Market Fit':
        return <Globe className="w-5 h-5" />;
      case 'Team & Capability':
        return <Users className="w-5 h-5" />;
      case 'Supporting Material':
        return <FileText className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Render question field
  const renderQuestionField = (question) => {
    const fieldName = question.field_name;
    const value = formData[fieldName] || '';
    const isRequired = question.required !== false;

    return (
      <div key={fieldName} data-field-name={fieldName} className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          {question.question}
          {isRequired && <span className="text-[#DC0000] ml-1">*</span>}
          {!isRequired && <span className="text-gray-400 text-sm font-normal ml-2">(optional)</span>}
          {question.maxLength && (
            <span className="text-sm text-gray-500 font-normal ml-2">
              ({value.length}/{question.maxLength} characters)
            </span>
          )}
          {question.maxWords && (
            <span className="text-sm text-gray-500 font-normal ml-2">
              ({countWords(value)}/{question.maxWords} words)
            </span>
          )}
        </label>

        {/* Input Field */}
        {question.question_type === 'text' ? (
          <div>
            {question.maxLength || question.isTextarea || question.maxWords ? (
              <textarea
                value={value}
                onChange={(e) => {
                  let newValue = e.target.value;
                  // Prevent exceeding maxWords if specified
                  if (question.maxWords) {
                    const words = newValue.trim().split(/\s+/).filter(word => word.length > 0);
                    if (words.length > question.maxWords) {
                      newValue = words.slice(0, question.maxWords).join(' ');
                    }
                  }
                  handleInputChange(fieldName, newValue);
                }}
                placeholder={question.placeholder}
                rows={question.isTextarea ? 4 : 5}
                required={isRequired}
                className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:border-[#DC0000] transition-all resize-none bg-gray-50 focus:bg-white ${
                  errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
                maxLength={question.maxLength}
              />
            ) : (
              <input
                type={question.validation === 'email' ? 'email' : question.validation === 'url' ? 'url' : 'text'}
                value={value}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                placeholder={question.placeholder}
                required={isRequired}
                className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:border-[#DC0000] transition-all bg-gray-50 focus:bg-white ${
                  errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
              />
            )}
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span> {errors[fieldName]}
              </p>
            )}
          </div>
        ) : question.question_type === 'mcq' ? (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleInputChange(fieldName, option)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                  value === option
                    ? 'border-[#DC0000] bg-blue-50 text-[#DC0000]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-gray-50'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
              >
                <div className="flex items-center justify-between">
                  <span>{formatStageForDisplay(option)}</span>
                  {value === option && (
                    <div className="w-5 h-5 bg-[#DC0000] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span> {errors[fieldName]}
              </p>
            )}
          </div>
        ) : question.question_type === 'yesno' ? (
          <div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleInputChange(fieldName, 'Yes')}
                className={`px-5 py-4 rounded-xl border-2 transition-all font-semibold ${
                  value === 'Yes'
                    ? 'border-[#DC0000] bg-blue-50 text-[#DC0000]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-gray-50 text-gray-700'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Yes</span>
                  {value === 'Yes' && (
                    <div className="w-5 h-5 bg-[#DC0000] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange(fieldName, 'No')}
                className={`px-5 py-4 rounded-xl border-2 transition-all font-semibold ${
                  value === 'No'
                    ? 'border-[#DC0000] bg-blue-50 text-[#DC0000]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-gray-50 text-gray-700'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>No</span>
                  {value === 'No' && (
                    <div className="w-5 h-5 bg-[#DC0000] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            </div>
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span> {errors[fieldName]}
              </p>
            )}
            {/* Show follow-up question if Yes is selected */}
            {question.followUpQuestion && value === 'Yes' && (
              <div className="mt-5 p-5 bg-blue-50 border-2 border-blue-100 rounded-xl">
                <label className="block text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {question.followUpQuestion}
                  <span className="text-[#DC0000] ml-1">*</span>
                </label>
                <textarea
                  value={formData[question.followUpFieldName] || ''}
                  onChange={(e) => handleInputChange(question.followUpFieldName, e.target.value)}
                  placeholder="Please provide details"
                  rows={4}
                  required
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:border-[#DC0000] transition-all resize-none bg-white ${
                    errors[question.followUpFieldName] ? 'border-red-400' : 'border-blue-200 hover:border-blue-300'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
                />
                {errors[question.followUpFieldName] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors[question.followUpFieldName]}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : question.question_type === 'dropdown' ? (
          <div>
            <select
              value={value}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              required={isRequired}
              className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:border-[#DC0000] transition-all bg-gray-50 focus:bg-white ${
                errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
            >
              <option value="">{question.placeholder || 'Select an option'}</option>
              {question.options && question.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span> {errors[fieldName]}
              </p>
            )}
            {/* Show follow-up question if "Other" is selected */}
            {question.followUpQuestion && value === 'Other' && (
              <div className="mt-5 p-5 bg-blue-50 border-2 border-blue-100 rounded-xl">
                <label className="block text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                  {question.followUpQuestion}
                  <span className="text-[#DC0000] ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData[question.followUpFieldName] || ''}
                  onChange={(e) => handleInputChange(question.followUpFieldName, e.target.value)}
                  placeholder="Please specify the sector"
                  required
                  className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none focus:border-[#DC0000] transition-all bg-white ${
                    errors[question.followUpFieldName] ? 'border-red-400' : 'border-blue-200 hover:border-blue-300'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '15px' }}
                />
                {errors[question.followUpFieldName] && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span className="text-red-500">⚠</span> {errors[question.followUpFieldName]}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : question.question_type === 'file' ? (
          <div>
            <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
              errors[fieldName] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-[#DC0000] bg-gray-50'
            }`}>
              <input
                type="file"
                accept={question.accept || "*/*"}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleInputChange(fieldName, file.name);
                  }
                }}
                required={isRequired}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              />
              <div className="text-center">
                <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {value ? 'File selected' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">
                  {question.accept ? `Accepted formats: ${question.accept}` : 'Any file type'}
                </p>
              </div>
            </div>
            {value && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> {value}
                </p>
              </div>
            )}
            {errors[fieldName] && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span> {errors[fieldName]}
              </p>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              <span className="">{StartupApplicationForm.highlight_text}</span>{' '}
              <span className="text-gray-900">Application Form</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take the first step towards accelerating your startup's growth in Saudi Arabia
            </p>
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              Step {currentStep + 1} of {sections.length}
            </span>
            <span className="text-sm font-medium text-gray-600" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              {Math.round(((currentStep + 1) / sections.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="bg-[#DC0000] h-2 rounded-full"
            />
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-12 mb-6"
          >
            {/* Render current section only */}
            {sections[currentStep] && (
              <div>
                {/* Section Header */}
                {sections[currentStep].title && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#DC0000]">
                        {getSectionIcon(sections[currentStep].title)}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                          {sections[currentStep].title}
                        </h2>
                        {sections[currentStep].description && (
                          <p className="text-gray-600 text-sm mt-1">{sections[currentStep].description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Render questions in current section */}
                <div className="space-y-6">
                  {sections[currentStep].questions.map((question) => renderQuestionField(question))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Submit Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="text-red-500 text-lg">⚠</span> {submitError}
              </p>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-8 py-3 text-gray-700 text-base font-medium bg-gray-100 hover:bg-gray-200 transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Previous
            </Button>

            {currentStep < sections.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 text-white text-base font-medium bg-[#DC0000] hover:bg-[#000] transition-all rounded-xl"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-white text-base font-medium bg-[#DC0000] hover:bg-[#000000] transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By submitting this form, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};


