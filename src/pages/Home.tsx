import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlueButton from '../components/BlueButton';

// Course data with path included
const courseData = {
  bega: {
    title: 'የበጋ መደበኛ ኮርስ',
    description: 'በአካል ቤተ ክርስቲያን ተገኝተው ቅዳሜ ሰዓት ከ11፡30-1፡30 እና እሑድ ጠዋት 3፡00-5:00 መማር ለሚችሉ የተዘጋጀ። መስከረም መጨረሻ ላይ ይጀምራል።',
    path: '/bega'
  },
  keremt: {
    title: 'የክረምት መደበኛ ኮርስ',
    description: 'በአካል ቤተ ክርስቲያን ተገኝተው ከሰኞ-ቅዳሜ ከ11:00-1:30 የሚዘጋጅ ኮርስ ነው። የሰኔ መጨረሻ ላይ ይጀምራል።',
    path: '/keremt'
  },
  bega_distance: {
    title: 'የበጋ የርቀት ትምህርት',
    description: 'በየሳምንቱ መገኘት የማይችሉ በወር አንዴ ተገኝተው እንዲማሩ የሚያስችል ኮርስ ነው። መስከረም/ጥቅምት ወር ውስጥ ይጀምራል።',
    path: '/bega-distance'
  },
  elearning: {
    title: 'የርቀት E-Learning ኮርስ',
    description: '(ገና አልጀመረም) በአካል መገኘት ላልቻሉ ሰዎች ባሉበት ኦንላይን መማር የሚችሉበት መንገድ ነው።',
    path: '/e-learning'
  }
};

type CourseKey = keyof typeof courseData;

function Home() {
  const [courseInfo, setCourseInfo] = useState<{ title: string; description: string; path: string } | null>(null);

  const handleCourseSelect = (courseKey: CourseKey) => {
    setCourseInfo(courseData[courseKey]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT SIDE: Buttons */}
      <div className="w-full md:w-3/4 flex items-center justify-center p-4 sm:p-8">
        <div className="flex flex-col text-center max-w-2xl w-full">
          <h1 className="font-amharic text-2xl sm:text-3xl md:text-4xl text-gray-800 font-bold leading-tight">
            የፍሬ ሃይማኖት ሰንበት ትምህርት ቤት
          </h1>
          <h3 className="font-amharic text-sm sm:text-base text-gray-400 font-light mt-2">
            በፍሬ ሃይማኖት ሰ/ት/ቤት ውስጥ የሚከተሉት ትምህርቶች ይሰጣሉ። ስለየትኛው ኮርስ ማወቅ ይፈልጋሉ?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
            <BlueButton
              label="የበጋ መደበኛ ኮርስ"
              onClick={() => handleCourseSelect('bega')}
            />
            <BlueButton
              label="የክረምት መደበኛ ኮርስ"
              onClick={() => handleCourseSelect('keremt')}
            />
            <BlueButton
              label="የበጋ የርቀት ትምህርት"
              onClick={() => handleCourseSelect('bega_distance')}
            />
            <BlueButton
              label="የርቀት E-Learning ኮርስ"
              onClick={() => handleCourseSelect('elearning')}
            />
          </div>

          <p className="font-amharic text-red-900 mt-3 text-sm">
            የትኛውም ትምህርት የሚጀምርበት ጊዜ ሲደርስ እንድናሳውቅዎና እንድናስመዘግብዎ አሁኑኑ ይመዝገቡ።
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Description + Register Button */}
      <div className="w-full md:w-1/4 flex items-center justify-center p-4 sm:p-6 bg-gray-50 min-h-[200px] md:min-h-0">
        {courseInfo ? (
          <div className="text-center max-w-sm w-full">
            <h2 className="font-amharic text-xl sm:text-2xl font-bold text-blue-800">
              {courseInfo.title}
            </h2>
            <p className="font-amharic text-sm sm:text-base text-gray-700 mt-3 leading-relaxed">
              {courseInfo.description}
            </p>
            <Link
              to={courseInfo.path}
              className="block mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-amharic font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors shadow-md text-sm sm:text-base text-center"
            >
              ይመዝገቡ
            </Link>
            <button
              onClick={() => setCourseInfo(null)}
              className="mt-3 text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-amharic transition-colors"
            >
              ← ተመለስ
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400 font-amharic text-sm sm:text-base">
            <p>እባክዎ ከግራ ያሉትን አዝራሮች ይምረጡ</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;