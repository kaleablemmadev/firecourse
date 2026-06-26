import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/input';
import Dropdown from '../components/Dropdown';
import PDFViewer from '../components/PDFViewer';
import BlueButton from '../components/BlueButton';
import { submitToGoogleSheets, GOOGLE_SCRIPT_URL } from '../services/googleSheetsService';

function BegaDistance() {
  const classNo = 1;
  const summerTime = new Date().getMonth() >= 5 && new Date().getMonth() <= 8;
  const autumnTime = new Date().getMonth() > 8 && new Date().getMonth() <= 11;

  const [season, setSeason] = useState('ክረምት');
  const [classes, setClasses] = useState('ቀዳማይ');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    secondary_phone: '',
    age: '',
    academic_level: '',
    address: ''
  });

  const getSeason = () => {
    if (summerTime) {
      setSeason('የክረምት');
    } else if (autumnTime) {
      setSeason('የበጋ');
    }
  };

  const getClass = () => {
    if (classNo === 1) {
      setClasses('ቀዳማይ');
    } else if (classNo === 2) {
      setClasses('ካልዓይ');
    } else if (classNo === 3) {
      setClasses('ሣልሳይ');
    } else if (classNo === 4) {
      setClasses('ራብዓይ');
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSelect = (option: any) => {
    setClasses(option.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!GOOGLE_SCRIPT_URL) {
      setSubmitMessage({ type: 'error', text: 'Google Apps Script URL not configured' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    const result = await submitToGoogleSheets(
      {
        formType: 'bega-distance',
        ...formData,
        class: classes
      },
      GOOGLE_SCRIPT_URL
    );

    setIsSubmitting(false);

    if (result.success) {
      setSubmitMessage({ type: 'success', text: result.message });
      setFormData({
        fullName: '',
        phone: '',
        secondary_phone: '',
        age: '',
        academic_level: '',
        address: ''
      });
    } else {
      setSubmitMessage({ type: 'error', text: result.message });
    }
  };

  useEffect(() => {
    getSeason();
    getClass();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 lg:p-8 gap-6 lg:gap-8">
        {/* LEFT: Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-orange-100">
            <h1 className="text-2xl lg:text-4xl text-gray-900 font-amharic font-bold mb-2">
              የ2019 ዓ.ም. የተልእኮ መንፈሳዊ ኮርስ ምዝገባ
            </h1>
            <p className="text-sm lg:text-base text-gray-600 font-amharic font-light mb-6">
              በ2019 ዓ.ም. በጋ ላይ የቤተ ክርስቲያን ትምህርትን በርቀት መማር ለሚፈልጉ ሰዎች የተልእኮ ኮርስ መመዝገቢያ ቅጽ
            </p>

            <Dropdown
              options={[
                { value: 'ቀዳማይ', label: 'ቀዳማይ' },
                { value: 'ካልዓይ', label: 'ካልዓይ' },
                { value: 'ሣልሳይ', label: 'ሣልሳይ' },
                { value: 'ራብዓይ', label: 'ራብዓይ' }
              ]}
              placeholder="ክፍል ምረጡ"
              onSelect={handleSelect}
              label="ክፍል"
              required={true}
            />

            <Input
              label="ሙሉ ስም"
              required={true}
              name="fullName"
              type="text"
              placeholder="ሙሉ ስም ጻፉ"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            <Input
              label="ስልክ ቁጥር"
              required={true}
              name="phone"
              type="tel"
              placeholder="ስልክ ቁጥር ጻፉ"
              value={formData.phone}
              onChange={handleInputChange}
            />

            <Input
              label="ተጨማሪ ስልክ ቁጥር (Optional)"
              required={false}
              name="secondary_phone"
              type="tel"
              placeholder="ተጨማሪ ስልክ ቁጥር ካለ ጻፉ"
              value={formData.secondary_phone}
              onChange={handleInputChange}
            />

            <Input
              label="ዕድሜ"
              required={true}
              name="age"
              type="number"
              placeholder="ዕድሜ ይጻፉ"
              value={formData.age}
              onChange={handleInputChange}
            />

            <Input
              label="የትምህርት ደረጃ"
              required={false}
              name="academic_level"
              type="text"
              placeholder="የትምህርት ደረጃ"
              value={formData.academic_level}
              onChange={handleInputChange}
            />

            <Input
              label="አድራሻ"
              required={true}
              name="address"
              type="text"
              placeholder="የሚኖሩበት አድራሻ"
              value={formData.address}
              onChange={handleInputChange}
            />

            {submitMessage && (
              <div className={`mt-4 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitMessage.text}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <BlueButton
                label={isSubmitting ? 'በማስገባት ላይ...' : 'መዝግብ'}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
              <Link
                to="/"
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-amharic font-semibold rounded-lg transition-colors text-center"
              >
                ወደ መጀመሪያ ገፅ ተመለስ
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: PDF Viewer */}
        <div className="w-full lg:w-1/2">
          <PDFViewer
            fileId="1OE3ustl5tZsOHrItTmrsjmBWvoNirUnxljGbpJDkDLE"
            downloadId="1XrQEEt1RWbw7bW88XrYqGdBCq2sW4C6A"
            title={`የተልእኮ መንፈሳዊ ትምህርት መግቢያ መረጃዎች`}
          />
        </div>
      </div>
    </div>
  );
}

export default BegaDistance;