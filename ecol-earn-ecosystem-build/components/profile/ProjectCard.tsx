import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/profile/projects/${project.id}`}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-block px-2 py-1 bg-primary/90 text-primary-foreground rounded text-xs font-medium">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{project.views}</span>
            </div>
          </div>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <button
                onClick={() => window.open(project.githubUrl, '_blank')}
                className="p-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <Code2 className="h-4 w-4" />
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="p-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
