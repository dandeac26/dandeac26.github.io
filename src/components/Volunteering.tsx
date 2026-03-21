import { motion } from "framer-motion";
import { volunteering } from "../data/volunteering";

const Volunteering: React.FC = () => {
  return (
    <section
      id="volunteering"
      className="py-16 md:py-24 bg-surface-dark transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-heading mb-10"
        >
          Volunteering
        </motion.h2>

        <div className="flex flex-col gap-8">
          {volunteering.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 bg-black/[0.04] dark:bg-white/[0.05] rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="md:w-[400px] flex-shrink-0">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-[250px] md:h-[280px] object-cover object-top rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-heading mb-3">
                  {entry.title}
                </h3>
                <p className="text-body leading-relaxed text-sm">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;
