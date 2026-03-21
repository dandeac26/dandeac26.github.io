import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";

const Portfolio: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categories = project.categories.map((c) => c.toLowerCase());

      const matchesSearch =
        searchText === "" ||
        categories.some((c) => c.includes(searchText.toLowerCase()));

      const matchesFilters =
        activeFilters.size === 0 ||
        Array.from(activeFilters).every((filter) =>
          categories.some((c) => c.includes(filter.toLowerCase())),
        );

      return matchesSearch && matchesFilters;
    });
  }, [searchText, activeFilters]);

  const addFilter = (category: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.add(category);
      return next;
    });
  };

  const removeFilter = (category: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.delete(category);
      return next;
    });
  };

  return (
    <section
      id="portfolio"
      className="py-16 md:py-24 bg-surface transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <h2 className="text-3xl font-semibold text-heading">Portfolio</h2>
          <div className="flex-1 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Search by technology..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-card text-heading text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {activeFilters.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {Array.from(activeFilters).map((filter) => (
                <motion.span
                  key={filter}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-white rounded-full text-xs font-medium"
                >
                  {filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:text-white/80 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </motion.span>
              ))}
              <button
                onClick={() => setActiveFilters(new Set())}
                className="text-xs text-muted hover:text-accent transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden aspect-video"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink
                      size={24}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </a>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-heading text-sm">
                      {project.title}
                    </h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:text-accent transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  </div>

                  {project.description && (
                    <p className="text-body text-xs mb-3 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Category Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => addFilter(cat)}
                        className="px-2.5 py-1 bg-accent-soft text-accent text-[11px] rounded-md hover:bg-accent hover:text-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted mt-12"
            >
              No projects match your filters. Try removing some filters or
              adjusting your search.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
