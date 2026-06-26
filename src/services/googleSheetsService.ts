// Google Sheets Form Submission Service
// This service handles form submissions to Google Sheets via Google Apps Script

interface FormData {
  formType: 'bega' | 'bega-distance' | 'keremt' | 'e-learning';
  fullName: string;
  phone: string;
  secondary_phone?: string;
  age: string;
  academic_level?: string;
  address: string;
  class?: string;
  timestamp?: string;
}

interface SubmissionResult {
  success: boolean;
  message: string;
  error?: string;
}

// Input validation and sanitization
export const validateAndSanitizeFormData = (data: Partial<FormData>): { isValid: boolean; errors: string[]; sanitized: Partial<FormData> } => {
  const errors: string[] = [];
  const sanitized: Partial<FormData> = { ...data };

  // Validate fullName
  if (!sanitized.fullName || sanitized.fullName.trim().length < 2) {
    errors.push('ሙሉ ስም ያስገቡ');
  } else {
    sanitized.fullName = sanitizeString(sanitized.fullName);
  }

  // Validate phone
  if (!sanitized.phone || !isValidPhone(sanitized.phone)) {
    errors.push('ትክክለኛ ስልክ ቁጥር ያስገቡ');
  } else {
    sanitized.phone = sanitizeString(sanitized.phone);
  }

  // Validate secondary_phone (optional)
  if (sanitized.secondary_phone && sanitized.secondary_phone.trim() !== '') {
    if (!isValidPhone(sanitized.secondary_phone)) {
      errors.push('ትክክለኛ ተጨማሪ ስልክ ቁጥር ያስገቡ');
    } else {
      sanitized.secondary_phone = sanitizeString(sanitized.secondary_phone);
    }
  }

  // Validate age
  if (!sanitized.age || !isValidAge(sanitized.age)) {
    errors.push('ትክክለኛ ዕድሜ ያስገቡ (10-100)');
  } else {
    sanitized.age = sanitizeString(sanitized.age);
  }

  // Validate address
  if (!sanitized.address || sanitized.address.trim().length < 3) {
    errors.push('አድራሻ ያስገቡ');
  } else {
    sanitized.address = sanitizeString(sanitized.address);
  }

  // Validate academic_level (optional)
  if (sanitized.academic_level) {
    sanitized.academic_level = sanitizeString(sanitized.academic_level);
  }

  // Validate class (optional)
  if (sanitized.class) {
    sanitized.class = sanitizeString(sanitized.class);
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized
  };
};

// Sanitize string to prevent XSS
const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/["']/g, ''); // Remove quotes to prevent injection
};

// Validate phone number (Ethiopian format: 9 digits starting with 9, 10 digits starting with 0, or 12 digits with country code +251)
const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  // Accept 9 digits (without country code, starting with 9)
  if (cleaned.length === 9) {
    return cleaned.startsWith('9');
  }
  // Accept 10 digits (with leading 0, starting with 09)
  if (cleaned.length === 10) {
    return cleaned.startsWith('09');
  }
  // Accept 12 digits (with country code 251, starting with 2519)
  if (cleaned.length === 12) {
    return cleaned.startsWith('2519');
  }
  return false;
};

// Validate age (between 10 and 100)
const isValidAge = (age: string): boolean => {
  const numAge = parseInt(age, 10);
  return !isNaN(numAge) && numAge >= 10 && numAge <= 100;
};

// Submit form to Google Sheets via Google Apps Script
export const submitToGoogleSheets = async (formData: FormData, scriptUrl: string): Promise<SubmissionResult> => {
  try {
    // Validate and sanitize data before submission
    const validation = validateAndSanitizeFormData(formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'የቅጽ ዳታ ልክ አይደለም',
        error: validation.errors.join(', ')
      };
    }

    // Add timestamp
    const dataToSubmit = {
      ...validation.sanitized,
      timestamp: new Date().toISOString()
    };

    // Submit to Google Apps Script
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script web apps
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    // Since no-cors mode doesn't give us response details, we assume success if no error
    return {
      success: true,
      message: 'መዝገብዎ በተሳካ ሁኔታ ተልኳል'
    };

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return {
      success: false,
      message: 'መዝገብ የማስገባት ስህተት ተፈጥሯል',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Google Apps Script URL (to be replaced with your deployed script URL)
// Instructions for setting up Google Apps Script:
// 1. Go to https://script.google.com/
// 2. Create a new script
// 3. Paste the following code:
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1iZI9NnloHX_-PARRm5WPw3U0q4cWsPpuJ30xsfRVmiA');
    const data = JSON.parse(e.postData.contents);
    
    // Get or create sheet based on form type
    let worksheet = sheet.getSheetByName(data.formType);
    if (!worksheet) {
      worksheet = sheet.insertSheet(data.formType);
      // Add headers
      worksheet.appendRow([
        'Timestamp', 'Full Name', 'Phone', 'Secondary Phone', 
        'Age', 'Academic Level', 'Address', 'Class'
      ]);
    }
    
    // Append data
    worksheet.appendRow([
      data.timestamp,
      data.fullName,
      data.phone,
      data.secondary_phone || '',
      data.age,
      data.academic_level || '',
      data.address,
      data.class || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/
// 4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 5. Copy the Web App URL and use it as the scriptUrl parameter

export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyW5dWxlb1acjCvRR7GyVlsxsRj662XrVX80ig7e5u3kIHWmFUdPZxkvK3ctGrBF0ve/exec'; // Replace with your deployed Google Apps Script URL
