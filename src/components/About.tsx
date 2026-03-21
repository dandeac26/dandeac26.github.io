import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-surface-alt transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-semibold text-heading mb-6">
              About Me
            </h2>
            <p className="text-body leading-relaxed mb-4 text-justify">
              I am currently pursuing my Master's degree in Cybersecurity
              Engineering at the Technical University of Cluj-Napoca. I hold a
              Bachelor's degree in Computer Science from TUCN's Faculty of
              Automation and Computer Science, where I studied in the English
              Department.
            </p>
            <p className="text-body leading-relaxed text-justify">
              Beyond my academic pursuits, I have a keen interest in Linux
              Desktop and Open Source Software, video editing, filming, software
              development and cybersecurity.
            </p>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
