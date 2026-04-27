import { UserIcon, ArrowPathRoundedSquareIcon, UsersIcon } from '@heroicons/react/20/solid'
import approach from "../assets/images/holistic_approach.png";

const features = [
  {
    name: 'Preventive Action:',
    description: 'Delivering accessible, customized alerts to help people act before disaster strikes.',
    icon: UserIcon,
  },
  {
    name: 'Comprehensive Coordination:',
    description: 'Maintaining an active surge capacity to support emergency responses globally.',
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: 'Local Empowerment:',
    description: 'Delivering services through cooperative agreements and direct grant support.',
    icon: UsersIcon,
  },
]

export default function HowWeWork() {
  return (
    <div className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="tagline text-primary mb-2">Our Approach</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-content-primary sm:text-4xl">
                How We Work
              </p>
              <p className="mt-6 text-lg leading-8 text-content-secondary">
                WDC operates as a collaborative platform, uniting governments, NGOs, businesses, and individuals to create holistic disaster management solutions. By integrating real-time insights, predictive technologies, and field expertise, we ensure that every action is informed, every resource is optimized, and every life saved contributes to a safer and more secure world.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-content-secondary lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-content-primary">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <img
            className="rounded-2xl shadow-lg w-full object-cover"
            src={approach}
            alt="Holistic Approach"
          />
        </div>
      </div>
    </div>
  )
}
