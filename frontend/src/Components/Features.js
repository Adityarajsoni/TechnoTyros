import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'AI-Powered Answer Sheet Checker',
    description:
      'Automatically evaluates answer sheets, highlights mistakes, and provides detailed feedback based on predefined rubrics. Saves time and ensures fair grading.',
    icon: CloudArrowUpIcon,
    address:"#",
  },
  {
    name: 'Generate Question Paper',
    description:
      'Automatically generate high-quality question papers based on syllabus, difficulty level, and topic weightage. Customize questions for different exams with AI-driven suggestions.',
    icon: LockClosedIcon,
    address:"#",
  },
  {
    name: 'Performance Analytics Dashboard',
    description:
      'A comprehensive dashboard that provides insights into class performance, student progress, and subject-wise strengths and weaknesses. Helps teachers make data-driven decisions.',
    icon: ArrowPathIcon,
    address:"#",
  },
  {
    name: 'Personalized Feedback',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
    address:"#",
  },
]

export default function Features() {
  return (
    <div id="feature">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Effortless Teaching with AI</h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              Automate, Analyze, and Accelerate Learning
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              Generate customized question papers in seconds, track student performance with real-time insights, and grade answer sheets effortlessly using AI. Save time, ensure accuracy, and focus on what truly matters—teaching.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <Link to={feature.address} className='px-8 py-8 hover:border-2 hover:border-black hover:rounded-md hover:shadow-lg hover:shadow-white/50 transition duration-300'>
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="size-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
                </Link>

              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>

  )
}
